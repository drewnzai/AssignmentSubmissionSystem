-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: assignsub
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assignments`
--

DROP TABLE IF EXISTS `assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignments` (
  `assignment_id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `due` date DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `lecturer_id` bigint DEFAULT NULL,
  `unit_id` bigint DEFAULT NULL,
  PRIMARY KEY (`assignment_id`),
  KEY `FK6iagaf1ho824fm90gnstc78wl` (`lecturer_id`),
  KEY `FKm4guleh1k7eycuyflalccb9ye` (`unit_id`),
  CONSTRAINT `FK6iagaf1ho824fm90gnstc78wl` FOREIGN KEY (`lecturer_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKm4guleh1k7eycuyflalccb9ye` FOREIGN KEY (`unit_id`) REFERENCES `units` (`unit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignments`
--

LOCK TABLES `assignments` WRITE;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` VALUES (1,'Write a one page essay describing the history of Linux to its current form.','2024-05-04','Linux History',31,18);
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Bsc. Computer Science'),(2,'Bsc. Electrical Engineering'),(3,'Bsc. Business Administration'),(4,'Bsc. Acturial Science'),(5,'Bsc. Civil Engineering'),(6,'Bsc. Psychology'),(7,'BA. General Arts'),(8,'Bsc. Biomedicine'),(9,'BA. History'),(10,'BA. Fine Arts'),(11,'BA. Sociology'),(12,'BEd. Elementary Education'),(13,'BEd. Secondary Education'),(14,'BEd. Special Education'),(15,'BA. English Literature');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offerings`
--

DROP TABLE IF EXISTS `offerings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offerings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `course_id` bigint DEFAULT NULL,
  `unit_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9a5vdg8tisn9w8y99l3siari` (`course_id`),
  KEY `FKapkudu9pp1cteidiruwy395a3` (`unit_id`),
  CONSTRAINT `FK9a5vdg8tisn9w8y99l3siari` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  CONSTRAINT `FKapkudu9pp1cteidiruwy395a3` FOREIGN KEY (`unit_id`) REFERENCES `units` (`unit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offerings`
--

LOCK TABLES `offerings` WRITE;
/*!40000 ALTER TABLE `offerings` DISABLE KEYS */;
INSERT INTO `offerings` VALUES (2,1,14),(3,1,15),(4,4,15),(5,1,16),(6,1,17),(7,1,18),(8,1,19),(9,1,20),(10,1,21);
/*!40000 ALTER TABLE `offerings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pending`
--

DROP TABLE IF EXISTS `pending`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pending` (
  `pending_id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `due` date DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `student_id` bigint DEFAULT NULL,
  `unit_id` bigint DEFAULT NULL,
  PRIMARY KEY (`pending_id`),
  KEY `FKiw8hgoqhq7tcydsyi2vrrskpa` (`student_id`),
  KEY `FK30s50spj8396hp5snpkprscoj` (`unit_id`),
  CONSTRAINT `FK30s50spj8396hp5snpkprscoj` FOREIGN KEY (`unit_id`) REFERENCES `units` (`unit_id`),
  CONSTRAINT `FKiw8hgoqhq7tcydsyi2vrrskpa` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pending`
--

LOCK TABLES `pending` WRITE;
/*!40000 ALTER TABLE `pending` DISABLE KEYS */;
/*!40000 ALTER TABLE `pending` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES (27,'2024-04-10 08:20:29.723596','0cc97492-1921-4dbe-9b2a-9016cf56f876'),(28,'2024-04-10 08:20:29.724250','581a6232-2148-4e2d-aaa6-b9536d4094fc'),(29,'2024-04-14 13:37:29.805448','04e4df84-eb68-4236-bce1-a2aaccba79ed'),(30,'2024-04-14 13:37:29.805201','f40dd32d-5ff2-4830-ad19-e16cb1060e89'),(31,'2024-04-14 13:37:29.805220','0450821a-4509-4c64-bc09-02124a2490b1'),(32,'2024-04-14 13:37:29.805560','7fdec7db-0887-4e2c-8e20-2c9c92f5e6fc'),(33,'2024-04-14 13:54:19.888087','37a8bbc2-c91e-4e13-9616-fe5a6498728c'),(34,'2024-04-14 14:56:30.683814','175374cc-e430-492f-b004-e69fa4254f25'),(35,'2024-04-14 14:59:49.702330','2a86741a-bc85-476f-879d-d815566c2dae'),(36,'2024-04-14 15:15:28.878747','2728b2e4-29e4-4635-aedc-87c5d5006df1'),(37,'2024-04-14 15:33:23.786708','0efb9a8e-9c64-4749-ba3e-a6f6a7cdeb1c'),(38,'2024-04-14 15:33:42.547582','ec8ef9aa-9eee-48f5-af5c-d2b7a7fc74e5'),(39,'2024-04-14 17:20:12.185451','6b433b97-450d-427d-b44e-fad7ae9467e6'),(40,'2024-04-14 15:19:28.620137','11aa4419-aef6-4345-8fce-0d262e6d231d'),(41,'2024-04-14 15:21:47.348424','5c136c2e-0ef8-4c30-8b3a-252b99c010fc'),(42,'2024-04-14 15:22:09.578200','550dee94-394d-448f-aef4-0ce3e6a044e1'),(43,'2024-04-21 15:56:47.890834','1186cb46-f1e7-41a7-99eb-2ef71f7bcc0a'),(44,'2024-04-23 18:18:17.214001','f7ce4652-cd3b-48cb-b132-1737126eb01f'),(45,'2024-04-23 18:29:13.855255','14ca6bfc-3fae-45a8-b4bf-081a0cfe8c31'),(46,'2024-04-23 18:33:10.722793','17932947-df71-4723-befb-35a35b94b298'),(47,'2024-04-23 21:15:58.481506','cfd5d55d-f5dd-4307-9341-1767f39e62bf'),(48,'2024-04-24 09:13:50.888060','20c360ba-b591-4d77-9b90-346d727887be'),(49,'2024-04-24 09:13:50.888255','362d269e-437b-4a4b-8412-a94ee6d5f209'),(50,'2024-04-24 09:26:01.111945','760f2f14-1670-47e6-b7dd-1f056314c157'),(51,'2024-04-24 09:31:57.739236','3034eb07-6452-4975-8c26-e2508a3c813d'),(52,'2024-04-24 09:38:12.684667','7f762357-86ff-4147-a019-f0f68b1dd382'),(53,'2024-04-24 09:41:10.462981','98744985-c8b5-41a0-90da-01149d8fff02'),(54,'2024-04-24 10:26:17.268865','7622d38f-1f3c-47e0-a92d-8131bada1a05'),(55,'2024-04-24 10:31:34.847783','081ca717-ea53-4d92-abd3-e969ff059a0a'),(56,'2024-04-24 11:36:53.822264','011536b8-c657-4eda-8685-6d2d3becc4a7'),(57,'2024-04-30 13:58:43.397810','36c9a4dc-da67-40a5-b994-aac84deaf71c'),(58,'2024-04-30 14:16:01.635295','e014031b-d468-4d65-8215-103b737ad478'),(59,'2024-04-30 18:11:25.772518','5edfd832-8b71-4db8-965c-a0393342b646'),(60,'2024-04-30 18:13:31.021024','0071b2d4-e591-40f2-a224-c248bd670441');
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_LECTURER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `semesters`
--

DROP TABLE IF EXISTS `semesters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `semesters` (
  `semester_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`semester_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `semesters`
--

LOCK TABLES `semesters` WRITE;
/*!40000 ALTER TABLE `semesters` DISABLE KEYS */;
INSERT INTO `semesters` VALUES (1,'Y1S1-2024'),(2,'Y1S2-2024'),(3,'Y2S1-2024'),(4,'Y2S2-2024'),(5,'Y3S1-2024'),(6,'Y3S2-2024'),(7,'Y4S1-2024'),(8,'Y4S2-2024');
/*!40000 ALTER TABLE `semesters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `student_id` bigint NOT NULL AUTO_INCREMENT,
  `created` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `registration` varchar(255) DEFAULT NULL,
  `course_id` bigint DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `FK6jiqckumc6tm0h9otqbtqhgnr` (`course_id`),
  CONSTRAINT `FK6jiqckumc6tm0h9otqbtqhgnr` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (31,'2024-03-27 21:05:52.018680','amani.mwangi@egerton.ac.ke',_binary '','Amani','Mwangi','$2a$10$yrTCQEXagrk3BNCIxKapquWIl96CTbZnFc1YHUc6H3N2oyqhzEIaC','S13/03137/18',1);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submissions`
--

DROP TABLE IF EXISTS `submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `accepted` bit(1) NOT NULL,
  `feedback` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `score` int NOT NULL,
  `submission_date` date DEFAULT NULL,
  `assignment_id` bigint DEFAULT NULL,
  `student_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrirbb44savy2g7nws0hoxs949` (`assignment_id`),
  KEY `FKhwebuw14r6lb2ja85w9mwa8vf` (`student_id`),
  CONSTRAINT `FKhwebuw14r6lb2ja85w9mwa8vf` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`),
  CONSTRAINT `FKrirbb44savy2g7nws0hoxs949` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submissions`
--

LOCK TABLES `submissions` WRITE;
/*!40000 ALTER TABLE `submissions` DISABLE KEYS */;
INSERT INTO `submissions` VALUES (1,_binary '','Good work','2024/CS501/Linux History/Amani Mwangi/',35,'2024-04-30',1,31);
/*!40000 ALTER TABLE `submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `units`
--

DROP TABLE IF EXISTS `units`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `units` (
  `unit_id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `credits` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `semester_id` bigint DEFAULT NULL,
  `lecturer_id` bigint DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`unit_id`),
  KEY `FKo2qnx2gc25t91il7k1fyyreya` (`semester_id`),
  KEY `FK80yh4n6v7y1b9mnee4rjuakb3` (`lecturer_id`),
  CONSTRAINT `FK80yh4n6v7y1b9mnee4rjuakb3` FOREIGN KEY (`lecturer_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKo2qnx2gc25t91il7k1fyyreya` FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`semester_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `units`
--

LOCK TABLES `units` WRITE;
/*!40000 ALTER TABLE `units` DISABLE KEYS */;
INSERT INTO `units` VALUES (14,'CS101',4,'Introduction to Computer Science',8,31,'An introductory course covering fundamental concepts of computer science.'),(15,'CS201',3,'Data Structures and Algorithms',8,31,'A course covering data structures and algorithms commonly used in computer science applications.'),(16,'CS301',3,'Database Management Systems',8,31,'A course focusing on the principles and implementation of database management systems.'),(17,'CS401',3,'Software Engineering',8,31,'An overview of the software development lifecycle and engineering principles.'),(18,'CS501',4,'Operating Systems',8,31,'A course covering the principles and components of operating systems.'),(19,'CS601',3,'Computer Networks',8,31,'An introduction to computer networking concepts and protocols.'),(20,'CS701',4,'Artificial Intelligence',8,31,'An exploration of artificial intelligence techniques and applications.'),(21,'CS801',3,'Web Development',8,31,'A course focusing on developing web applications using modern technologies.');
/*!40000 ALTER TABLE `units` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `created` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`),
  CONSTRAINT `FKp56c1712k691lhsyewcssf40f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (31,'2024-04-21 15:49:34.209653','andrew.nzai@egerton.ac.ke',_binary '','Andrew','Nzai','$2a$10$Mq4ZqyP0t7/RZ3FpzcJ9Vejbpbr6SFYZHVL/yGszla4h4yKqpoQcq',2),(32,'2024-04-30 13:54:27.581714','admin.admin@egerton.ac.ke',_binary '','admin','admin','$2a$10$jyfmwdSbHwhULaysbAhuMeC6CzMRBk0ixD.nBZcME5hlm1FIfsZaO',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-01 16:50:15
