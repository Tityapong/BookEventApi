-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (x86_64)
--
-- Host: junction.proxy.rlwy.net    Database: booking
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `role` enum('Admin','Supplier','User') NOT NULL,
  `isApproved` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_approved` tinyint(1) DEFAULT '0',
  `googleId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `googleId` (`googleId`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Tityapong','tityapongs@gmail.com','$2b$12$Z5GbrkCdknO1oJBQ8OwinezdQMgpA1qpkkD4ckaQKwSHkAzxZa3MO',NULL,'Phnom Penh','Admin',0,'2024-12-15 06:41:38','2025-01-06 06:42:55',1,NULL),(2,'pong','pong@gmail.com','$2a$10$lAifQi4Qbo6yIvOYYM3J9uQ1DtQsiFdLTWxgu/mxG1z7Q7HWowIo.','1234567890','Phnom Penh','Supplier',0,'2024-12-15 06:48:15','2024-12-15 06:49:27',0,NULL),(3,'pong','pongpong@gmail.com','$2a$10$UMZvV.E.aw3NWGp3riMyl.wYaPxKu8SKPg97KDxdLKe5IXdJfGcRK','1234567890','Phnom Penh','Supplier',0,'2024-12-15 06:59:04','2025-01-18 14:44:34',0,NULL),(6,'Jane Smith','jane.smith@example.com',NULL,'9876543210',NULL,'User',0,'2024-12-15 15:30:38','2024-12-15 15:47:01',0,NULL),(16,'pong','tipong@gmail.com','$2a$10$SU9FNR7KvTj4QwEuqxc5l.b3Fmi9PPMlYwHY.m/sNhX5XJ7eASZwm','1234567890','Phnom Penh','User',0,'2024-12-17 13:14:05','2025-01-06 08:47:23',0,NULL),(18,'pong','jojoba@gmail.com','$2a$10$mVeUkpK6ZhyoL9XmRC8j1.0TsfErvN476EFVUIsDbHFEsoHRGqC7e','0233232332','2004','User',0,'2024-12-17 15:43:33','2024-12-17 15:43:33',0,NULL),(19,'pong','s@gmail.com','$2a$10$W92fFXIpKr9.hPj6snWk9eA62VXirjzqL9XOmZA5RFWq.U8FWyHgS','0233232332','2004','User',0,'2024-12-17 15:53:45','2025-01-07 17:25:43',0,NULL),(26,'pong','ko@gmail.com','$2a$10$KDTw7.wUKV3lfduS/6Os8.gKi327LEvvkj4amHg.xx7W6Q009ewam','0233232332','2004','User',0,'2024-12-21 14:06:00','2025-01-18 01:56:41',0,NULL),(28,'titya pong','tityapong11@gmail.com','$2a$10$zvLMmAZxGHo7P0WONqIqqu5LiMdzfsOoDRYcez53WGSMZwYfeiYPW','015758787','Kompong Chhange','User',0,'2024-12-23 15:32:54','2025-01-04 17:34:20',0,NULL),(47,'dydy na','dd@gmail.com','$2a$10$s2gVSJVjNDgJJVzZF0cHHuW7JJ7/7JLLfOOYqc4Qzzw0uFsW34wqK','0233232332','Poi','User',0,'2024-12-25 02:18:33','2024-12-25 02:18:33',0,NULL),(54,'mika pong','jo@gmail.com','$2a$10$HWTwcBisBroJJqDEwZWEEeicKx.cQSxWCTmh9beD5l6n3bSbql0BW','0233232332','Poi','User',0,'2025-01-01 08:37:18','2025-01-01 08:37:18',0,NULL),(57,'Pong Pong','pong2@gmail.com','$2a$10$5ATAPELIDSPJs/3hwApcweg955zNl98N6XgyAwREkD7TG1NSMbDZK','08978989','Kpc','User',0,'2025-01-04 13:19:17','2025-01-13 14:53:31',0,NULL),(58,'mika pong','king@gmail.com','$2a$10$38S0cr2.fSzirUQssStWFOc6k.O6OMnNhNdwdAsl10x7mQuQKKlAG','0233232332','Poi','User',0,'2025-01-04 14:44:44','2025-01-04 14:44:44',0,NULL),(59,'pong','pong2025@gmail.com','$2a$10$0AWZ/tknHqNVscYOogc/Qe2o.125QVmro7MQ9SsDs7ZTPAhLB.DXy','1234567890','Phnom Penh','User',0,'2025-01-06 14:51:42','2025-01-13 14:53:55',0,NULL),(65,'mika pong','pongv3@gmail.com','$2a$10$t3ossMrj6T3eIpdR9.L/aumKCmSdfnfaPWghRVklKCWTbnJe9aeGu','0233232332','koh kong','User',0,'2025-01-08 14:26:13','2025-01-17 16:37:26',0,NULL),(66,'pong pong','user@example.com','$2a$10$CvTSMVsx.3sJTz1.66XWpefScwXRbvZsyaxanvmUV1ile4olDc7AG','015758787','phnomenh','User',0,'2025-01-16 16:25:45','2025-01-16 16:25:45',0,NULL),(67,'Leang hoa','Betrayalhoa@gmail.com','$2a$10$1CCbKJEdDCFWsReSgne.O.J8p0c2DixnQxlKjvSav1G98oDAtSzPi','069737601','Phnom Penh','Admin',0,'2025-01-17 16:31:50','2025-01-18 00:27:31',0,NULL),(68,'DRa pong','Drpong@gmail.com','$2a$10$K7hL0xdVjJntChrX720bT.R1uul7ZKccIO7yxYf4rWVZ937c6MgyO','0233232332','Poi','User',0,'2025-01-17 22:44:56','2025-01-21 14:36:37',0,NULL),(69,'Tityapong sok','pong2024@gmail.com','$2a$10$tMaS1k67sfYNnjWI8c3bHOwOMM0zmtYXd9foFeBHi9gQpeQUWuRwi','015758787','koh kong','Supplier',0,'2025-01-18 01:26:22','2025-01-21 04:41:32',0,NULL),(70,'Seang sopheak','sopheakseang395@gmail.com','$2a$10$bhBiuyAHriVXLSeaLawYruGePonuzF6z1VVmVTXExOpt4Grw7Llyq','0972598347','Phnom Penh','Supplier',0,'2025-01-18 14:46:49','2025-01-18 14:53:48',0,NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `event_date` datetime NOT NULL,
  `status` enum('Pending','Confirmed','Rejected') NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `contact_name` varchar(255) NOT NULL,
  `contact_email` varchar(255) NOT NULL,
  `contact_phone` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,3,1,'2024-12-25 00:00:00','Confirmed','2024-12-15 07:21:07','2024-12-17 02:19:51','','',''),(2,3,1,'2024-10-25 00:00:00','Confirmed','2024-12-15 08:53:33','2025-01-11 10:44:54','','',''),(3,3,1,'2024-10-25 00:00:00','Confirmed','2024-12-15 09:11:29','2024-12-15 17:23:53','','',''),(4,6,1,'2024-12-22 00:00:00','Confirmed','2024-12-15 15:30:38','2024-12-15 17:14:54','','',''),(5,6,1,'2024-12-22 00:00:00','Pending','2024-12-15 15:39:19','2024-12-15 15:39:19','','',''),(6,6,1,'2024-12-22 00:00:00','Pending','2024-12-15 15:41:42','2024-12-15 15:41:42','','',''),(7,6,1,'2024-12-22 00:00:00','Pending','2024-12-15 15:45:17','2024-12-15 15:45:17','','',''),(8,6,1,'2024-12-22 00:00:00','Rejected','2024-12-15 15:47:35','2024-12-17 02:31:22','','',''),(9,6,1,'2024-12-22 00:00:00','Rejected','2024-12-17 05:08:44','2024-12-17 05:25:22','','',''),(10,6,1,'2024-12-22 00:00:00','Pending','2024-12-17 06:11:43','2024-12-17 06:11:43','','',''),(11,6,2,'2024-12-22 00:00:00','Confirmed','2024-12-17 06:14:15','2024-12-17 06:23:38','','',''),(12,6,3,'2024-12-22 00:00:00','Pending','2024-12-17 13:09:39','2024-12-17 13:09:39','','',''),(13,6,2,'2024-12-22 00:00:00','Pending','2024-12-17 13:17:47','2024-12-17 13:17:47','','',''),(14,16,2,'2024-12-22 00:00:00','Confirmed','2024-12-17 13:30:22','2024-12-21 05:32:02','pong','tipong@gmail.com','9876543210'),(15,16,3,'2024-12-22 00:00:00','Rejected','2024-12-17 13:33:51','2024-12-17 13:34:08','pong','tipong@gmail.com','9876543210'),(18,16,3,'2024-12-22 00:00:00','Rejected','2024-12-20 15:32:15','2024-12-22 13:56:50','pong','tipong@gmail.com','9876543210'),(19,16,3,'2024-12-22 00:00:00','Confirmed','2024-12-22 14:43:35','2024-12-22 14:45:18','pong','tipong@gmail.com','9876543210'),(20,16,22,'2024-12-27 00:00:00','Pending','2024-12-22 15:38:02','2024-12-22 15:38:02','joko','tityapongs@gmail.com','0233232332'),(21,16,22,'2025-01-22 00:00:00','Rejected','2024-12-22 15:47:39','2025-01-11 18:52:42','jingkong','tityapongs@gmail.com','010222222222'),(22,28,23,'2024-12-30 00:00:00','Confirmed','2024-12-23 15:34:10','2025-01-14 13:31:32','Mrpong','tityapong77@gmail.com','015758787'),(23,47,2,'2025-01-02 00:00:00','Rejected','2024-12-25 02:19:34','2025-01-11 15:10:31','mika pong','tityapongs@gmail.com','0233232332'),(24,16,2,'2025-01-05 00:00:00','Pending','2024-12-27 15:08:30','2024-12-27 15:08:30','mika pong','tityapongs@gmail.com','0233232332'),(25,16,36,'2025-01-03 00:00:00','Confirmed','2025-01-02 14:44:25','2025-01-12 07:51:49','mika pong','tityapongs@gmail.com','0233232332'),(26,16,1,'2025-01-15 00:00:00','Pending','2025-01-02 14:45:01','2025-01-02 14:45:01','mika pong','tityapongs@gmail.com','0233232332'),(27,16,1,'2025-01-30 00:00:00','Pending','2025-01-02 14:47:40','2025-01-02 14:47:40','mika pong','tityapongs@gmail.com','0233232332'),(28,57,1,'2025-01-06 00:00:00','Confirmed','2025-01-04 13:22:01','2025-01-04 13:33:03','Kira','pong@gmail.com','pong2233'),(29,16,37,'2025-01-11 00:00:00','Confirmed','2025-01-05 08:27:38','2025-01-11 15:29:52','mika pong','tityapongs@gmail.com','0233232332'),(30,16,24,'2025-01-10 00:00:00','Confirmed','2025-01-07 05:50:06','2025-01-11 18:41:20','DR pong','tityapongs@gmail.com','0233232332'),(31,16,36,'2025-01-30 00:00:00','Pending','2025-01-07 14:03:43','2025-01-07 14:03:43','mika pong','tityapongs@gmail.com','0233232332'),(32,16,1,'2025-01-16 00:00:00','Pending','2025-01-07 14:10:40','2025-01-07 14:10:40','pong','s@gmail.com','0233232332'),(33,16,36,'2025-01-15 00:00:00','Pending','2025-01-07 14:20:47','2025-01-07 14:20:47','mika pong','tityapongs@gmail.com','0233232332'),(34,16,25,'2025-01-24 00:00:00','Pending','2025-01-07 14:24:58','2025-01-07 14:24:58','mika pong','tityapongs@gmail.com','0233232332'),(35,16,1,'2025-01-30 00:00:00','Pending','2025-01-07 14:28:45','2025-01-07 14:28:45','Jr pong','tityapongs@gmail.com','0233232332'),(36,16,3,'2025-01-15 00:00:00','Confirmed','2025-01-07 14:36:57','2025-01-12 05:45:00','mika pong','tityapongs@gmail.com','0233232332'),(37,16,36,'2025-01-16 00:00:00','Pending','2025-01-08 05:59:56','2025-01-08 05:59:56','mika pong','Drpong@gmail.com','0233232332'),(38,16,1,'2025-01-31 00:00:00','Confirmed','2025-01-08 06:12:18','2025-01-09 05:36:18','mika pong','tityapongs@gmail.com','0233232332'),(39,16,1,'2025-01-22 00:00:00','Pending','2025-01-08 06:24:22','2025-01-08 06:24:22','mika pong','tityapongs@gmail.com','0233232332'),(40,16,1,'2025-01-31 00:00:00','Pending','2025-01-08 06:27:04','2025-01-08 06:27:04','mika pong','tityapongs@gmail.com','0233232332'),(41,16,2,'2025-01-29 00:00:00','Pending','2025-01-08 06:38:57','2025-01-08 06:38:57','mika pong','tityapongs@gmail.com','0233232332'),(42,16,1,'2025-01-21 00:00:00','Confirmed','2025-01-08 13:35:39','2025-01-11 15:20:38','mika pong','tityapongs@gmail.com','0233232332'),(43,16,1,'2025-01-29 00:00:00','Pending','2025-01-08 13:38:16','2025-01-08 13:38:16','mika pong','tityapongs@gmail.com','0233232332'),(44,16,2,'2025-01-22 00:00:00','Pending','2025-01-08 13:41:06','2025-01-08 13:41:06','mika pong','tityapongs@gmail.com','0233232332'),(45,16,22,'2025-01-24 00:00:00','Pending','2025-01-08 13:50:45','2025-01-08 13:50:45','mika pong','tityapongs@gmail.com','0233232332'),(46,16,19,'2025-01-22 00:00:00','Pending','2025-01-08 13:55:48','2025-01-08 13:55:48','mika pong','tityapongs@gmail.com','0233232332'),(47,16,1,'2025-01-22 00:00:00','Pending','2025-01-08 13:56:30','2025-01-08 13:56:30','DR pong','tityapongs@gmail.com','0233232332'),(48,16,36,'2025-01-30 00:00:00','Pending','2025-01-08 13:57:10','2025-01-08 13:57:10','mika pong','tityapongs@gmail.com','0233232332'),(49,16,30,'2025-01-22 00:00:00','Pending','2025-01-08 14:03:42','2025-01-08 14:03:42','mika pong','tityapongs@gmail.com','0233232332'),(50,16,36,'2025-02-07 00:00:00','Pending','2025-01-08 14:04:57','2025-01-08 14:04:57','mika pong','tityapongs@gmail.com','0233232332'),(51,16,24,'2025-01-31 00:00:00','Pending','2025-01-09 02:50:17','2025-01-09 02:50:17','mika pong','tityapongs@gmail.com','015758787'),(52,16,25,'2025-02-01 00:00:00','Confirmed','2025-01-09 02:54:17','2025-01-12 07:51:57','Dr pong','tityapongs@gmail.com','010200027'),(53,65,23,'2025-01-23 00:00:00','Pending','2025-01-09 02:59:36','2025-01-09 02:59:36','DR pong','tityapongs@gmail.com','0233232332'),(54,65,23,'2025-01-22 00:00:00','Pending','2025-01-09 03:01:52','2025-01-09 03:01:52',' pong','tityapongs@gmail.com','0233232332'),(55,65,22,'2025-01-23 00:00:00','Pending','2025-01-09 03:23:19','2025-01-09 03:23:19','pong','tityapongs@gmail.com','0233232332'),(56,16,19,'2025-01-30 00:00:00','Pending','2025-01-09 03:48:16','2025-01-09 03:48:16','mika pong','tityapongs@gmail.com','0233232332'),(57,16,30,'2025-01-23 00:00:00','Pending','2025-01-09 04:34:02','2025-01-09 04:34:02','mika pong','tityapongs@gmail.com','0233232332'),(58,16,23,'2025-02-06 00:00:00','Pending','2025-01-09 04:57:01','2025-01-09 04:57:01','kk','tityapongs@gmail.com','0233232332'),(59,65,30,'2025-01-31 00:00:00','Pending','2025-01-09 05:21:10','2025-01-09 05:21:10','pong','s@gmail.com','0233232332'),(60,65,38,'2025-01-30 00:00:00','Confirmed','2025-01-09 05:29:36','2025-01-09 05:38:27','mika pong','tityapongs@gmail.com','015758787'),(61,16,37,'2025-01-31 00:00:00','Pending','2025-01-09 13:50:54','2025-01-09 13:50:54','mika pong','tityapongs@gmail.com','0233232332'),(62,16,37,'2025-01-29 00:00:00','Pending','2025-01-10 03:04:54','2025-01-10 03:04:54','mika pong','tityapongs@gmail.com','0233232332'),(63,16,37,'2025-01-29 00:00:00','Pending','2025-01-10 03:12:26','2025-01-10 03:12:26','mika pong','tityapongs@gmail.com','0233232332'),(64,16,37,'2025-01-29 00:00:00','Rejected','2025-01-10 03:12:32','2025-01-14 13:27:14','mika pong','tityapongs@gmail.com','0233232332'),(65,16,37,'2025-01-29 00:00:00','Confirmed','2025-01-10 03:13:07','2025-01-14 13:27:05','mika pong','tityapongs@gmail.com','0233232332'),(68,16,37,'2025-01-22 00:00:00','Pending','2025-01-10 03:53:21','2025-01-10 03:53:21','mika pong','tityapongs@gmail.com','0233232332'),(69,16,3,'2024-12-22 00:00:00','Pending','2025-01-10 03:54:35','2025-01-10 03:54:35','pong','tipong@gmail.com','9876543210'),(70,16,3,'2024-12-22 00:00:00','Pending','2025-01-10 03:57:35','2025-01-10 03:57:35','pong','tipong@gmail.com','9876543210'),(71,16,3,'2024-12-22 00:00:00','Pending','2025-01-10 03:58:29','2025-01-10 03:58:29','pong','tipong@gmail.com','9876543210'),(72,16,3,'2024-12-22 00:00:00','Pending','2025-01-10 03:59:01','2025-01-10 03:59:01','pong','tipong@gmail.com','9876543210'),(73,16,1,'2024-12-22 00:00:00','Pending','2025-01-10 03:59:16','2025-01-10 03:59:16','pong','tipong@gmail.com','9876543210'),(74,16,1,'2024-12-22 00:00:00','Pending','2025-01-10 04:15:13','2025-01-10 04:15:13','pong','tipong@gmail.com','9876543210'),(75,16,37,'2025-01-31 00:00:00','Pending','2025-01-10 14:15:42','2025-01-10 14:15:42','mika pong','tityapongs@gmail.com','0233232332'),(76,16,2,'2025-02-08 00:00:00','Pending','2025-01-10 14:21:03','2025-01-10 14:21:03','mika pong','tityapongs@gmail.com','0233232332'),(77,16,37,'2025-01-31 00:00:00','Pending','2025-01-10 14:43:16','2025-01-10 14:43:16','mika pong','tityapongs@gmail.com','0233232332'),(78,16,25,'2025-01-30 00:00:00','Pending','2025-01-10 14:51:36','2025-01-10 14:51:36','mika pong','tityapongs@gmail.com','0233232332'),(79,16,25,'2025-01-30 00:00:00','Pending','2025-01-10 14:51:49','2025-01-10 14:51:49','mika pong','tityapongs@gmail.com','0233232332'),(80,16,25,'2025-01-30 00:00:00','Pending','2025-01-10 14:52:00','2025-01-10 14:52:00','mika pong','tityapongs@gmail.com','0233232332'),(81,16,37,'2025-01-30 00:00:00','Pending','2025-01-10 14:52:18','2025-01-10 14:52:18','mika pong','tityapongs@gmail.com','0233232332'),(82,16,37,'2025-01-30 00:00:00','Pending','2025-01-10 14:52:27','2025-01-10 14:52:27','mika pong','tityapongs@gmail.com','0233232332'),(83,16,37,'2025-01-30 00:00:00','Confirmed','2025-01-10 14:53:01','2025-01-12 05:50:57','mika pong','tityapongs@gmail.com','0233232332'),(84,16,25,'2025-01-23 00:00:00','Confirmed','2025-01-10 14:56:29','2025-01-11 15:30:08','mika pong','tityapongs@gmail.com','0233232332'),(85,16,25,'2025-02-06 00:00:00','Confirmed','2025-01-10 15:14:16','2025-01-14 13:38:48','mika pong','tityapongs@gmail.com','0233232332'),(86,16,30,'2025-02-08 00:00:00','Pending','2025-01-10 15:15:19','2025-01-10 15:15:19','mika pong','tityapongs@gmail.com','0233232332'),(87,16,22,'2025-02-19 00:00:00','Pending','2025-01-10 15:23:37','2025-01-10 15:23:37','pong','tityapongs@gmail.com','0233232332'),(88,16,24,'2025-01-30 00:00:00','Rejected','2025-01-10 15:28:21','2025-01-11 17:23:06','mika pong','tityapongs@gmail.com','0233232332'),(89,16,24,'2025-02-07 00:00:00','Pending','2025-01-10 15:30:54','2025-01-10 15:30:54','mika pong','tityapongs@gmail.com','0233232332'),(90,16,24,'2025-01-31 00:00:00','Rejected','2025-01-10 15:33:24','2025-01-12 07:52:10','mika pong','tityapongs@gmail.com','0233232332'),(91,16,30,'2025-03-01 00:00:00','Pending','2025-01-12 06:06:16','2025-01-12 06:06:16','Sok tityapong','tityapongs@gmail.com','010200023'),(92,16,25,'2025-04-10 00:00:00','Confirmed','2025-01-12 08:09:24','2025-01-12 08:10:27','mika pong','s@gmail.com','0233232332'),(93,16,1,'2025-03-08 00:00:00','Pending','2025-01-14 03:38:01','2025-01-14 03:38:01','pong','tipong@gmail.com','9876543210'),(94,16,1,'2025-03-08 00:00:00','Pending','2025-01-14 03:52:44','2025-01-14 03:52:44','pong','tipong@gmail.com','9876543210'),(95,16,1,'2025-03-08 00:00:00','Pending','2025-01-14 04:03:48','2025-01-14 04:03:48','pong','tipong@gmail.com','9876543210'),(96,16,1,'2025-03-09 00:00:00','Pending','2025-01-14 04:05:42','2025-01-14 04:05:42','pong','tipong@gmail.com','9876543210'),(97,16,1,'2025-03-10 19:00:00','Pending','2025-01-14 04:21:12','2025-01-14 04:21:12','pong','tipong@gmail.com','9876543210'),(98,16,1,'2025-03-10 13:30:00','Pending','2025-01-14 04:27:46','2025-01-14 04:27:46','pong','tipong@gmail.com','9876543210'),(99,16,1,'2025-03-10 13:30:00','Pending','2025-01-14 04:28:40','2025-01-14 04:28:40','pong','tipong@gmail.com','9876543210'),(100,16,1,'2025-03-10 13:30:00','Pending','2025-01-14 04:31:11','2025-01-14 04:31:11','pong','tipong@gmail.com','9876543210'),(101,16,1,'2025-03-10 12:00:00','Pending','2025-01-14 04:35:16','2025-01-14 04:35:16','pong','tipong@gmail.com','9876543210'),(102,16,1,'2025-03-10 14:00:00','Pending','2025-01-14 04:36:29','2025-01-14 04:36:29','pong','tipong@gmail.com','9876543210'),(103,16,1,'2025-04-09 06:00:00','Pending','2025-01-14 04:57:04','2025-01-14 04:57:04','pong','tipong@gmail.com','9876543210'),(104,16,1,'2025-04-09 08:00:00','Pending','2025-01-14 05:34:14','2025-01-14 05:34:14','pong','tipong@gmail.com','9876543210'),(105,16,36,'2025-04-01 06:00:00','Confirmed','2025-01-14 06:02:38','2025-01-14 06:04:40','mika pong','tityapongs@gmail.com','0233232332'),(106,59,36,'2025-03-02 15:00:00','Confirmed','2025-01-14 13:13:51','2025-01-14 13:14:48','DR PONG','tityapongs@gmail.com','0233232332'),(107,59,30,'2025-05-01 03:00:00','Confirmed','2025-01-17 20:49:14','2025-01-17 20:50:27','sok tityapong','tityapongs@gmail.com','0233232332'),(108,69,48,'2025-04-20 04:30:00','Rejected','2025-01-18 01:30:30','2025-01-18 01:35:53','pong','tityapongs@gmail.com','0233232332'),(109,69,36,'2025-02-01 04:40:00','Confirmed','2025-01-18 01:31:56','2025-01-18 01:35:15','mika pong','tityapongs@gmail.com','0233232332'),(110,59,36,'2025-05-01 09:00:00','Confirmed','2025-01-21 04:37:00','2025-01-21 04:40:16','mika pong','tityapongs@gmail.com','0233232332'),(111,59,2,'2025-03-10 05:29:00','Pending','2025-01-21 14:29:19','2025-01-21 14:29:19','mika pong','tityapongs@gmail.com','0233232332');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (16,'jr. pong','tityapongs@gmail.com','ejkjrkjrtjkrjtkjrjtjrjtk','2025-01-17 13:55:29'),(17,'Leanghoa','leanghoatest@gmail.com','I\'m testing','2025-01-17 16:23:50'),(18,'Sopheak','sopheakseang395@gmail.com','fasdfalsdf asfsa','2025-01-18 14:51:19');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `booking_id` int DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `booking_id` (`booking_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,6,4,'Your booking has been accepted by the supplier.',0,'2024-12-15 17:11:15'),(2,6,4,'Your booking has been accepted by the supplier.',0,'2024-12-15 17:14:55'),(3,3,3,'Your booking has been accepted by the supplier.',0,'2024-12-15 17:23:53'),(4,3,1,'Your booking has been accepted by the supplier.',0,'2024-12-16 14:08:40'),(5,3,1,'Your booking has been accepted by the supplier.',0,'2024-12-17 02:19:52'),(6,6,8,'Your booking has been rejected by the supplier.',0,'2024-12-17 02:31:22'),(7,6,9,'Your booking has been rejected by the supplier.',0,'2024-12-17 05:25:22'),(8,6,11,'Your booking has been accepted by the supplier.',0,'2024-12-17 06:23:39'),(9,16,14,'Your booking has been accepted by the supplier.',0,'2024-12-17 13:31:06'),(10,16,15,'Your booking has been rejected by the supplier.',0,'2024-12-17 13:34:09'),(11,16,14,'Your booking has been accepted by the supplier.',0,'2024-12-21 05:32:02'),(12,16,18,'Your booking has been rejected by the supplier.',0,'2024-12-22 13:56:50'),(13,16,19,'Your booking has been accepted by the supplier.',0,'2024-12-22 14:45:18'),(14,28,22,'Your booking has been accepted by the supplier.',0,'2024-12-23 15:35:52'),(15,57,28,'Your booking has been accepted by the supplier.',0,'2025-01-04 13:33:03'),(16,16,29,'Your booking has been accepted by the supplier.',0,'2025-01-05 08:28:23'),(17,16,29,'Your booking has been accepted by the supplier.',0,'2025-01-05 08:28:32'),(18,16,38,'Your booking has been accepted by the supplier.',0,'2025-01-09 05:36:18'),(19,65,60,'Your booking has been accepted by the supplier.',0,'2025-01-09 05:38:27'),(20,3,2,'Your booking has been accepted by the supplier.',0,'2025-01-11 10:44:54'),(21,47,23,'Your booking has been rejected by the supplier.',0,'2025-01-11 15:10:31'),(22,16,25,'Your booking has been accepted by the supplier.',0,'2025-01-11 15:10:44'),(23,28,22,'Your booking has been accepted by the supplier.',0,'2025-01-11 15:18:24'),(24,16,25,'Your booking has been accepted by the supplier.',0,'2025-01-11 15:19:53'),(25,16,42,'Your booking has been accepted by the supplier.',0,'2025-01-11 15:20:38'),(26,16,29,'Your booking has been accepted by the supplier.',0,'2025-01-11 15:29:52'),(27,16,84,'Your booking has been accepted by the supplier.',0,'2025-01-11 15:30:08'),(28,16,65,'Your booking has been accepted by the supplier.',0,'2025-01-11 17:22:59'),(29,16,88,'Your booking has been rejected by the supplier.',0,'2025-01-11 17:23:06'),(30,16,30,'Your booking has been accepted by the supplier.',0,'2025-01-11 18:41:20'),(31,16,21,'Your booking has been rejected by the supplier.',0,'2025-01-11 18:52:42'),(32,16,36,'Your booking has been accepted by the supplier.',0,'2025-01-12 05:45:00'),(33,16,83,'Your booking has been accepted by the supplier.',0,'2025-01-12 05:50:57'),(34,16,25,'Your booking has been accepted by the supplier.',0,'2025-01-12 07:51:49'),(35,16,52,'Your booking has been accepted by the supplier.',0,'2025-01-12 07:51:57'),(36,16,90,'Your booking has been rejected by the supplier.',0,'2025-01-12 07:52:10'),(37,16,92,'Your booking has been accepted by the supplier.',0,'2025-01-12 08:10:27'),(38,16,105,'Your booking has been accepted by the supplier.',0,'2025-01-14 06:04:40'),(39,59,106,'Your booking has been accepted by the supplier.',0,'2025-01-14 13:14:48'),(40,16,65,'Your booking has been accepted by the supplier.',0,'2025-01-14 13:27:05'),(41,16,64,'Your booking has been rejected by the supplier.',0,'2025-01-14 13:27:14'),(42,28,22,'Your booking has been accepted by the supplier.',0,'2025-01-14 13:27:32'),(43,28,22,'Your booking has been accepted by the supplier.',0,'2025-01-14 13:31:32'),(44,16,85,'Your booking has been accepted by the supplier.',0,'2025-01-14 13:38:48'),(45,59,107,'Your booking has been accepted by the supplier.',0,'2025-01-17 20:50:27'),(46,69,109,'Your booking has been accepted by the supplier.',0,'2025-01-18 01:35:15'),(47,69,108,'Your booking has been rejected by the supplier.',0,'2025-01-18 01:35:53'),(48,59,110,'Your booking has been accepted by the supplier.',0,'2025-01-21 04:40:16');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_categories`
--

DROP TABLE IF EXISTS `service_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_categories`
--

LOCK TABLES `service_categories` WRITE;
/*!40000 ALTER TABLE `service_categories` DISABLE KEYS */;
INSERT INTO `service_categories` VALUES (1,'wedding','2024-12-15 06:52:25','2024-12-16 14:38:03'),(2,'birthday','2024-12-15 15:49:38','2024-12-27 14:26:19'),(3,'cake','2024-12-16 13:46:56','2024-12-16 14:38:03'),(4,'djs','2024-12-29 14:04:57','2024-12-29 14:04:57'),(5,'makeup','2024-12-29 14:05:08','2024-12-29 14:05:08'),(6,'photograph','2024-12-29 14:05:27','2024-12-29 14:05:27'),(30,'cake2','2025-01-21 04:42:04','2025-01-21 04:42:04');
/*!40000 ALTER TABLE `service_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_ratings`
--

DROP TABLE IF EXISTS `service_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `service_ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `service_ratings_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  CONSTRAINT `service_ratings_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_ratings`
--

LOCK TABLES `service_ratings` WRITE;
/*!40000 ALTER TABLE `service_ratings` DISABLE KEYS */;
INSERT INTO `service_ratings` VALUES (1,16,2,5,'','2024-12-30 04:15:14'),(2,6,2,4,'Great service, will use again!','2024-12-30 04:25:11'),(3,16,3,4,'','2024-12-30 16:05:11'),(4,16,19,3,'good','2024-12-30 16:17:08'),(5,16,24,4,'is good','2024-12-31 02:21:04'),(6,16,25,4,'','2024-12-31 03:18:59'),(7,16,30,2,'','2024-12-31 05:32:19'),(8,54,23,4,'the product is good','2025-01-01 08:38:06'),(9,6,1,5,'Great service, will use again!','2025-01-01 16:27:33'),(10,16,22,3,'','2025-01-03 14:08:05'),(11,16,36,3,'','2025-01-04 05:37:44'),(12,57,2,5,'','2025-01-04 13:20:14'),(13,57,19,5,'','2025-01-04 13:20:33'),(14,16,23,5,'','2025-01-07 04:46:49'),(15,16,1,5,'','2025-01-07 05:39:53'),(16,59,30,5,'','2025-01-14 13:16:40'),(17,59,22,5,'','2025-01-14 13:17:07'),(18,1,1,5,'The owner of this service is very nice, good price and organization as well. ','2025-01-17 16:27:19'),(19,59,36,3,'','2025-01-17 20:54:36'),(20,59,2,4,'','2025-01-21 14:28:54');
/*!40000 ALTER TABLE `service_ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int NOT NULL,
  `category_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `size` varchar(50) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `image` longtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `average_rating` decimal(3,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `supplier_id` (`supplier_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `services_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `service_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,2,1,'Dreamlife Wedding Photo & Video','Getting the cake of your dreams is easy...cutting is the hard part! We cater to any dietary requirements and a variety of allergies.',2200.00,'M','Phnom Penh','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1737470026/Booking/dvxlevxuuukfnrpnqqkr.jpg','2024-12-15 06:54:05','2025-01-21 14:33:47',5.00),(2,2,2,'The Sweet Peace Specialty Cakes','Getting the cake of your dreams is easy...cutting is the hard part! We cater to any dietary requirements and a variety of allergies.',2200.00,'M','Phnom Penh','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1737125363/Booking/snqpr5wreij6o3uvqqta.jpg,https://res.cloudinary.com/dqtqs1g7y/image/upload/v1737125363/Booking/lmrukuigf5rph7dllzit.jpg','2024-12-16 14:24:03','2025-01-21 14:28:54',4.50),(3,2,2,'Sugar Sweet Sunshine Bakery \n','Getting the cake of your dreams is easy...cutting is the hard part! We cater to any dietary requirements and a variety of allergies.',2200.00,'M','Phnom Penh','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1737125124/Booking/xdoki8x1uwoaplv0v3kc.jpg,https://res.cloudinary.com/dqtqs1g7y/image/upload/v1737125124/Booking/kiiwshvq3s41fbxfueqv.jpg','2024-12-16 14:43:52','2025-01-17 14:45:24',4.00),(19,2,2,'The Sweet Peace Specialty Cakes\n\n','Getting the cake of your dreams is easy...cutting is the hard part! We cater to any dietary requirements and a variety of allergies.',800.00,'M','Phnom Penh','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1734964242/services/pcmwbdrodo192fxzgitq.jpg,https://res.cloudinary.com/dqtqs1g7y/image/upload/v1734964242/services/fnanbvjikug8l2vbwlmf.jpg,https://res.cloudinary.com/dqtqs1g7y/image/upload/v1734964242/services/gkek1a25dfgmuznp3hop.jpg','2024-12-19 15:43:11','2025-01-04 13:20:33',4.00),(22,2,1,'The Sweet Peace Specialty Cakes','Getting the cake of your dreams is easy...cutting is the hard part! We cater to any dietary requirements and a variety of allergies.',525.00,'M','Phnom Penh','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1737434345/Booking/rv2bhdhpiiaypqt7alch.jpg','2024-12-19 16:44:52','2025-01-21 04:39:06',4.00),(23,2,2,'The Sweet Peace Specialty weeding\n\n','Getting the cake of your dreams is easy...cutting is the hard part! We cater to any dietary requirements and a variety of allergies.',2200.00,'M','Phnom Penh','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1736743062/Booking/c3xepshfro4ytthynuqx.jpg,https://res.cloudinary.com/dqtqs1g7y/image/upload/v1736743062/Booking/nuumgrb21tquupuayz2j.jpg','2024-12-19 17:11:44','2025-01-13 04:37:43',4.50),(24,2,2,'The Sweet Peace Specialty Cakes\n\n','Getting the cake of your dreams is easy...cutting is the hard part! We cater to any dietary requirements and a variety of allergies.',1200.00,'M','Phnom Penh','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1734964622/services/tib9cfbjnarrrvmmgju2.jpg,https://res.cloudinary.com/dqtqs1g7y/image/upload/v1734964622/services/dn1y1x0dhuuwzr2za9ky.jpg,https://res.cloudinary.com/dqtqs1g7y/image/upload/v1734964622/services/dk9zuxrdhcxbrdic0zmv.jpg','2024-12-19 17:22:59','2024-12-31 02:21:04',4.00),(25,2,3,'The Sweet Peace Specialty Cakes','Getting the cake of your dreams is easy...cutting is the hard part! We cater to any dietary requirements and a variety of allergies.',1900.00,'M','Phnom Penh','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1737132496/Booking/ltxcmy8brmd8r0dcjtpz.jpg','2024-12-20 00:38:29','2025-01-17 16:48:16',4.00),(30,2,1,'Purple Cow Cakery','Welcome to Purple Cow Cakery, a wedding cake bakery based in Metuchen, NJ. There’s always a special look on my couple\'s faces when they see their wedding cake for the first time.',800.00,'M','Koh kong','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1736615453/Booking/wf8fijute9t6crg08ufu.jpg','2024-12-20 08:23:04','2025-01-14 13:16:40',3.50),(36,2,1,'weeding good heart','Pop the Champagne, she/he/they changed her/his/their name! \'Til death do us party. This is what love looks like. So happy to celebrate this day with you both! Couple goals, right here.',344.00,'M','phnom penh','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1735756076/Booking/tx8vexwrnkc2mdhzzzwt.jpg,https://res.cloudinary.com/dqtqs1g7y/image/upload/v1735756076/Booking/wl8bmtcyqpo5aeveit9m.jpg,https://res.cloudinary.com/dqtqs1g7y/image/upload/v1735756076/Booking/nqcpnnh8bdo6tuplhze3.jpg','2025-01-01 18:27:56','2025-01-17 20:55:18',3.00),(37,2,3,'weeding good heart','Pop the Champagne, she/he/they changed her/his/their name! \'Til death do us party. This is what love looks like. So happy to celebrate this day with you both! Couple goals, right here.',344.00,'M','phnom penh','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1735966461/Booking/uzpqwrf4xshvuqxykt8m.jpg,https://res.cloudinary.com/dqtqs1g7y/image/upload/v1735966461/Booking/osxmdh2ry2bup5xaubt6.jpg,https://res.cloudinary.com/dqtqs1g7y/image/upload/v1735966461/Booking/jsx0tvqgfc9gftlo8ffp.jpg','2025-01-04 04:54:22','2025-01-04 04:54:22',NULL),(38,2,2,'Purple Cow Cakery\n\n','Welcome to Purple Cow Cakery, a wedding cake bakery based in Metuchen, NJ. There’s always a special look on my couple\'s faces when they see their wedding cake for the first time.',800.00,'M','Koh kong','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1736577234/Booking/mejtwfx5hu35imdx1i6f.jpg,https://res.cloudinary.com/dqtqs1g7y/image/upload/v1736577234/Booking/u9wrhxybbpztukijh2z9.jpg','2025-01-09 05:29:11','2025-01-11 06:33:54',NULL),(46,2,2,'Purple Cow Cakery','dsjdjdfjdjkfkjdfkj',1800.00,'M','phnom penh','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1737041393/Booking/xdjowbabat1slaghtmys.jpg','2025-01-16 15:09:07','2025-01-16 15:29:53',NULL),(48,2,3,'Strawberry Cake  ','This cake is special design for Birthday. If you\'re interesting with this cake you can contact me directly or booking throw this website',800.00,'L','Phnom Penh','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1737132855/Booking/vy9dvu87atgzkbheugut.jpg,https://res.cloudinary.com/dqtqs1g7y/image/upload/v1737132855/Booking/gabqtkk3b24mu8g5uugi.jpg','2025-01-17 16:54:15','2025-01-17 16:54:15',NULL),(52,2,2,'Purple Cow Cakery','djfjdfjdf cjcjkvkjfjkffjkgkffgfg',200.00,'M','Phnom penh','https://res.cloudinary.com/dqtqs1g7y/image/upload/v1737470066/Booking/mbuwrcoymtpynjz2dmlk.jpg','2025-01-21 14:34:26','2025-01-21 14:34:26',NULL);
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-11 16:25:54
