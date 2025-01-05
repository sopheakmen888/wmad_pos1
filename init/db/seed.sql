
INSERT INTO role (id, name, description) VALUES 

(2, 'Inventory Manager', 'Manages inventory and stock'), 
(3, 'Cashier', 'Handles customer sales and transactions');






INSERT INTO product_category (id, nameEn, nameKh) VALUES 
(1, 'Beverage', 'ភេសជ្ជៈ'), 
(2, 'Food', 'អាហារ');


INSERT INTO product (id, productCode, nameEn, nameKh, categoryId, sku, imageUrl, createdBy, updatedBy) VALUES 
(1, 'P0001' , 'Coca-Cola', 'កូកា-កូឡា', 1, 'BEV-001', NULL, 1, 1),
(2, 'P0002' , 'Pepsi', 'ប៉េបស៊ី', 1, 'BEV-002', NULL, 1, 1),
(3, 'P0003' , 'Orange Juice', 'ទឹកក្រូច', 1, 'BEV-003', NULL, 1, 1),
(4, 'P0004' , 'Water', 'ទឹកស្អាត', 1, 'BEV-004', NULL, 1, 1),
(5, 'P0005' , 'Coffee', 'កាហ្វេ', 1, 'BEV-005', NULL, 1, 1),
(6, 'P0006' , 'Burger', 'ប៊ឺហ្គឺ', 2, 'FOOD-001', NULL, 1, 1),
(7, 'P0007' , 'Pizza', 'ភីហ្សា', 2, 'FOOD-002', NULL, 1, 1),
(8, 'P0008' , 'Pasta', 'ប៉ាស្តា', 2, 'FOOD-003', NULL, 1, 1),
(9, 'P0009' , 'Salad', 'សាឡាត់', 2, 'FOOD-004', NULL, 1, 1),
(10, 'P0010' , 'Fries', 'មីនភីរបាំង', 2, 'FOOD-005', NULL, 1, 1);


INSERT INTO supplier (id, supplierName, contactName, contactEmail, contactPhone, addressLine1, addressLine2, province, websiteUrl, imageUrl, taxIdentification) VALUES 
(1, 'Global Beverages Ltd', 'John Doe', 'contact@globalbeverages.com', '123456789', '123 Main St', NULL, 'Phnom Penh', NULL, NULL, 'TAX-001'),
(2, 'Fresh Foods Ltd', 'Jane Smith', 'contact@freshfoods.com', '987654321', '456 Market Rd', NULL, 'Siem Reap', NULL, NULL, 'TAX-002');



INSERT INTO stock_in (id, supplierId, referenceNumber, stockInDate) VALUES 
(1, 1, 'REF-OCT-001', '2024-10-05'),
(2, 2, 'REF-OCT-002', '2024-10-15'),
(3, 1, 'REF-NOV-001', '2024-11-01'),
(4, 2, 'REF-NOV-002', '2024-11-20');


INSERT INTO stock_in_detail (id, stockInId, productId, quantity, purchaseUnitPrice, saleUnitPrice, totalPrice, expiryDate) VALUES 

(1, 1, 1, 50, 0.5, 0.7, 35, '2025-10-05'),
(2, 1, 2, 30, 0.4, 0.6, 18, '2025-10-10'),


(3, 2, 3, 20, 0.6, 0.8, 16, '2025-11-01'),
(4, 2, 4, 15, 0.5, 0.7, 10.5, '2025-11-15'),
(5, 2, 5, 25, 0.7, 0.9, 22.5, '2025-11-20'),
(6, 2, 6, 10, 1.2, 1.5, 12, '2025-11-30'),


(7, 3, 7, 15, 2.0, 2.5, 30, '2025-11-01'),
(8, 3, 8, 20, 1.5, 2.0, 30, '2025-11-10'),
(9, 3, 9, 10, 1.8, 2.2, 18, '2025-12-01'),
(10, 3, 10, 12, 0.9, 1.1, 10.8, '2025-12-15'),


(11, 4, 1, 25, 0.5, 0.7, 17.5, '2025-12-05'),
(12, 4, 2, 20, 0.4, 0.6, 12, '2025-12-10'),
(13, 4, 3, 30, 0.6, 0.8, 24, '2025-12-15'),
(14, 4, 4, 10, 0.5, 0.7, 7, '2025-12-20'),
(15, 4, 5, 40, 0.7, 0.9, 36, '2025-12-25'),
(16, 4, 6, 15, 1.2, 1.5, 18, '2025-12-30'),
(17, 4, 7, 10, 2.0, 2.5, 25, '2025-12-31'),
(18, 4, 8, 5, 1.5, 2.0, 10, '2025-12-31');



INSERT INTO customer (id, firstName, lastName, email, phone, address) VALUES
(1, 'Chan', 'Sovanna', 'chan.sovanna@example.com', '0123456789', 'Phnom Penh'),
(2, 'Sok', 'Kim', 'sok.kim@example.com', '0123456790', 'Kampong Cham'),
(3, 'Bun', 'Lina', 'bun.lina@example.com', '0123456791', 'Battambang'),
(4, 'Vichhea', 'Samnang', 'vichhea.samnang@example.com', '0123456792', 'Siem Reap'),
(5, 'Malin', 'Rathana', 'malin.rathana@example.com', '0123456793', 'Takeo');



INSERT INTO retail_pos_db.promotion (id, promotionCode, description, startDate, endDate, discountPercentage, imageUrl) VALUES
(1, 'PROMO001', '5% discount for all items in December 2024', '2024-12-01', '2024-12-31', 5.00, NULL);





INSERT INTO sale_item_master (id, transactionCode, transactionDate, totalAmount, totalDiscountAmount, vatAmount, grandTotalAmount, paymentMethod, promotionId, customerId) VALUES 
(1, 'SALE-DEC-001', '2024-12-01', 0.7, 0.0, 0.0, 0.7, 'Cash', 1, 1);

INSERT INTO sale_item_detail (id, transactionId, productId, quantity, unitPrice, discountPercentage, discountAmount, vatPercentage, vatAmount, totalAmount, grandTotalAmount) VALUES 
(1, 1, 1, 1, 0.7, 5.00, 0.035, 10.00, 0.07, 0.7, 0.665); 


INSERT INTO sale_item_master (id, transactionCode, transactionDate, totalAmount, totalDiscountAmount, vatAmount, grandTotalAmount, paymentMethod, promotionId, customerId) VALUES 
(2, 'SALE-DEC-002', '2024-12-03', 1.3, 0.065, 0.13, 1.365, 'Card', 1, 2);

INSERT INTO sale_item_detail (id, transactionId, productId, quantity, unitPrice, discountPercentage, discountAmount, vatPercentage, vatAmount, totalAmount, grandTotalAmount) VALUES 
(2, 2, 2, 1, 0.6, 5.00, 0.03, 10.00, 0.06, 0.6, 0.57),
(3, 2, 3, 1, 0.8, 5.00, 0.04, 10.00, 0.08, 0.8, 0.76); 


INSERT INTO sale_item_master (id, transactionCode, transactionDate, totalAmount, totalDiscountAmount, vatAmount, grandTotalAmount, paymentMethod, promotionId, customerId) VALUES 
(3, 'SALE-DEC-003', '2024-12-05', 2.4, 0.12, 0.24, 2.52, 'Cash', 1, 3);

INSERT INTO sale_item_detail (id, transactionId, productId, quantity, unitPrice, discountPercentage, discountAmount, vatPercentage, vatAmount, totalAmount, grandTotalAmount) VALUES 
(4, 3, 4, 1, 0.7, 5.00, 0.035, 10.00, 0.07, 0.7, 0.665),
(5, 3, 5, 1, 0.9, 5.00, 0.045, 10.00, 0.09, 0.9, 0.855),
(6, 3, 6, 1, 1.2, 5.00, 0.06, 10.00, 0.12, 1.2, 1.14); 


INSERT INTO sale_item_master (id, transactionCode, transactionDate, totalAmount, totalDiscountAmount, vatAmount, grandTotalAmount, paymentMethod, promotionId, customerId) VALUES 
(4, 'SALE-DEC-004', '2024-12-07', 2.3, 0.115, 0.23, 2.415, 'Card', 1, 4);

INSERT INTO sale_item_detail (id, transactionId, productId, quantity, unitPrice, discountPercentage, discountAmount, vatPercentage, vatAmount, totalAmount, grandTotalAmount) VALUES 
(7, 4, 7, 1, 2.5, 5.00, 0.125, 10.00, 0.25, 2.5, 2.375),
(8, 4, 8, 1, 2.0, 5.00, 0.10, 10.00, 0.20, 2.0, 1.90); 


INSERT INTO sale_item_master (id, transactionCode, transactionDate, totalAmount, totalDiscountAmount, vatAmount, grandTotalAmount, paymentMethod, promotionId, customerId) VALUES 
(5, 'SALE-DEC-005', '2024-12-10', 0.7, 0.035, 0.07, 0.735, 'Cash', 1, 5);

INSERT INTO sale_item_detail (id, transactionId, productId, quantity, unitPrice, discountPercentage, discountAmount, vatPercentage, vatAmount, totalAmount, grandTotalAmount) VALUES 
(9, 5, 9, 1, 0.7, 5.00, 0.035, 10.00, 0.07, 0.7, 0.665); 


INSERT INTO sale_item_master (id, transactionCode, transactionDate, totalAmount, totalDiscountAmount, vatAmount, grandTotalAmount, paymentMethod, promotionId, customerId) VALUES 
(6, 'SALE-DEC-006', '2024-12-12', 1.6, 0.08, 0.16, 1.68, 'Card', 1, 1);

INSERT INTO sale_item_detail (id, transactionId, productId, quantity, unitPrice, discountPercentage, discountAmount, vatPercentage, vatAmount, totalAmount, grandTotalAmount) VALUES 
(10, 6, 10, 1, 0.9, 5.00, 0.045, 10.00, 0.09, 0.9, 0.855),
(11, 6, 6, 1, 1.2, 5.00, 0.06, 10.00, 0.12, 1.2, 1.14); 


INSERT INTO sale_item_master (id, transactionCode, transactionDate, totalAmount, totalDiscountAmount, vatAmount, grandTotalAmount, paymentMethod, promotionId, customerId) VALUES 
(7, 'SALE-DEC-007', '2024-12-15', 4.0, 0.2, 0.4, 4.2, 'Cash', 1, 2);

INSERT INTO sale_item_detail (id, transactionId, productId, quantity, unitPrice, discountPercentage, discountAmount, vatPercentage, vatAmount, totalAmount, grandTotalAmount) VALUES 
(12, 7, 1, 1, 0.7, 5.00, 0.035, 10.00, 0.07, 0.7, 0.665),
(13, 7, 7, 1, 2.5, 5.00, 0.125, 10.00, 0.25, 2.5, 2.375),
(14, 7, 8, 1, 2.0, 5.00, 0.10, 10.00, 0.20, 2.0, 1.90); 


INSERT INTO sale_item_master (id, transactionCode, transactionDate, totalAmount, totalDiscountAmount, vatAmount, grandTotalAmount, paymentMethod, promotionId, customerId) VALUES 
(8, 'SALE-DEC-008', '2024-12-18', 0.7, 0.035, 0.07, 0.735, 'Card', 1, 3);

INSERT INTO sale_item_detail (id, transactionId, productId, quantity, unitPrice, discountPercentage, discountAmount, vatPercentage, vatAmount, totalAmount, grandTotalAmount) VALUES 
(15, 8, 10, 1, 0.9, 5.00, 0.045, 10.00, 0.09, 0.9, 0.855); 


INSERT INTO sale_item_master (id, transactionCode, transactionDate, totalAmount, totalDiscountAmount, vatAmount, grandTotalAmount, paymentMethod, promotionId, customerId) VALUES 
(9, 'SALE-DEC-009', '2024-12-20', 1.6, 0.08, 0.16, 1.68, 'Cash', 1, 4);

INSERT INTO sale_item_detail (id, transactionId, productId, quantity, unitPrice, discountPercentage, discountAmount, vatPercentage, vatAmount, totalAmount, grandTotalAmount) VALUES 
(16, 9, 4, 1, 0.7, 5.00, 0.035, 10.00, 0.07, 0.7, 0.665),
(17, 9, 5, 1, 0.9, 5.00, 0.045, 10.00, 0.09, 0.9, 0.855); 


INSERT INTO sale_item_master (id, transactionCode, transactionDate, totalAmount, totalDiscountAmount, vatAmount, grandTotalAmount, paymentMethod, promotionId, customerId) VALUES 
(10, 'SALE-DEC-010', '2024-12-22', 0.7, 0.035, 0.07, 0.735, 'Card', 1, 5);

INSERT INTO sale_item_detail (id, transactionId, productId, quantity, unitPrice, discountPercentage, discountAmount, vatPercentage, vatAmount, totalAmount, grandTotalAmount) VALUES 
(18, 10, 9, 1, 0.7, 5.00, 0.035, 10.00, 0.07, 0.7, 0.665); 
