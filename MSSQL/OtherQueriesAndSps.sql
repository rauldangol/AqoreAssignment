
/* Creating a Trigger that prevents the RemainingQuantity column of the Product Table to be <= 0 */

CREATE TRIGGER CheckRemainingQuantity
ON Product
AFTER UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT *
        FROM inserted
        WHERE RemainingQuantity < 1
    )
    BEGIN
        RAISERROR ('Product''s stock has finished.',0,1);
        ROLLBACK TRANSACTION; 
    END
END;

/* Creating a Trigger that updates the RemainingQuantity column in the Product table when a new record is inserted in the Sales Transaction Table */

CREATE TRIGGER UpdateRemainingQuantity
ON SalesTransaction
AFTER INSERT
AS
BEGIN
    UPDATE p
    SET RemainingQuantity = RemainingQuantity - i.Quantity
    FROM Product p
    INNER JOIN inserted i ON p.ProductId = i.ProductId;
END;


/* Generate an Invoice(a new record in the Invoice table) */

CREATE PROCEDURE GenerateInvoice
    @customerId INT
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY
        DECLARE @totalAmount DECIMAL(10, 2) = (
            SELECT SUM(ST.Quantity * P.Price)
            FROM SalesTransaction ST
            INNER JOIN Product P ON ST.ProductId = P.ProductId
            WHERE ST.CustomerId = @customerId
        );
        DECLARE @discountPercentage DECIMAL(4, 2) = CASE
            WHEN @totalAmount <= 1000 THEN 0.05 
            ELSE 0.1 
        END;
        DECLARE @discountedAmount DECIMAL(10, 2) = @totalAmount - (@totalAmount * @discountPercentage);

        INSERT INTO Invoice (CustomerId, InvoiceDate, TotalAmount, Discount, DiscountedAmount)
        VALUES (@customerId, GETDATE(), @totalAmount, @discountPercentage, @discountedAmount);
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
    END CATCH;
END;



DECLARE @customerId INT;
SET @customerId = 4;

EXEC GenerateInvoice @customerId;


/* QUERIES */


SELECT * FROM Customer WHERE (FullName LIKE 'A%' OR FullName LIKE '%S') AND (FullName LIKE '%K%');

-------
SELECT * FROM Customer WHERE CustomerId NOT IN (SELECT CustomerId FROM Invoice);

-------
SELECT TOP 1 C.FullName, SUM(ST.Quantity * P.Price) AS TotalAmountSpent
FROM CUSTOMER C
INNER JOIN SalesTransaction ST ON ST.CustomerId = C.CustomerId
INNER JOIN Product P ON P.ProductId = ST.ProductId
WHERE ST.TransactionDate >= '2023-05-01' AND ST.TransactionDate <= '2023-12-12'
GROUP BY C.CustomerId, C.FullName
ORDER BY TotalAmountSpent DESC;


Select * From Product;
Select * from SalesTransaction;

-------

DELETE FROM Product WHERE ProductId NOT IN ( SELECT ProductId FROM SalesTransaction
WHERE YEAR(TransactionDate) = YEAR(GETDATE()));

-------
SELECT *
FROM Product
WHERE RemainingQuantity < 2;


-------
SELECT TOP 1 St.ProductId, P.ProductName, SUM(St.Quantity) AS TotalQuantitySold
FROM SalesTransaction St 
INNER JOIN Product P ON P.ProductId = St.ProductId
WHERE St.TransactionDate >= '2023-01-01' AND ST.TransactionDate <= '2023-12-31'
GROUP BY St.ProductId, P.ProductName
ORDER BY TotalQuantitySold Desc;


-------
SELECT C.CustomerId, C.FullName, SUM(ST.Quantity) AS TotalQuantityBought
FROM Customer C
INNER JOIN SalesTransaction St ON St.CustomerId = C.CustomerId
GROUP BY C.CustomerId, C.FullName
HAVING SUM(St.Quantity) > 10;



/* Creating a function to return the Total Amount spent by a customer and the number of Transactions made by that Customer */

CREATE TYPE CustomerIdList AS TABLE (
    CustomerId INT
);


ALTER FUNCTION GetTotalAmountByDate(
    @CustomerIds CustomerIdList READONLY,
    @StartDate DATE,
    @EndDate DATE
)
RETURNS TABLE
AS
RETURN
(
    SELECT ST.CustomerId,
        SUM(ST.Quantity * P.Price) AS TotalAmount,
        COUNT(*) AS TransactionCount
    FROM SalesTransaction ST
    INNER JOIN Product P ON ST.ProductId = P.ProductId
    WHERE ST.CustomerId IN (SELECT CustomerId FROM @CustomerIds)
        AND ST.TransactionDate >= @StartDate
        AND ST.TransactionDate <= @EndDate
    GROUP BY ST.CustomerId
);



DECLARE @Ids CustomerIdList;
INSERT INTO @Ids (CustomerId)
VALUES (1), (4), (7);

DECLARE @StartDate DATE = '2023-01-01';
DECLARE @EndDate DATE = '2023-12-31';

SELECT CustomerId, TotalAmount, TransactionCount
FROM GetTotalAmountByDate(@Ids, @StartDate, @EndDate);


select * from Invoice;
select * from SalesTransaction;


/* Creating a Stored Procedure to reutrn all the customer's information in the database and return the total invoice amount. */

CREATE PROCEDURE GetCustomerData
	@GetCustomerDataJson NVARCHAR(MAX)
AS
BEGIN
	
	SELECT JSON_VALUE(CUSTOMERDATA, '$.CustomerId') AS CustomerId, C.FullName, C.Email, St.TransactionDate, P.ProductName, St.Quantity, SUM(St.Quantity * P.Price) AS TotalAmountSpent
	FROM SalesTransaction St 
	INNER JOIN Customer C ON St.CustomerId = C.CustomerId
	INNER JOIN Product P ON St.ProductId = P.ProductId
	CROSS APPLY OPENJSON(@GetCustomerDataJson) WITH (CUSTOMERDATA NVARCHAR(MAX) '$' AS JSON)
	WHERE St.TransactionDate >= JSON_VALUE(CUSTOMERDATA, '$.StartDate') AND St.TransactionDate <= JSON_VALUE(CUSTOMERDATA, '$.EndDate') AND C.CustomerId = JSON_VALUE(CUSTOMERDATA,'$.CustomerId') 
	GROUP BY JSON_VALUE(CUSTOMERDATA, '$.CustomerId'), C.FullName, C.Email, St.TransactionDate, P.ProductName, St.Quantity
	FOR JSON AUTO;

END;



DECLARE @GetCustomerDataJson NVARCHAR(MAX) = '[

{
	"CustomerId":1,
	"StartDate": "2023-01-01",
	"EndDate": "2023-12-31"

},

{
	"CustomerId":2,
	"StartDate": "2023-01-01",
	"EndDate": "2023-12-31"

}

]'

EXEC GetCustomerData @GetCustomerDataJson;