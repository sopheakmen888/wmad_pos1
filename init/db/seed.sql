-- Seed Data for Role Table
INSERT INTO role (id, name) VALUES 
(2, 'Inventory Manager'), 
(3, 'Cashier'), 
(4, 'Executive');

-- Seed Data for Supplier Table
INSERT INTO supplier (supplierName, contactName, contactEmail, contactPhone, addressLine1, province, taxIdentification) VALUES 
('Fresh Mart Suppliers', 'John Doe', 'john.doe@example.com', '123456789', '123 Fresh St', 'Phnom Penh', 'TAX001'),
('Beverage Co.', 'Jane Smith', 'jane.smith@example.com', '987654321', '456 Beverage Ln', 'Siem Reap', 'TAX002'),
('Food World', 'Paul Brown', 'paul.brown@example.com', '456123789', '789 Food Blvd', 'Battambang', 'TAX003');

-- Seed Data for Promotion Table
INSERT INTO promotion (promotionCode, description, startDate, endDate, discountPercentage) VALUES 
('PROMO001', 'New Year Discount', '2024-12-25', '2025-01-10', 10),
('PROMO002', 'Summer Sale', '2024-06-01', '2024-06-30', 20),
('PROMO003', 'Mart Anniversary Sale', '2024-09-01', '2024-09-15', 15),
('PROMO004', 'Buy 1 Get 1 Free', '2024-03-01', '2024-03-10', 50),
('PROMO005', 'Festive Discount', '2024-12-01', '2024-12-31', 25);

-- Seed Data for ProductCategory Table
INSERT INTO productCategory (nameEn, nameKh) VALUES 
('Food', 'ម្ហូបអាហារ'), 
('Beverage', 'ភេសជ្ជៈ');

-- Seed Data for Product Table
INSERT INTO product (nameEn, nameKh, categoryId, sku, imageUrl, createdBy, updatedBy) VALUES 
('Rice', 'អង្ករ', 1, 'FOOD001', 'https://example.com/rice.jpg', 1, 1), 
('Instant Noodles', 'មីបញ្ចប់', 1, 'FOOD002', 'https://example.com/noodles.jpg', 1, 1), 
('Canned Tuna', 'ត្រីកំប៉ុង', 1, 'FOOD003', 'https://example.com/tuna.jpg', 1, 1), 
('Cola', 'កូឡា', 2, 'BEV001', 'https://example.com/cola.jpg', 1, 1), 
('Orange Juice', 'ទឹកក្រូច', 2, 'BEV002', 'https://example.com/orange_juice.jpg', 1, 1), 
('Water Bottle', 'ទឹកស្អាត', 2, 'BEV003', 'https://example.com/water.jpg', 1, 1), 
('Milk', 'ទឹកដោះគោ', 2, 'BEV004', 'https://example.com/milk.jpg', 1, 1), 
('Energy Drink', 'ភេសជ្ជៈថាមពល', 2, 'BEV005', 'https://example.com/energy_drink.jpg', 1, 1), 
('Snacks', 'ស្ករគ្រាប់', 1, 'FOOD004', 'https://example.com/snacks.jpg', 1, 1), 
('Chocolate', 'សូកូឡា', 1, 'FOOD005', 'https://example.com/chocolate.jpg', 1, 1);

-- Seed Data for StockIn Table (Updated)
INSERT INTO stockIn (id, supplierId, referenceNumber, stockInDate) VALUES 
(1, 1, 'SKIN004', '2024-10-05 11:00:00'), 
(2, 2, 'SKIN005', '2024-10-15 14:30:00'), 
(3, 3, 'SKIN006', '2024-11-05 09:00:00'), 
(4, 1, 'SKIN007', '2024-11-15 16:00:00'), 
(5, 2, 'SKIN008', '2024-11-28 10:30:00');

-- Seed Data for StockInDetail Table (Updated with 5-10 items per stock)
INSERT INTO stockInDetail (stockInId, productId, quantity, purchaseUnitPrice, saleUnitPrice, totalPrice, expiryDate) VALUES 
-- StockIn 4 (SKIN004)
(1, 1, 150, 1.30, 1.60, 240.00, '2025-06-15'),
(1, 2, 180, 0.55, 0.85, 153.00, '2025-04-10'),
(1, 4, 200, 0.45, 0.65, 130.00, '2025-10-05'),
(1, 5, 220, 0.95, 1.25, 275.00, '2025-09-20'),
(1, 6, 300, 0.35, 0.55, 165.00, '2025-12-01'),

-- StockIn 5 (SKIN005)
(2, 7, 250, 1.25, 1.55, 387.50, '2025-05-10'),
(2, 8, 150, 1.55, 1.85, 277.50, '2025-07-01'),
(2, 9, 190, 2.05, 2.60, 494.00, '2025-08-01'),
(2, 10, 240, 1.65, 2.10, 504.00, '2025-10-01'),
(2, 3, 100, 1.65, 2.10, 210.00, '2025-11-30'),

-- StockIn 6 (SKIN006)
(3, 1, 200, 1.35, 1.70, 340.00, '2025-07-05'),
(3, 2, 250, 0.60, 0.90, 225.00, '2025-04-01'),
(3, 3, 120, 1.70, 2.20, 264.00, '2025-12-10'),
(3, 4, 180, 0.50, 0.70, 126.00, '2025-10-15'),
(3, 6, 220, 0.40, 0.60, 132.00, '2025-06-01'),

-- StockIn 7 (SKIN007)
(4, 5, 200, 0.95, 1.20, 240.00, '2025-08-10'),
(4, 7, 180, 1.30, 1.60, 288.00, '2025-05-30'),
(4, 8, 170, 1.60, 1.90, 323.00, '2025-11-01'),
(4, 9, 150, 2.10, 2.50, 375.00, '2025-07-01'),
(4, 10, 250, 1.70, 2.10, 525.00, '2025-09-01'),

-- StockIn 8 (SKIN008)
(5, 1, 180, 1.25, 1.50, 270.00, '2025-06-20'),
(5, 2, 200, 0.50, 0.80, 160.00, '2025-03-01'),
(5, 3, 170, 1.65, 2.10, 357.00, '2025-09-15'),
(5, 4, 200, 0.45, 0.65, 130.00, '2025-12-01'),
(5, 6, 150, 0.30, 0.50, 75.00, '2025-10-01');

-- Seed Data for StockIn Table (Updated)
INSERT INTO stockIn (id, supplierId, referenceNumber, stockInDate) VALUES 
(6, 1, 'SKIN009', '2024-12-01 11:00:00'), 
(7, 2, 'SKIN010', '2024-12-05 14:30:00'), 
(8, 3, 'SKIN011', '2024-12-10 09:00:00'), 
(9, 1, 'SKIN012', '2024-12-15 16:00:00');

-- Seed Data for StockInDetail Table (Updated with 6-10 items per stock)
INSERT INTO stockInDetail (stockInId, productId, quantity, purchaseUnitPrice, saleUnitPrice, totalPrice, expiryDate) VALUES 
-- StockIn 9 (SKIN009)
(6, 1, 200, 1.40, 1.80, 360.00, '2025-06-01'),
(6, 2, 300, 0.55, 0.85, 255.00, '2025-04-15'),
(6, 3, 150, 1.60, 2.00, 240.00, '2025-12-01'),
(6, 4, 400, 0.50, 0.70, 200.00, '2025-09-10'),
(6, 6, 250, 0.35, 0.55, 137.50, '2025-11-01'),
(6, 7, 300, 1.20, 1.50, 450.00, '2025-05-01'),

-- StockIn 10 (SKIN010)
(7, 1, 180, 1.30, 1.60, 288.00, '2025-06-25'),
(7, 2, 250, 0.60, 0.90, 225.00, '2025-03-01'),
(7, 5, 350, 1.00, 1.30, 455.00, '2025-10-15'),
(7, 6, 200, 0.45, 0.70, 140.00, '2025-08-20'),
(7, 9, 170, 2.05, 2.50, 350.00, '2025-07-05'),

-- StockIn 11 (SKIN011)
(8, 3, 250, 1.75, 2.20, 550.00, '2025-07-10'),
(8, 4, 300, 0.65, 0.85, 255.00, '2025-10-01'),
(8, 5, 150, 1.10, 1.40, 210.00, '2025-09-25'),
(8, 7, 180, 1.30, 1.60, 234.00, '2025-06-15'),
(8, 8, 200, 1.50, 1.80, 360.00, '2025-05-30'),
(8, 10, 250, 1.70, 2.00, 425.00, '2025-07-15'),

-- StockIn 12 (SKIN012)
(9, 2, 200, 0.50, 0.75, 150.00, '2025-04-01'),
(9, 3, 220, 1.60, 2.10, 352.00, '2025-12-10'),
(9, 4, 180, 0.55, 0.75, 135.00, '2025-09-15'),
(9, 6, 250, 0.40, 0.60, 150.00, '2025-06-10'),
(9, 7, 200, 1.25, 1.60, 320.00, '2025-05-05'),
(9, 8, 150, 1.45, 1.85, 217.50, '2025-08-20'),
(9, 9, 300, 2.10, 2.50, 630.00, '2025-07-10');

-- Seed Data for saleItemMaster Table
INSERT INTO saleItemMaster (id, saleDate, customerId, totalAmount, paymentMethod, status) VALUES
(1, '2024-12-01', 101, 300.00, 'Credit Card', 'Completed'),
(2, '2024-12-02', 102, 150.00, 'Cash', 'Completed'),
(3, '2024-12-03', 103, 500.00, 'Bank Transfer', 'Completed'),
(4, '2024-12-04', 104, 200.00, 'Credit Card', 'Completed'),
(5, '2024-12-05', 105, 350.00, 'Cash', 'Completed'),
(6, '2024-12-06', 106, 120.00, 'Bank Transfer', 'Completed'),
(7, '2024-12-07', 107, 420.00, 'Credit Card', 'Completed'),
(8, '2024-12-08', 108, 160.00, 'Cash', 'Completed'),
(9, '2024-12-09', 109, 700.00, 'Bank Transfer', 'Completed'),
(10, '2024-12-10', 110, 350.00, 'Credit Card', 'Completed'),
(11, '2024-12-11', 111, 450.00, 'Cash', 'Completed'),
(12, '2024-12-12', 112, 300.00, 'Bank Transfer', 'Completed'),
(13, '2024-12-13', 113, 250.00, 'Credit Card', 'Completed'),
(14, '2024-12-14', 114, 380.00, 'Cash', 'Completed'),
(15, '2024-12-15', 115, 150.00, 'Bank Transfer', 'Completed'),
(16, '2024-12-16', 116, 600.00, 'Credit Card', 'Completed'),
(17, '2024-12-17', 117, 550.00, 'Cash', 'Completed'),
(18, '2024-12-18', 118, 700.00, 'Bank Transfer', 'Completed'),
(19, '2024-12-19', 119, 420.00, 'Credit Card', 'Completed'),
(20, '2024-12-20', 120, 180.00, 'Cash', 'Completed');

-- Seed Data for saleItemDetail Table (Random number of items between 1 and 5 for each sale)
INSERT INTO saleItemDetail (saleItemMasterId, productId, quantity, salePrice, totalPrice) VALUES
-- SaleItemMaster 1
(1, 1, 2, 1.60, 3.20),
(1, 2, 1, 0.85, 0.85),
(1, 4, 1, 0.65, 0.65),
-- SaleItemMaster 2
(2, 1, 3, 1.30, 3.90),
(2, 6, 1, 0.55, 0.55),
-- SaleItemMaster 3
(3, 2, 2, 0.90, 1.80),
(3, 4, 1, 0.70, 0.70),
(3, 5, 1, 1.25, 1.25),
(3, 7, 1, 1.50, 1.50),
-- SaleItemMaster 4
(4, 6, 2, 0.60, 1.20),
(4, 8, 1, 1.60, 1.60),
-- SaleItemMaster 5
(5, 9, 1, 2.50, 2.50),
(5, 3, 1, 1.80, 1.80),
-- SaleItemMaster 6
(6, 10, 2, 2.10, 4.20),
(6, 2, 1, 0.85, 0.85),
-- SaleItemMaster 7
(7, 1, 3, 1.40, 4.20),
(7, 8, 1, 1.80, 1.80),
(7, 5, 1, 1.30, 1.30),
-- SaleItemMaster 8
(8, 3, 1, 1.70, 1.70),
(8, 9, 2, 2.05, 4.10),
-- SaleItemMaster 9
(9, 10, 2, 2.00, 4.00),
(9, 7, 1, 1.60, 1.60),
(9, 4, 1, 0.70, 0.70),
-- SaleItemMaster 10
(10, 5, 1, 1.25, 1.25),
(10, 2, 1, 0.85, 0.85),
-- SaleItemMaster 11
(11, 6, 2, 0.55, 1.10),
(11, 3, 1, 1.80, 1.80),
(11, 8, 1, 1.40, 1.40),
-- SaleItemMaster 12
(12, 9, 1, 2.50, 2.50),
(12, 7, 1, 1.50, 1.50),
(12, 2, 1, 0.85, 0.85),
-- SaleItemMaster 13
(13, 1, 2, 1.60, 3.20),
(13, 10, 1, 2.00, 2.00),
-- SaleItemMaster 14
(14, 8, 1, 1.80, 1.80),
(14, 9, 2, 2.50, 5.00),
-- SaleItemMaster 15
(15, 3, 1, 1.80, 1.80),
(15, 7, 1, 1.60, 1.60),
-- SaleItemMaster 16
(16, 6, 2, 0.50, 1.00),
(16, 2, 1, 0.85, 0.85),
(16, 5, 1, 1.30, 1.30),
-- SaleItemMaster 17
(17, 4, 1, 0.75, 0.75),
(17, 6, 1, 0.60, 0.60),
(17, 8, 1, 1.70, 1.70),
-- SaleItemMaster 18
(18, 1, 2, 1.40, 2.80),
(18, 5, 1, 1.25, 1.25),
-- SaleItemMaster 19
(19, 2, 1, 0.85, 0.85),
(19, 3, 1, 1.80, 1.80),
(19, 6, 1, 0.55, 0.55),
-- SaleItemMaster 20
(20, 7, 1, 1.50, 1.50),
(20, 9, 1, 2.05, 2.05);

