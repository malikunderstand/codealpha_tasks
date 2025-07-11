-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2025 at 12:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `addcarts`
--

CREATE TABLE `addcarts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `profile` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `profile`) VALUES
(1, 'Mobile Accessories', '1751363357555.jfif'),
(2, 'Electronics & Gadgets', '1751285310349.png'),
(3, 'Home & Furniture', '1751285350495.avif'),
(4, 'Beauty & Personal Care', '1751285416115.jfif'),
(5, 'Health & Fitness', '1751285426183.jpg'),
(6, 'Groceries & Essentials', '1751285462257.jfif'),
(7, 'Cleaning & Laundry', '1752227915730.jfif'),
(8, 'Books & Stationery ', '1751285616503.jfif'),
(9, 'Toys & Baby Products', '1751285626869.jfif'),
(11, 'Automobile Accessories', '1751355074931.jfif');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(80) NOT NULL,
  `description` varchar(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `image` varchar(200) NOT NULL,
  `category` varchar(300) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('pending','placed','shipped','delivered','cancelled','unknown') DEFAULT 'placed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `name`, `price`, `description`, `quantity`, `image`, `category`, `updated_at`, `status`) VALUES
(4, 'Wall Shelf', 1850, 'Space-saving stylish shelf for books and décor\r\n\r\n', 2, '1751880634588.jfif', '3', '2025-07-08 09:37:40', 'placed'),
(5, 'Loud PB310', 2345, 'Portable, fast-charging power bank with long battery life.', 1, '1751459498063.jpg', '1', '2025-07-10 11:05:01', 'placed'),
(6, 'Dove Hair Conditioner', 480, 'Softens hair, repairs damage, controls frizz daily.', 2, '1752043742597.jfif', '4', '2025-07-10 11:17:49', 'placed'),
(7, 'Lcd Connector', 899, 'Dvi to Vga 24+5 Connectordisplays to circuit boards reliably', 1, '1751634941213.png', '2', '2025-07-10 13:31:41', 'placed'),
(8, 'iPad 10th Gen', 10999, 'Uniq Moven Case for iPad 10th Gen (2022) 10.9’ – Charcoal (Grey)', 2, '1751459915006.png', '1', '2025-07-11 09:58:46', 'delivered'),
(9, ' LED Rechargeable Torch', 1499, ' Long-range flashlight with adjustable zoom and built-in', 2, '1751875480305.jpg', '2', '2025-07-11 08:32:43', 'placed'),
(10, 'Power Bank', 2345, 'Portable, fast-charging power bank with long battery life.', 1, '1751874300348.png', '1', '2025-07-11 08:33:37', 'placed'),
(11, 'Wall Shelf', 1850, 'Space-saving stylish shelf for books and décor\r\n\r\n', 2, '1751880634588.jfif', '3', '2025-07-11 10:05:20', 'placed'),
(12, 'iPad 10th Gen', 10999, 'Uniq Moven Case for iPad 10th Gen (2022) 10.9’ – Charcoal (Grey)', 1, '1751459915006.png', '1', '2025-07-11 10:22:07', 'placed');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image`, `category_id`) VALUES
(1, 'Loud PB310', 2345.00, 'Portable, fast-charging power bank with long battery life.', '1751459498063.jpg', 1),
(2, ' Galaxy Z', 19499.00, 'Spigen Samsung Galaxy Z Fold 4 Thin Fit P Case', '1751459646147.gif', 1),
(3, 'OnePlus', 8999.00, 'OnePlus Bullets Wireless Z2 ANC Neckband', '1751459744632.jpg', 1),
(4, 'Whitestone iPhone ', 1999.00, '13 Pro (6.1″) Whitestone Camera EZ Protectors – Pack of 2', '1751459832305.gif', 1),
(5, 'iPad 10th Gen', 10999.00, 'Uniq Moven Case for iPad 10th Gen (2022) 10.9’ – Charcoal (Grey)', '1751459915006.png', 1),
(6, 'Mobile Cover', 899.00, 'Customized Mobile Case for Apple iPhones (Vespa Design)', '1751634252272.png', 1),
(8, 'Wireless Charger', 10999.00, 'joyroom JR-WQN01 3 in 1 Magnetic Charging Station', '1751634578657.gif', 1),
(9, 'Mike Speaker', 5400.00, 'BM800+V8s Condenser Rechargeable Microphone Set', '1751634716876.jpg', 2),
(10, 'Barcode Scanner', 7800.00, '8700 Wireless Barcode Scanner with Stand & Receiver 2.4G', '1751634824947.jpeg', 2),
(11, 'Lcd Connector', 899.00, 'Dvi to Vga 24+5 Connectordisplays to circuit boards reliably', '1751634941213.png', 2),
(12, 'JoyStick', 3350.00, 'Ps4 JET BLACK Dualshock4 Wireless Game Controller', '1751874882686.png', 2),
(13, 'Wireless Bluetooth Headphones', 899.00, 'Noise-cancelling over-ear headphones with long batter', '1751875587822.jfif', 2),
(14, 'Power Bank', 2345.00, 'Portable, fast-charging power bank with long battery life.', '1751874300348.png', 1),
(15, ' LED Rechargeable Torch', 1499.00, ' Long-range flashlight with adjustable zoom and built-in', '1751875480305.jpg', 2),
(16, 'Wireless Mouse', 1050.00, 'Compact, USB nano receiver mouse with up 12', '1751875807265.jfif', 2),
(17, 'Magnetic Phone Holder', 750.00, '60° rotating magnetic phone holder for car dashboard\r\n\r\n', '1751875866868.jfif', 2),
(18, 'Accent Chair', 8000.00, 'Soft, and comfortable cozy lounge chair with wooden legs', '1751877730305.jfif', 3),
(19, 'Hydraulic Storage Bed', 65000.00, 'Spacious wooden bed with hidden storage beneath', '1751877971793.jfif', 3),
(20, '3+2+1 Seater Fabric Sofa Set', 59000.00, 'Comfortable modern design sofa with soft cushions', '1751880263807.jfif', 3),
(21, '6-Seater Solid Wood Dining Set', 38999.00, 'Elegant wood table with six soft padded chairs', '1751880386446.jfif', 3),
(22, 'Curtain Set', 2100.00, 'hick blackout useful curtains for privacy and elegance', '1751880541279.jfif', 3),
(23, 'Wall Shelf', 1850.00, 'Space-saving stylish shelf for books and décor\r\n\r\n', '1751880634588.jfif', 3),
(24, 'Dressing Table', 12300.00, 'Sleek design with mirror and storage drawers', '1751880757460.jfif', 3),
(25, '4 Door Wardrobe', 50000.00, 'Spacious wardrobe with mirror, drawers, and shelves', '1751881072838.jfif', 3),
(26, 'Neutrogena Face Wash', 850.00, 'Gentle cleanser removes dirt, oil, and impurities fast.', '1752043575561.jfif', 4),
(27, 'Nivea Soft Moisturizer', 550.00, ' Lightweight cream keeps skin fresh, soft, hydrated.', '1752043659356.jfif', 4),
(28, 'Sunsilk Black Shine Shampoo', 420.00, 'Nourishes hair, adds shine, reduces breakage beautifully.', '1752043694223.jfif', 4),
(29, 'Dove Hair Conditioner', 480.00, 'Softens hair, repairs damage, controls frizz daily.', '1752043742597.jfif', 4),
(30, 'Maybelline Baby Lips Balm', 330.00, ' Hydrates lips, gives shine, smooth feel instantly.\r\n', '1752043816479.jfif', 4),
(31, 'Garnier Sunblock SPF 50', 780.00, 'Protects skin from sunburn, UVA/UVB and Sun rays.', '1752043870716.jfif', 4),
(32, 'Engage Women Perfume Spray', 1200.00, 'Long-lasting floral scent for all-day freshness.', '1752043918994.jfif', 4),
(33, 'Himalaya Purifying  Face Mask', 620.00, 'Deep cleans pores, removes acne, gives glow.', '1752043960438.jfif', 4),
(34, 'Whey Protein Powder (1kg)', 5200.00, ' Builds muscle, supports recovery, boosts workout performance\r\n\r\n', '1752044574241.jfif', 5),
(35, 'Yoga Mat (Anti-Slip)', 1400.00, ' Comfortable grip for safe, balanced yoga sessions.', '1752044618738.jfif', 5),
(36, ' Vitamax Multivitamin Tablets', 850.00, ' Supports immunity, energy, hair, and skin health.\r\n', '1752044743994.jfif', 5),
(37, 'Digital Weighing Scale', 1800.00, 'Accurate weight tracking with LED digital display.', '1752044784486.jfif', 5),
(38, 'Smart Water Bottle (Tracker)', 2500.00, ' Reminds you to stay hydrated and every hour.', '1752044885037.jfif', 5),
(39, 'Xiaomi fitness Smartwatch Band', 3200.00, 'Tracks steps, heart rate, calories control, and sleep', '1752044965062.jfif', 5),
(40, 'Blender Bottle (Shaker)', 750.00, 'Mixes protein drinks, smoothies easily on-the-go.', '1752045049981.jfif', 5),
(41, 'Posture Corrector Belt', 1600.00, 'Aligns back, reduces pain, improving your sitting posture.', '1752045134953.jfif', 5),
(42, 'Daawat Basmati Rice (5kg)', 2450.00, 'Long grain rice, perfect for biryani and pulao.', '1752045521625.jfif', 6),
(43, 'National Salt (Refined Iodized)', 60.00, '\r\n Pure iodized salt for daily basis  cooking needs', '1752045670334.jfif', 6),
(44, ' Meezan Cooking Oil (1L)', 510.00, ' Heart-healthy oil, ideal for everyday make frying.', '1752045753252.jfif', 6),
(45, 'Nescafé Classic Coffee (100g)', 690.00, 'Rich flavor coffee to energize and joy your mornings.', '1752045796885.jfif', 6),
(46, 'Sooper Biscuits (12 Pack)', 320.00, 'Soft and crispy egg biscuits, tea-time favorite.', '1752045853102.jfif', 6),
(47, 'Fresh Farm Eggs (1 Dozen)', 300.00, 'Protein-rich fresh eggs from local poultry farms.\r\n', '1752045893147.jfif', 6),
(48, ' Lifebuoy Hand Wash (200ml)', 180.00, '100% Kills germs instantly, protects hands from infection.', '1752045959952.jfif', 6),
(49, 'Rose Petal Toilet Roll (4 Pack)', 230.00, ' Soft and strong tissue rolls for germs  hygiene.', '1752046011884.jfif', 6),
(50, 'Surf Excel Powder (1kg)', 480.00, 'Removes tough stains quickly, brightens clothes every wash.', '1752046394212.jfif', 7),
(51, ' Dettol Antiseptic Liquid (500ml)', 520.00, ' Kills 99.9% germs, used for Cleaning surface disinfection.', '1752046448032.jfif', 7),
(52, 'Vim Dishwash Bar (300g)', 80.00, 'Powerful grease cutter, leaves utensils sparkling and clean.', '1752046499978.jfif', 7),
(53, 'Harpic Toilet Cleaner (500ml)', 310.00, ' Removes stains, kills germs, and keeps toilet fresh.', '1752046563583.jfif', 7),
(54, 'Air Freshener Spray (300ml)', 260.00, 'Refreshes room air with pleasant long-lasting fragrance.', '1752046607837.jfif', 7),
(55, 'Comfort Fabric Softener (800ml)', 430.00, 'Softens clothes, adds fragrance, reduces the wrinkles instantly.', '1752046660192.jfif', 7),
(56, ' Floor Cleaning Mop (Spin Type)', 1950.00, 'Easy-to-use mop for efficient and floor cleaning.', '1752046706602.jfif', 7),
(57, 'Scrub Sponge (2 Pack)', 150.00, 'Dual-sided sponge for kitchen and dish cleaning.', '1752046751825.jfif', 7),
(58, 'Oxford English Dictionary', 650.00, 'Compact dictionary with meanings, synonyms, and grammar help.', '1752048855077.jfif', 8),
(59, 'Spiral Notebook A4 (300 Pages)', 270.00, 'Durable spiral notebook for school or office work.', '1752048938292.jfif', 8),
(60, 'Dollar Blue Ink Pen (10 Pack)', 220.00, ' Smooth writing pens for school and office use.', '1752049006103.jfif', 8),
(61, 'MatheMatics 9th class (PBL)', 480.00, ' Complete solved notes or MCQs, and board questions.', '1752049167597.jfif', 8),
(62, 'Goldfish pencil', 231.00, 'Goldfish Autocrat 12 Pcs HB Pencils Blister Pack', '1752049242156.png', 8),
(63, 'Stapler Machine (Small Size)', 150.00, ' Compact stapler, ideal for papers , photo and files.', '1752049394339.jfif', 8),
(64, 'Sticky Notes Pad (5 Colors)', 130.00, 'Colorful sticky notes for reminders event and planning.', '1752049533380.jfif', 8),
(65, 'Casio Scientific Calculator', 2200.00, 'Essential calculator for all students and engineering calculations.', '1752049586021.jfif', 8),
(66, 'Soft Plush Teddy Bear', 850.00, 'Cuddly and soft toy for little kids for fun and playing.', '1752050113236.jfif', 9),
(67, 'Baby Feeding Bottle(250ml)', 380.00, 'Safe feeding bottle with anti-colic nipple design.', '1752050192655.jfif', 9),
(68, 'Educationa Puzzle Board', 450.00, 'Helps kids learn alphabets through fun and puzzles.', '1752050332726.jfif', 9),
(69, 'Baby Pampers Small (28 Pack) ', 1200.00, 'Ultra-absorbent, leak to protection, keeps baby dry.\r\n', '1752050437526.jfif', 9),
(70, 'Friction Toy Car (Plastic)', 320.00, 'Push and go car, fun for toddlers and other.', '1752050511602.jfif', 9),
(71, 'Baby Shampoo – Johnson’s', 390.00, 'Gentle on eyes, softens and cleans baby hair.', '1752050565269.jfif', 9),
(72, 'Lego Building Blocks 50  Set', 1600.00, 'Colorful blocks to boost creativity and extra coordination.', '1752050642142.jfif', 9),
(73, 'Baby Mosquito Net Bed Set ', 1850.00, 'Comfortable through bedding with net to protect  baby.', '1752050737124.jfif', 9),
(74, '2pcs Universal Moti Seat ', 2999.00, 'Universal Moti Seat Cover Anti-Slip Accupressure Design', '1752055911651.webp', 11),
(75, 'Car KeyChain', 500.00, 'Exclusive Gold-Line Honda Vezel TPU Key Cover 2013-20', '1752056130746.webp', 11),
(76, 'Car Fragrence', 1500.00, 'Areon Gel Sport Lux - Gold - Gel and Perfume', '1752056311521.webp', 11),
(77, 'Tyre Inflator', 3700.00, 'Samco Portable  And Air Compressor With LED Light - SM1610', '1752056518931.webp', 11),
(78, 'Seat Cushion,', 1388.00, ' Car Seat Cushions, Chair Cushions Pure Posture Avoid \r\n', '1752056642773.jfif', 11),
(79, 'Car Rim', 80000.00, 'Toyota Hilux Revo Alloy Rim GR Style 18 Inch', '1752056922183.webp', 11),
(80, 'Momo Steering Wheel Red', 5500.00, 'Controls vehicle direction with smooth, responsive handling.', '1752057146957.jpg', 11),
(81, 'Car Led', 23999.00, 'Diamond Universal Car Android Panel 10 Inch 2K Scree ', '1752057196241.webp', 11);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Nazeer', 'maliknazeerahmed07@gmail.com', '$2b$10$CZ1ZWK1TLrceuMI.ZWLLY.YjSB9qpVVMBvMOJ09k3zBLsNDXHep2O', '2025-07-03 06:10:25');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addcarts`
--
ALTER TABLE `addcarts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addcarts`
--
ALTER TABLE `addcarts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
