-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 05.12.2022 klo 18:02
-- Palvelimen versio: 8.0.31
-- PHP Version: 7.3.31-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bankdb`
--
CREATE DATABASE IF NOT EXISTS `bankdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `bankdb`;

-- --------------------------------------------------------

--
-- Rakenne taululle `account`
--

CREATE TABLE `account` (
  `idaccount` varchar(20) NOT NULL,
  `cardnum` varchar(20) NOT NULL,
  `balance` decimal(19,4) DEFAULT NULL,
  `credit` decimal(19,4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Vedos taulusta `account`
--

INSERT INTO `account` (`idaccount`, `cardnum`, `balance`, `credit`) VALUES
('10975', '18748397', '-850.0000', '-6000.0000'),
('18237', '18748397', '1272.0000', '0.0000'),
('28493', '85484187', '-313.0000', '-2000.0000'),
('40816', '62027799', '482.0000', '0.0000'),
('44685', '98600838', '1224.0000', '0.0000'),
('49922', '92455754', '1312.0000', '0.0000'),
('58870', '87666351', '0.0000', '0.0000'),
('61109', '56641758', '39.0000', '0.0000'),
('66600', '08939469', '1112.0000', '0.0000'),
('67066', '63667722', '136.0000', '0.0000'),
('69308', '62027799', '0.0000', '-3000.0000'),
('7007', '02727495', '0.0000', '-7000.0000'),
('80315', '85484187', '921.2500', '0.0000'),
('83610', '34940070', '1061.5000', '0.0000'),
('84968', '65941290', '1768.0000', '0.0000'),
('96205', '02727495', '288.0000', '0.0000'),
('97752', '87666351', '1480.0000', '0.0000'),
('98188', '77145500', '678.2500', '0.0000'),
('9943', '69333363', '-500.0000', '-6000.0000'),
('99966', '69333363', '65.7500', '0.0000');

--
-- Herättimet `account`
--
DELIMITER $$
CREATE TRIGGER `banklog` AFTER UPDATE ON `account` FOR EACH ROW BEGIN
IF (old.balance-new.balance = 0.75) THEN 
INSERT INTO log VALUES(NULL,NEW.idaccount,old.balance-new.balance,now(),'balance_CHECK');
ELSE IF (old.balance<new.balance  ) THEN
INSERT INTO log VALUES(NULL,NEW.idaccount,new.balance-old.balance,now(),'deposit_DBT');
ELSE IF (new.balance<0 AND old.balance>new.balance) THEN
INSERT INTO log VALUES(NULL,NEW.idaccount,old.balance-new.balance,now(),'withdrawal_CRD');
ELSE IF (old.balance>new.balance AND new.balance >= 0) THEN
INSERT INTO log VALUES(NULL,NEW.idaccount,old.balance-new.balance,now(),'withdrawal_DBT');
ELSE 
INSERT INTO log VALUES(NULL,NEW.idaccount,'0',now(),'dbError');
END IF;
END IF;
END IF;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Rakenne taululle `card`
--

CREATE TABLE `card` (
  `cardnum` varchar(20) NOT NULL,
  `cardpin` varchar(255) NOT NULL,
  `iduser` int NOT NULL,
  `iscredit` tinyint(1) NOT NULL,
  `pin_tries` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Vedos taulusta `card`
--

INSERT INTO `card` (`cardnum`, `cardpin`, `iduser`, `iscredit`, `pin_tries`) VALUES
('02727495', '$2a$10$yJ4uW0SN4vHLppQPezjSU.kN/g0AxMyYX4w8q4z697Qgz7cXGIvfW', 11, 1, 0),
('08939469', '$2a$10$6Eit9bl0.Z69ZaskGmzeueXCy16R69zGT9.uRJD57cOux9SWhkvWC', 9, 0, 0),
('18748397', '$2a$10$EcCAzoxuC4Ec0ptM//vdHOBPbcUiIVUiTu3gkXsXAmAVaHJeYap1a', 10, 1, 0),
('34940070', '$2a$10$q0AGWzwbaR6vZFhJB4LwE.ss5YiOpRB9eBpfXV3bpAuiRn0Alqs42', 2, 0, 0),
('56641758', '$2a$10$.D7e/BVn87zwbOJWcjR5Juni8LJ2TPT3aOGyrfyRh2LjYdj0F8g92', 5, 0, 0),
('62027799', '$2a$10$sqf7nUUDK/iqid6b323msedRkKBvrW//KyC83KCwodFjHZ.y0ZuCm', 6, 1, 0),
('63667722', '$2a$10$uC.vwoJPKxNK0k/N/Drs0eK.resngCdU9unRE5K8BbdsNZ3zZW3ue', 13, 0, 0),
('65941290', '$2a$10$zw8NSu9Yzt4ipvU1zG3BuO8NXehW6mOrGLxuSKuwVL7x8XuudjzQ.', 8, 0, 0),
('69333363', '$2a$10$563Y.ROLISMpqtHerTxA5eLoHLBsve7WdsT9ekYq8zbi3cEdd7J7W', 14, 1, 0),
('77145500', '$2a$10$9HJ.21wvHisFxGVdBIhBm.XlaDH4sWiV85pYqMS4DG9z2Hffvj/fa', 3, 0, 0),
('85484187', '$2a$10$F8Pv0lzBRiO.8aO.buKZXeM6D69IREErueyD/RX7SaDl4uWZ0EG.a', 1, 1, 0),
('87666351', '$2a$10$lmLhe3FrnoTAlv2FRorHLeefELfIoJXhMSQGXuzEJ9E.P8lcL9aHu', 4, 1, 0),
('92455754', '$2a$10$XFFC9.JGJUGiLFtt8kIONusDGENGpHCLDS.L9HcY7yJhenxT3DmsC', 12, 0, 0),
('98600838', '$2a$10$mct2zEzH3a/e1wYRJBM85O/KImbzMCGr3aOROZH.e1ZKiXC1DJ352', 7, 0, 0);

-- --------------------------------------------------------

--
-- Rakenne taululle `log`
--

CREATE TABLE `log` (
  `idlog` int NOT NULL,
  `idaccount` varchar(20) NOT NULL,
  `withdraw_amount` decimal(19,4) DEFAULT NULL,
  `transaction_time` datetime DEFAULT NULL,
  `transaction_type` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Vedos taulusta `log`
--

INSERT INTO `log` (`idlog`, `idaccount`, `withdraw_amount`, `transaction_time`, `transaction_type`) VALUES
(1, '48086', '20.0000', '2022-11-17 20:35:32', ''),
(2, '99966', '500.0000', '2022-11-24 13:27:46', ''),
(3, '99966', '300.0000', '2022-11-24 13:28:03', ''),
(4, '9943', '500.0000', '2022-11-24 13:34:07', ''),
(5, '99966', '5.0000', '2022-11-24 13:36:35', ''),
(6, '99966', '5.0000', '2022-11-24 13:36:45', ''),
(7, '99966', '5.0000', '2022-11-24 13:36:48', ''),
(8, '99966', '5.0000', '2022-11-24 13:38:50', ''),
(9, '99966', '3.0000', '2022-11-24 14:24:46', ''),
(10, '99966', '2.0000', '2022-11-24 14:35:38', ''),
(11, '99966', '5.0000', '2022-11-24 14:37:54', ''),
(12, '99966', '1.0000', '2022-11-24 17:14:06', ''),
(13, '99966', '1.0000', '2022-11-24 17:14:19', ''),
(15, '10975', '100.0000', '2022-11-24 17:35:31', ''),
(16, '10975', '-100.0000', '2022-11-24 17:37:10', ''),
(19, '99966', '1.0000', '2022-11-24 18:11:00', ''),
(20, '99966', '10.0000', '2022-11-24 19:06:46', 'withdrawal_DBT'),
(21, '10975', '500.0000', '2022-11-24 19:10:39', 'withdrawal_DBT'),
(22, '10975', '100.0000', '2022-11-24 19:12:00', 'withdrawal_DBT'),
(23, '10975', '100.0000', '2022-11-24 19:13:11', 'withdrawal_DBT'),
(24, '10975', '100.0000', '2022-11-24 19:14:02', 'withdrawal_CRD'),
(27, '99966', '0.7500', '2022-11-26 17:14:44', 'balance_CHECK'),
(30, '99966', '5.0000', '2022-11-26 17:23:27', 'withdrawal_DBT'),
(31, '10975', '50.0000', '2022-11-26 17:25:36', 'withdrawal_CRD'),
(32, '80315', '0.7500', '2022-12-03 07:44:59', 'balance_CHECK'),
(33, '80315', '0.7500', '2022-12-03 07:47:08', 'balance_CHECK'),
(34, '80315', '0.7500', '2022-12-03 07:47:21', 'balance_CHECK'),
(35, '80315', '0.7500', '2022-12-03 07:47:57', 'balance_CHECK'),
(36, '80315', '0.7500', '2022-12-03 07:48:52', 'balance_CHECK'),
(37, '80315', '0.7500', '2022-12-03 07:49:13', 'balance_CHECK'),
(38, '80315', '0.7500', '2022-12-03 07:50:58', 'balance_CHECK'),
(39, '80315', '0.7500', '2022-12-03 07:51:09', 'balance_CHECK'),
(40, '80315', '0.7500', '2022-12-03 07:51:22', 'balance_CHECK'),
(41, '80315', '0.7500', '2022-12-03 07:52:49', 'balance_CHECK'),
(42, '80315', '0.7500', '2022-12-03 07:53:19', 'balance_CHECK'),
(43, '80315', '0.7500', '2022-12-03 07:53:22', 'balance_CHECK'),
(44, '80315', '0.7500', '2022-12-03 07:54:45', 'balance_CHECK'),
(45, '80315', '0.7500', '2022-12-03 08:00:33', 'balance_CHECK'),
(46, '80315', '0.7500', '2022-12-03 08:22:37', 'balance_CHECK'),
(47, '80315', '0.7500', '2022-12-03 08:22:40', 'balance_CHECK'),
(48, '80315', '0.7500', '2022-12-03 08:22:43', 'balance_CHECK'),
(49, '80315', '0.7500', '2022-12-03 08:41:46', 'balance_CHECK'),
(50, '80315', '0.7500', '2022-12-03 08:42:12', 'balance_CHECK'),
(51, '80315', '0.7500', '2022-12-03 08:44:02', 'balance_CHECK'),
(52, '80315', '20.0000', '2022-12-03 09:04:29', 'withdrawal_DBT'),
(53, '80315', '20.0000', '2022-12-03 09:05:48', 'withdrawal_DBT'),
(54, '80315', '20.0000', '2022-12-03 09:05:54', 'withdrawal_DBT'),
(55, '80315', '20.0000', '2022-12-03 09:05:54', 'withdrawal_DBT'),
(56, '80315', '0.7500', '2022-12-03 09:06:01', 'balance_CHECK'),
(57, '80315', '20.0000', '2022-12-03 09:06:04', 'withdrawal_DBT'),
(58, '80315', '0.7500', '2022-12-03 09:06:05', 'balance_CHECK'),
(59, '28493', '50.0000', '2022-12-03 09:07:09', 'withdrawal_CRD'),
(60, '28493', '100.0000', '2022-12-03 09:07:10', 'withdrawal_CRD'),
(61, '28493', '40.0000', '2022-12-03 09:07:10', 'withdrawal_CRD'),
(62, '28493', '20.0000', '2022-12-03 09:07:10', 'withdrawal_CRD'),
(63, '28493', '20.0000', '2022-12-03 09:16:05', 'withdrawal_CRD'),
(64, '28493', '0.7500', '2022-12-03 19:01:37', 'balance_CHECK'),
(65, '28493', '40.0000', '2022-12-03 19:01:48', 'withdrawal_CRD'),
(66, '80315', '0.7500', '2022-12-03 21:42:58', 'balance_CHECK'),
(67, '80315', '0.7500', '2022-12-03 21:43:25', 'balance_CHECK'),
(68, '80315', '0.7500', '2022-12-03 21:43:51', 'balance_CHECK'),
(69, '80315', '0.7500', '2022-12-03 21:44:51', 'balance_CHECK'),
(70, '80315', '0.7500', '2022-12-03 21:46:35', 'balance_CHECK'),
(71, '80315', '0.7500', '2022-12-03 21:46:49', 'balance_CHECK'),
(72, '28493', '0.7500', '2022-12-03 21:47:31', 'balance_CHECK'),
(73, '28493', '0.7500', '2022-12-03 21:48:16', 'balance_CHECK'),
(74, '80315', '0.7500', '2022-12-03 21:48:48', 'balance_CHECK'),
(75, '80315', '0.7500', '2022-12-03 21:49:25', 'balance_CHECK'),
(76, '80315', '0.7500', '2022-12-03 21:49:51', 'balance_CHECK'),
(77, '80315', '0.7500', '2022-12-03 21:50:16', 'balance_CHECK'),
(78, '28493', '0.7500', '2022-12-03 21:50:50', 'balance_CHECK'),
(79, '80315', '0.7500', '2022-12-03 21:51:34', 'balance_CHECK'),
(80, '80315', '0.7500', '2022-12-03 21:52:12', 'balance_CHECK'),
(81, '80315', '0.7500', '2022-12-03 21:55:32', 'balance_CHECK'),
(82, '80315', '0.7500', '2022-12-03 22:00:43', 'balance_CHECK'),
(83, '80315', '0.7500', '2022-12-03 22:00:46', 'balance_CHECK'),
(84, '80315', '0.7500', '2022-12-03 22:01:13', 'balance_CHECK'),
(85, '80315', '0.7500', '2022-12-03 22:01:14', 'balance_CHECK'),
(86, '80315', '0.7500', '2022-12-03 22:01:40', 'balance_CHECK'),
(87, '80315', '0.7500', '2022-12-03 22:01:54', 'balance_CHECK'),
(88, '80315', '0.7500', '2022-12-03 22:02:29', 'balance_CHECK'),
(89, '80315', '0.7500', '2022-12-03 22:03:12', 'balance_CHECK'),
(90, '80315', '0.7500', '2022-12-03 22:03:39', 'balance_CHECK'),
(91, '80315', '0.7500', '2022-12-03 22:03:51', 'balance_CHECK'),
(92, '80315', '0.7500', '2022-12-03 22:04:28', 'balance_CHECK'),
(93, '80315', '0.7500', '2022-12-03 22:06:58', 'balance_CHECK'),
(94, '80315', '0.7500', '2022-12-03 22:11:10', 'balance_CHECK'),
(95, '80315', '0.7500', '2022-12-03 22:11:30', 'balance_CHECK'),
(96, '80315', '0.7500', '2022-12-03 22:12:21', 'balance_CHECK'),
(97, '80315', '0.7500', '2022-12-03 22:13:15', 'balance_CHECK'),
(98, '80315', '0.7500', '2022-12-03 22:14:01', 'balance_CHECK'),
(99, '80315', '0.7500', '2022-12-03 22:14:33', 'balance_CHECK'),
(100, '80315', '0.7500', '2022-12-03 22:14:36', 'balance_CHECK'),
(101, '80315', '0.7500', '2022-12-03 22:14:52', 'balance_CHECK'),
(102, '80315', '0.7500', '2022-12-03 22:15:27', 'balance_CHECK'),
(103, '80315', '0.7500', '2022-12-03 22:15:38', 'balance_CHECK'),
(104, '80315', '40.0000', '2022-12-03 22:37:26', 'withdrawal_DBT'),
(105, '28493', '20.0000', '2022-12-04 09:35:24', 'withdrawal_CRD'),
(106, '28493', '20.0000', '2022-12-04 10:05:18', 'withdrawal_CRD'),
(107, '83610', '0.7500', '2022-12-04 10:49:49', 'balance_CHECK'),
(108, '83610', '0.7500', '2022-12-04 10:50:40', 'balance_CHECK'),
(109, '83610', '0.7500', '2022-12-04 10:51:09', 'balance_CHECK'),
(110, '83610', '0.7500', '2022-12-04 10:51:21', 'balance_CHECK'),
(111, '83610', '0.7500', '2022-12-04 10:54:44', 'balance_CHECK'),
(112, '83610', '0.7500', '2022-12-04 10:54:46', 'balance_CHECK'),
(113, '83610', '0.7500', '2022-12-04 10:54:47', 'balance_CHECK'),
(114, '83610', '0.7500', '2022-12-04 10:54:48', 'balance_CHECK'),
(115, '83610', '0.7500', '2022-12-04 10:55:07', 'balance_CHECK'),
(116, '83610', '0.7500', '2022-12-04 10:58:25', 'balance_CHECK'),
(117, '83610', '0.7500', '2022-12-04 10:58:37', 'balance_CHECK'),
(118, '83610', '0.7500', '2022-12-04 10:58:48', 'balance_CHECK'),
(119, '83610', '0.7500', '2022-12-04 10:58:49', 'balance_CHECK'),
(120, '83610', '0.7500', '2022-12-04 10:58:50', 'balance_CHECK'),
(121, '98188', '0.7500', '2022-12-04 10:59:18', 'balance_CHECK'),
(122, '98188', '0.7500', '2022-12-04 10:59:34', 'balance_CHECK'),
(123, '98188', '0.7500', '2022-12-04 10:59:37', 'balance_CHECK'),
(124, '98188', '0.7500', '2022-12-04 11:01:05', 'balance_CHECK'),
(125, '98188', '0.7500', '2022-12-04 11:27:22', 'balance_CHECK'),
(126, '98188', '0.7500', '2022-12-04 11:31:27', 'balance_CHECK'),
(127, '98188', '0.7500', '2022-12-04 11:31:35', 'balance_CHECK'),
(128, '98188', '0.7500', '2022-12-04 11:33:27', 'balance_CHECK'),
(129, '98188', '0.7500', '2022-12-04 11:34:24', 'balance_CHECK'),
(130, '98188', '0.7500', '2022-12-04 11:34:27', 'balance_CHECK'),
(131, '98188', '0.7500', '2022-12-04 11:37:52', 'balance_CHECK'),
(132, '98188', '0.7500', '2022-12-04 11:39:01', 'balance_CHECK'),
(133, '98188', '0.7500', '2022-12-04 11:40:39', 'balance_CHECK'),
(134, '61109', '0.7500', '2022-12-04 11:52:50', 'balance_CHECK'),
(135, '61109', '0.7500', '2022-12-04 11:52:51', 'balance_CHECK'),
(136, '61109', '0.7500', '2022-12-04 11:52:54', 'balance_CHECK'),
(137, '61109', '0.7500', '2022-12-04 11:54:07', 'balance_CHECK'),
(138, '61109', '0.7500', '2022-12-04 11:54:19', 'balance_CHECK'),
(139, '61109', '0.7500', '2022-12-04 11:56:57', 'balance_CHECK'),
(140, '61109', '0.7500', '2022-12-04 11:58:10', 'balance_CHECK'),
(141, '61109', '0.7500', '2022-12-04 11:58:15', 'balance_CHECK'),
(142, '61109', '0.7500', '2022-12-04 11:58:44', 'balance_CHECK'),
(143, '61109', '0.7500', '2022-12-04 15:51:15', 'balance_CHECK'),
(144, '61109', '40.0000', '2022-12-04 15:55:03', 'withdrawal_DBT'),
(145, '61109', '0.7500', '2022-12-04 16:15:09', 'balance_CHECK'),
(146, '61109', '0.7500', '2022-12-04 16:15:18', 'balance_CHECK'),
(147, '40816', '0.7500', '2022-12-04 16:18:41', 'balance_CHECK'),
(148, '40816', '50.0000', '2022-12-04 16:20:01', 'withdrawal_DBT'),
(149, '40816', '0.7500', '2022-12-04 16:20:29', 'balance_CHECK'),
(150, '40816', '20.0000', '2022-12-04 16:21:58', 'withdrawal_DBT'),
(151, '40816', '20.0000', '2022-12-04 16:27:14', 'withdrawal_DBT'),
(152, '40816', '20.0000', '2022-12-04 16:27:52', 'withdrawal_DBT'),
(153, '40816', '20.0000', '2022-12-04 16:28:46', 'withdrawal_DBT'),
(154, '40816', '20.0000', '2022-12-04 16:32:08', 'withdrawal_DBT'),
(155, '40816', '20.0000', '2022-12-04 16:32:35', 'withdrawal_DBT'),
(156, '40816', '20.0000', '2022-12-04 16:33:36', 'withdrawal_DBT'),
(158, '40816', '32000.0000', '2022-12-04 16:38:06', 'withdraw_FAIL'),
(159, '40816', '1000.0000', '2022-12-04 16:45:07', 'withdraw_FAIL'),
(160, '40816', '0.7500', '2022-12-04 16:49:06', 'balance_CHECK'),
(161, '40816', '0.7500', '2022-12-04 16:50:07', 'balance_CHECK'),
(162, '40816', '0.7500', '2022-12-04 17:02:28', 'balance_CHECK'),
(163, '40816', '0.7500', '2022-12-04 17:08:28', 'balance_CHECK'),
(165, '40816', '20.0000', '2022-12-04 18:04:00', 'withdrawal_DBT'),
(166, '40816', '20.0000', '2022-12-04 18:07:18', 'withdrawal_DBT'),
(167, '40816', '20.0000', '2022-12-04 18:07:55', 'withdrawal_DBT'),
(168, '40816', '5.0000', '2022-12-04 18:08:01', 'withdrawal_DBT'),
(169, '40816', '5.0000', '2022-12-04 18:08:51', 'withdrawal_DBT'),
(170, '40816', '40.0000', '2022-12-04 18:11:45', 'withdrawal_DBT'),
(171, '40816', '0.7500', '2022-12-04 18:11:48', 'balance_CHECK'),
(172, '40816', '20.0000', '2022-12-04 18:53:04', 'withdrawal_DBT'),
(173, '40816', '950.0000', '2022-12-04 18:53:16', 'withdraw_FAIL'),
(174, '40816', '20.0000', '2022-12-04 18:55:04', 'withdrawal_DBT'),
(175, '40816', '20.0000', '2022-12-04 18:55:08', 'withdrawal_DBT'),
(176, '40816', '0.7500', '2022-12-04 19:31:16', 'balance_CHECK'),
(177, '99966', '0.7500', '2022-12-04 19:48:10', 'balance_CHECK'),
(178, '99966', '50.0000', '2022-12-04 19:48:15', 'withdrawal_DBT'),
(179, '99966', '100.0000', '2022-12-05 17:15:22', 'withdraw_FAIL'),
(180, '99966', '0.7500', '2022-12-05 17:15:24', 'balance_CHECK');

-- --------------------------------------------------------

--
-- Rakenne taululle `user`
--

CREATE TABLE `user` (
  `iduser` int NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Vedos taulusta `user`
--

INSERT INTO `user` (`iduser`, `fname`, `lname`) VALUES
(1, 'Matti', 'Näsä'),
(2, 'Juha', 'Koistinen'),
(3, 'Mauno', 'Ahonen'),
(4, 'Pertti', 'Keinonen'),
(5, 'Sakari', 'Östermalm'),
(6, 'Esko', 'Mörkö'),
(7, 'Gerhard', 'Rihmakallo'),
(8, 'Kalervo', 'Jankko'),
(9, 'Maxwell', 'Gothenburg'),
(10, 'Elmeri', 'Hautamäki'),
(11, 'Dean', 'Kagelberg'),
(12, 'James', 'Kagelberg'),
(13, 'Raili', 'Rasinkangas'),
(14, 'Eugen', 'von Lahtinen');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`idaccount`),
  ADD UNIQUE KEY `idaccount_UNIQUE` (`idaccount`),
  ADD KEY `card_idx` (`cardnum`);

--
-- Indexes for table `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`cardnum`),
  ADD UNIQUE KEY `cardnum_UNIQUE` (`cardnum`),
  ADD KEY `user_idx` (`iduser`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`idlog`),
  ADD KEY `idaccount_idx` (`idaccount`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`iduser`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `idlog` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `iduser` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Rajoitteet vedostauluille
--

--
-- Rajoitteet taululle `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `card` FOREIGN KEY (`cardnum`) REFERENCES `card` (`cardnum`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Rajoitteet taululle `card`
--
ALTER TABLE `card`
  ADD CONSTRAINT `user` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Rajoitteet taululle `log`
--
ALTER TABLE `log`
  ADD CONSTRAINT `log_ibfk_1` FOREIGN KEY (`idaccount`) REFERENCES `account` (`idaccount`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
