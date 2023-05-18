/*I have created these procedures only for the puropose of executing them in my webAPI without using JSON */


CREATE PROCEDURE CreateCategoryAPI(
@CategoryName varchar(50)
)
As
Begin
	INSERT INTO Category(CategoryName) VALUES (@CategoryName)

End


CREATE PROCEDURE UpdateCategoryAPI
    @CategoryId INT,
    @CategoryName VARCHAR(50)
AS
BEGIN
    UPDATE Category
    SET CategoryName = @CategoryName
    WHERE CategoryId = @CategoryId;
END

CREATE PROCEDURE DeleteCategoryAPI
  @CategoryId INT
AS
BEGIN
  DELETE FROM Category WHERE CategoryId = @CategoryId;
END


CREATE PROCEDURE CreateProductAPI(
@CategoryId INT,
@ProductName varchar(50),
@Price decimal(10,2),
@RemainingQuantity int
)
As
Begin
	INSERT INTO Product(CategoryId,ProductName, Price, RemainingQuantity) VALUES (@CategoryId, @ProductName, @Price, @RemainingQuantity)

End


CREATE PROCEDURE DeleteProductAPI
  @ProductId INT
AS
BEGIN
  DELETE FROM Product WHERE ProductId = @ProductId;
END

CREATE PROCEDURE UpdateProductAPI
    @ProductId INT,
	@CategoryId INT,
    @ProductName VARCHAR(50),
	@Price decimal(10,2),
	@RemainingQuantity int
AS
BEGIN
    UPDATE Product
    SET CategoryId=@CategoryId ,ProductName = @ProductName, Price = @Price, RemainingQuantity = @RemainingQuantity
    WHERE ProductId = @ProductId;
END


CREATE PROCEDURE CreateCustomerAPI(
@FullName varchar(50),
@Email varchar(50)
)
As
Begin
	INSERT INTO Customer(FullName, Email) VALUES (@FullName, @Email)

End

CREATE PROCEDURE UpdateCustomerAPI
@CustomerId INT,
@FullName varchar(50),
@Email varchar(50)
AS
BEGIN
    UPDATE Customer
    SET FullName = @FullName, Email = @Email
    WHERE CustomerId = @CustomerId;
END


CREATE PROCEDURE DeleteCustomerAPI
  @CustomerId INT
AS
BEGIN
  DELETE FROM Customer WHERE CustomerId = @CustomerId;
END


CREATE PROCEDURE CreateSalesTransactionAPI(
@CustomerId INT,
@ProductId INT,
@Quantity INT,
@TransactionDate DATE
)
As
Begin
	INSERT INTO SalesTransaction(CustomerId, ProductId, Quantity, TransactionDate) VALUES (@CustomerId, @ProductId, @Quantity, @TransactionDate)

End


CREATE PROCEDURE UpdateSalesTransactionAPI
@TransactionId INT,
@CustomerId INT,
@ProductId INT,
@Quantity INT,
@TransactionDate Date
AS
BEGIN
    UPDATE SalesTransaction
    SET CustomerId = @CustomerId, ProductId = @ProductId, Quantity = @Quantity, TransactionDate = @TransactionDate
    WHERE TransactionId = @TransactionId;
END



CREATE PROCEDURE DeleteSalesTransactionAPI
  @TransactionId INT
AS
BEGIN
  DELETE FROM SalesTransaction WHERE TransactionId = @TransactionId;
END


CREATE PROCEDURE CreateInvoiceAPI(
@CustomerId INT,
@InvoiceDate Date,
@TotalAmount decimal(10,2),
@Discount decimal(10,2),
@DiscountedAmount decimal(10,2)
)
As
Begin
	INSERT INTO Invoice(CustomerId, InvoiceDate, TotalAmount, Discount, DiscountedAmount) VALUES (@CustomerId, @InvoiceDate, @TotalAmount, @Discount, @DiscountedAmount)

End

ALTER PROCEDURE UpdateInvoiceAPI(
@InvoiceId INT,
@CustomerId INT,
@InvoiceDate Date,
@TotalAmount decimal(10,2),
@Discount decimal(10,2),
@DiscountedAmount decimal(10,2)
)
AS
BEGIN
    UPDATE Invoice
    SET CustomerId = @CustomerId, InvoiceDate = @InvoiceDate, TotalAmount = @TotalAmount, Discount = @Discount, DiscountedAmount = @DiscountedAmount
    WHERE InvoiceId = @InvoiceId;
END

CREATE PROCEDURE DeleteInvoiceAPI
  @InvoiceId INT
AS
BEGIN
  DELETE FROM Invoice WHERE InvoiceId = @InvoiceId;
END

select * From Invoice;


CREATE PROCEDURE GetProductWithHighestSales
AS
BEGIN
    SELECT TOP 1 P.ProductId, P.CategoryId, P.ProductName, P.Price, P.RemainingQuantity, SUM(St.Quantity) AS TotalQuantitySold
    FROM SalesTransaction St
    INNER JOIN Product P ON P.ProductId = St.ProductId
    GROUP BY P.ProductId, P.CategoryId, P.ProductName, P.Price, P.RemainingQuantity
    ORDER BY TotalQuantitySold DESC
END


CREATE PROCEDURE GetProductWithLowestSales
AS
BEGIN
    SELECT TOP 1 P.ProductId, P.CategoryId, P.ProductName, P.Price, P.RemainingQuantity, SUM(St.Quantity) AS TotalQuantitySold
    FROM SalesTransaction St
    INNER JOIN Product P ON P.ProductId = St.ProductId
    GROUP BY P.ProductId, P.CategoryId, P.ProductName, P.Price, P.RemainingQuantity
    ORDER BY TotalQuantitySold
END

CREATE PROCEDURE GetProductWithLowestQuantity
AS
BEGIN
    SELECT TOP 1 P.ProductId, P.CategoryId, P.ProductName, P.Price, P.RemainingQuantity
    FROM Product P
    ORDER BY P.RemainingQuantity
END

EXEC GetProductWithHighestSales

ALTER PROCEDURE GetTopThreeTransactions
AS
BEGIN
    SELECT TOP 3 TransactionId, CustomerId, ProductId, Quantity, TransactionDate
    FROM SalesTransaction
    ORDER BY TransactionDate DESC
END;


EXEC GetTopThreeTransactions

select* from SalesTransaction;