
/* CREATE CATEGORY */
CREATE PROCEDURE CreateCategory
    @ProductJson NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO Category (CategoryName)
    SELECT
        JSON_VALUE(NEWPRODUCT, '$.CategoryName')
	FROM OPENJSON(@ProductJson) WITH (NEWPRODUCT NVARCHAR(MAX)'$'AS JSON);
END


DECLARE @ProductJson NVARCHAR(MAX) = '[
{
    "CategoryName": "Category 8"

},
{
    "CategoryName": "Category 4"
}

]'

EXEC CreateCategory @ProductJson;


/* GET ALL CATEGORY*/

ALTER PROCEDURE GetAllCategory
AS
BEGIN
    SELECT * FROM Category
END


/* GET CATEGORY By Id*/

CREATE PROCEDURE GetCategoryById
    @CategoryId INT
AS
BEGIN
    SELECT *
    FROM Category
    WHERE CategoryId = @CategoryId;
END

DECLARE @CategoryId INT = 1;

EXEC GetCategoryById @CategoryId;


/* UPDATE CATEGORY */

CREATE PROCEDURE UpdateCategory 
	@ProductJson NVARCHAR(MAX)
AS
BEGIN
	UPDATE Category
	SET
	CategoryName = JSON_VALUE(UPDATEJSON, '$.CategoryName')
FROM OPENJSON(@ProductJson) WITH (UPDATEJSON NVARCHAR(MAX) '$' AS JSON)
WHERE CategoryId = JSON_VALUE(UPDATEJSON, '$.CategoryId');
END

DECLARE @ProductJson NVARCHAR(MAX) ='[
{
	"CategoryId":1,
	"CategoryName": "Updated Category 45"
},

{
	"CategoryId":2,
	"CategoryName": "Updated Product 88"

}

]'

EXEC UpdateCategory @ProductJson;


/* DELETE CATEGORY */

CREATE PROCEDURE DeleteCategory
    @ProductJson NVARCHAR(MAX)
AS
BEGIN
    DELETE FROM Category
 FROM OPENJSON(@ProductJson) WITH (DELETEJSON NVARCHAR(MAX) '$' AS JSON)
	WHERE CategoryId = JSON_VALUE(DELETEJSON, '$.CategoryId');
END


DECLARE @ProductJson NVARCHAR (MAX) = '[

{
	"CategoryId": 3
	
},
{
"CategoryId": 4
}

]'

EXEC DeleteCategory @ProductJson;

select * from Category;

/* CREATE PRODUCT */

CREATE PROCEDURE CreateProduct
    @ProductJson NVARCHAR(MAX)
AS
BEGIN
    INSERT INTO Product (CategoryId, ProductName, Price, RemainingQuantity)
    SELECT
		JSON_VALUE(NEWPRODUCT, '$.CategoryId'),
        JSON_VALUE(NEWPRODUCT, '$.ProductName'),
        JSON_VALUE(NEWPRODUCT, '$.Price'),
		JSON_VALUE(NEWPRODUCT, '$.RemainingQuantity')
	FROM OPENJSON(@ProductJson) WITH (NEWPRODUCT NVARCHAR(MAX)'$'AS JSON);
END


DECLARE @ProductJson NVARCHAR(MAX) = '[
{
	"CategoryId": 1,
    "ProductName": "Product K",
    "Price": 299,
	"RemainingQuantity": 150
},
{
	"CategoryId": 2,
    "ProductName": "Product X",
    "Price": 599,
	"RemainingQuantity": 80
}

]';

EXEC CreateProduct @ProductJson;

/* GET ALL PRODUCT */

CREATE PROCEDURE GetAllProduct
AS
BEGIN
    SELECT * FROM Product
END

/* GET PRODUCT */

CREATE PROCEDURE GetProductById
    @ProductId INT
AS
BEGIN
    SELECT *
    FROM Product
    WHERE ProductId = @ProductId;
END

DECLARE @ProductId INT = 1;

EXEC GetProductById @ProductId;

/* UPDATE PRODUCT */

CREATE PROCEDURE UpdateProduct 
	@ProductJson NVARCHAR(MAX)
AS
BEGIN
	UPDATE Product
	SET
	CategoryId = JSON_VALUE(UPDATEJSON, '$.CategoryId'),
	ProductName = JSON_VALUE(UPDATEJSON, '$.ProductName'),
	Price = JSON_VALUE(UPDATEJSON, '$.Price')
FROM OPENJSON(@ProductJson) WITH (UPDATEJSON NVARCHAR(MAX) '$' AS JSON)
WHERE ProductId = JSON_VALUE(UPDATEJSON, '$.ProductId');
END

DECLARE @ProductJson NVARCHAR(MAX) ='[
{
	"ProductId":1,
	"CategoryId":1,
	"ProductName": "Updated Product D",
	"Price": "12.45"
},

{
	"ProductId":2,
	"CategoryId":1,
	"ProductName": "Updated Product E",
	"Price": "22.45"

}

]'

EXEC UpdateProduct @ProductJson;


/* DELETE PRODUCT */

CREATE PROCEDURE DeleteProduct
    @ProductJson NVARCHAR(MAX)
AS
BEGIN
    DELETE FROM Product
 FROM OPENJSON(@ProductJson) WITH (DELETEJSON NVARCHAR(MAX) '$' AS JSON)
	WHERE ProductId = JSON_VALUE(DELETEJSON, '$.ProductId');
END


DECLARE @ProductJson NVARCHAR (MAX) = '[

{
	"ProductId": 1
	
},
{
"ProductId": 2
}

]'

EXEC DeleteProduct @ProductJson;


select * from Product;


/* CREATE CUSTOMER */

CREATE PROCEDURE CreateCustomer
	@CustomerJson NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO Customer (FullName, Email)
	SELECT
		JSON_VALUE(NEWCUSTOMER, '$.FullName'),
		JSON_VALUE(NEWCUSTOMER, '$.Email')
	FROM OPENJSON(@CustomerJson) WITH (NEWCUSTOMER NVARCHAR(MAX) '$' AS JSON);
	END


DECLARE @CustomerJson NVARCHAR(MAX) = '[

{
	"FullName": "Ram Bahadur",
	"Email": "ram@mail.com"
},

{
	"FullName": "Man Bahadur",
	"Email": "bahadurman@mail.com"
},

{
	"FullName": "Ankit Smith",
	"Email": "ankit@mail.com"
}

]'

EXEC CreateCustomer @CustomerJson;

/* GET ALL CUSTOMER */

CREATE PROCEDURE GetAllCustomer
AS
BEGIN
	SELECT * FROM Customer

END

/* GET SINGLE CUSTOMER BY ID */

CREATE PROCEDURE GetCustomerById
	@CustomerId INT

AS
BEGIN
	SELECT * FROM Customer

	WHERE CustomerId = @CustomerId;
END


DECLARE @CustomerId INT = 3;

EXEC GetCustomerById @CustomerId;

/* UPDATE CUSTOMER */

CREATE PROCEDURE UpdateCustomer
	@CustomerJson NVARCHAR(MAX)
AS
BEGIN
	UPDATE Customer
	SET

	FullName = JSON_VALUE(UPDATEJSON, '$.FullName'),
	Email = JSON_VALUE(UPDATEJSON, '$.email')
FROM OPENJSON(@CustomerJson) WITH (UPDATEJSON NVARCHAR(MAX) '$' AS JSON)
	WHERE CustomerId = JSON_VALUE(UPDATEJSON, '$.CustomerId');


END


DECLARE @CustomerJson NVARCHAR(MAX) = '[
{
	
	"CustomerId": 1,
	"FullName": "John Doe",
	"email": "johndoe@mail.com"

},
{
	"CustomerId": 2,
	"FullName": "Mary",
	"email": "maryjane@mail.com"

}

]'

EXEC UpdateCustomer @CustomerJson;

/* DELETE CUSTOMER */

CREATE PROCEDURE DeleteCustomer
	@CustomerJson NVARCHAR(MAX)
AS
BEGIN
	DELETE FROM Customer
	FROM OPENJSON(@CustomerJson) WITH (DELETEJSON NVARCHAR(MAX) '$' AS JSON)
	WHERE CustomerId = JSON_VALUE(DELETEJSON, '$.CustomerId');
END

DECLARE @CustomerJson NVARCHAR(MAX) = '[

{
	"CustomerId": 2
}
	
]'

EXEC DeleteCustomer @CustomerJson;


/* CREATE SALES TRANSACTION */

ALTER PROCEDURE CreateSalesTransaction
	@SalesTransactionJson NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO SalesTransaction (CustomerId, ProductId, Quantity, TransactionDate)
	SELECT
		JSON_VALUE(ADDJSON,'$.CustomerId'),
		JSON_VALUE(ADDJSON,'$.ProductId'),
		JSON_VALUE(ADDJSON,'$.Quantity'),
		JSON_VALUE(ADDJSON,'$.TransactionDate')
	FROM OPENJSON(@SalesTransactionJson) WITH (ADDJSON NVARCHAR(MAX) '$' AS JSON)

	END;

DECLARE @SalesTransactionJson NVARCHAR(MAX) = '[
{
	"CustomerId" : 3,
	"ProductId" : 4,
	"Quantity" : 33,
	"TransactionDate" : "2023-05-10"

}
]'

EXEC CreateSalesTransaction @SalesTransactionJson;

/* GET ALL TRANSACTION */

CREATE PROCEDURE GetAllSaleTransaction
AS
BEGIN
    SELECT * FROM SalesTransaction

END

/* GET SINGLE SALES TRANSACTION */

CREATE PROCEDURE GetSalesTransactionById
    @TransactionId NVARCHAR(MAX)
AS
BEGIN
    SELECT * FROM SalesTransaction

	WHERE TransactionId = @TransactionId;
END


DECLARE @TransactionId INT = 1;

EXEC GetCustomerById @TransactionId;


/* UPDATE SALES TRANSACTION */

CREATE PROCEDURE UpdateSalesTransaction
    @SalesTransactionJson NVARCHAR(MAX)
AS
BEGIN
    UPDATE SalesTransaction
    SET
        CustomerId = JSON_VALUE(UPDATESALES, '$.CustomerId'),
        ProductId = JSON_VALUE(UPDATESALES, '$.ProductId'),
        Quantity = JSON_VALUE(UPDATESALES, '$.Quantity'),
        TransactionDate = JSON_VALUE(UPDATESALES, '$.TransactionDate')
	FROM OPENJSON(@SalesTransactionJson) WITH (UPDATESALES NVARCHAR(MAX) '$' as JSON)
    WHERE TransactionId = JSON_VALUE(UPDATESALES, '$.TransactionId');
END

DECLARE @SalesTransactionJson NVARCHAR(MAX) = '[
{
	"TransactionId" : 3,
	"CustomerId": 1,
	"ProductId" : 4,
	"Quantity" : 55,
	"TransactionDate" : "2023-05-10"
}
]'

EXEC UpdateSalesTransaction @SalesTransactionJson;

/* DELETE SALES TRANSACTION */

CREATE PROCEDURE DeleteSalesTransaction
	@SalesTransactionJson NVARCHAR(MAX)
AS
BEGIN
	DELETE FROM SalesTransaction
	FROM OPENJSON(@SalesTransactionJson) WITH (DELETEJSON NVARCHAR(MAX) '$' AS JSON)
	WHERE TransactionId = JSON_VALUE(DELETEJSON, '$.TransactionId');
END

DECLARE @SalesTransactionJson NVARCHAR(MAX) = '[

{
	"TransactionId": 3
}
	
]'

EXEC DeleteSalesTransaction @SalesTransactionJson;


/* CREATE INVOICE */


CREATE PROCEDURE CreateInvoice
	@InvoiceJson NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO Invoice (InvoiceId, InvoiceDate, TotalAmount, Discount)
    SELECT
		JSON_VALUE(ADDJSON,'$.InvoiceId'),
		JSON_VALUE(ADDJSON,'$.InvoiceDate'),
		JSON_VALUE(ADDJSON,'$.TotalAmount'),
		JSON_VALUE(ADDJSON,'$.Discount')
	FROM OPENJSON(@InvoiceJson) WITH (ADDJSON NVARCHAR(MAX) '$' AS JSON)

	END;

/* GET ALL INVOICE */

CREATE PROCEDURE GetAllInvoice
AS
BEGIN
	SELECT * FROM Invoice
END


/* GET SINGLE INVOICE */

CREATE PROCEDURE GetInvoiceById
	@InvoiceId INT

AS
BEGIN
	SELECT * FROM Invoice

	WHERE InvoiceId = @InvoiceId;
END


DECLARE @InvoiceId INT = 2;

EXEC GetInvoiceById @InvoiceId;


/* UPDATE INVOICE */

CREATE PROCEDURE UpdateInvoice
    @InvoiceJson NVARCHAR(MAX)
AS
BEGIN
    UPDATE Invoice
    SET
        InvoiceDate  = JSON_VALUE(UPDATEINVOICE, '$.InvoiceDate'),
        TotalAmount  = JSON_VALUE(UPDATEINVOICE, '$.TotalAmount'),
        Discount  = JSON_VALUE(UPDATEINVOICE, '$.Discount')
	FROM OPENJSON(@InvoiceJson) WITH (UPDATEINVOICE NVARCHAR(MAX) '$' as JSON)
    WHERE InvoiceId = JSON_VALUE(UPDATEINVOICE, '$.InvoiceId');
END

DECLARE @InvoiceJson NVARCHAR(MAX) = '[
{
	"InvoiceId" : 2,
	"InvoiceDate" : "2023-05-13",
	"TotalAmount" : 52.99,
	"Discount" : "30"
}
]'

EXEC UpdateInvoice @InvoiceJson;


/* DELETE INVOICE */

CREATE PROCEDURE DeleteInvoice
	@InvoiceJson NVARCHAR(MAX)
AS
BEGIN
	DELETE FROM Invoice
	FROM OPENJSON(@InvoiceJson) WITH (DELETEJSON NVARCHAR(MAX) '$' AS JSON)
	WHERE InvoiceId = JSON_VALUE(DELETEJSON, '$.InvoiceId ');
END


DECLARE @InvoiceJson NVARCHAR(MAX) = '[

{
	"InvoiceId": 1
}
	
]'

EXEC DeleteInvoice @InvoiceJson;
