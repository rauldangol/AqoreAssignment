use Aqore_Assignment;


CREATE TABLE Category (
    CategoryId INT IDENTITY(1, 1) PRIMARY KEY,
    CategoryName VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Product (
    ProductId INT IDENTITY(1, 1) PRIMARY KEY,
	CategoryId INT NOT NULL,
    ProductName VARCHAR(100) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
	RemainingQuantity INT NOT NULL,
    -- Add any other columns specific to the product
	FOREIGN KEY (CategoryId) REFERENCES Category (CategoryId),
    CONSTRAINT UC_ProductNamePrice UNIQUE (ProductName, Price)
);

CREATE TABLE Customer (
    CustomerId INT IDENTITY(1, 1) PRIMARY KEY,
    FullName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    -- Add any other columns specific to the customer
);

CREATE TABLE SalesTransaction (
    TransactionId INT IDENTITY(1, 1) PRIMARY KEY,
    CustomerId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    TransactionDate DATE NOT NULL,
    -- Add any other columns specific to the sales transaction
    FOREIGN KEY (CustomerId) REFERENCES Customer (CustomerId),
    FOREIGN KEY (ProductId) REFERENCES Product (ProductId),
);

CREATE TABLE Invoice (
    InvoiceId INT IDENTITY(1, 1) PRIMARY KEY,
	CustomerId INT NOT NULL,
    InvoiceDate DATE NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    Discount DECIMAL(4, 2) NOT NULL,
	DiscountedAmount DECIMAL(10,2) NOT NULL
	 FOREIGN KEY (CustomerId) REFERENCES Customer (CustomerId),
     CONSTRAINT UC_InvoiceIdCustomerId UNIQUE (InvoiceId, CustomerId)
);


