-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 08, 2015 at 11:38 PM
-- Server version: 5.5.44-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `allied_school`
--

-- --------------------------------------------------------

--
-- Table structure for table `ASSESSMENT`
--

CREATE TABLE IF NOT EXISTS `ASSESSMENT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TYPE` varchar(30) NOT NULL,
  `SESSON` int(11) NOT NULL,
  `A_DATE` date NOT NULL,
  `SUB_ID` int(11) NOT NULL,
  `TOTAL_MARKS` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `ASSESSMENT`
--

INSERT INTO `ASSESSMENT` (`ID`, `TYPE`, `SESSON`, `A_DATE`, `SUB_ID`, `TOTAL_MARKS`) VALUES
(1, 'OHT-1', 2015, '2015-09-01', 1, 30),
(2, 'OHT-2', 2015, '2015-09-02', 2, 50),
(3, 'OHT-2', 2015, '2015-09-02', 1, 40),
(4, 'OHT-1', 2015, '2015-09-01', 2, 25),
(7, 'OHT-1', 2014, '2015-09-07', 4, 24),
(8, 'SELF', 2015, '2015-09-15', 5, 15);

-- --------------------------------------------------------

--
-- Table structure for table `CHALLAN`
--

CREATE TABLE IF NOT EXISTS `CHALLAN` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `STD_ID` int(11) NOT NULL,
  `ST_MON` date NOT NULL,
  `END_MON` date NOT NULL,
  `ADMISSION_FEE` int(11) DEFAULT NULL,
  `TUTION_FEE` int(11) DEFAULT NULL,
  `SECURITY` int(11) DEFAULT NULL,
  `ANNUAL_FEE` int(11) DEFAULT NULL,
  `PROCESS_FEE` int(11) DEFAULT NULL,
  `FINE` int(11) DEFAULT NULL,
  `TRANSPORT` int(11) DEFAULT NULL,
  `ISSUE_DATE` date NOT NULL,
  `DUE_DATE` date NOT NULL,
  `PAY_DATE` date DEFAULT NULL,
  `AMOUNT_PAID` int(11) DEFAULT NULL,
  `STATUS` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `CHALLAN`
--

INSERT INTO `CHALLAN` (`ID`, `STD_ID`, `ST_MON`, `END_MON`, `ADMISSION_FEE`, `TUTION_FEE`, `SECURITY`, `ANNUAL_FEE`, `PROCESS_FEE`, `FINE`, `TRANSPORT`, `ISSUE_DATE`, `DUE_DATE`, `PAY_DATE`, `AMOUNT_PAID`, `STATUS`) VALUES
(1, 4, '2015-09-01', '2015-09-30', 2500, 2420, 2500, 2000, 200, NULL, NULL, '2015-09-02', '2015-09-09', '2015-09-03', 9620, 2),
(2, 4, '2015-10-01', '2015-10-31', 0, 2420, NULL, NULL, NULL, NULL, 500, '2015-10-01', '2015-10-08', '0000-00-00', 0, 0),
(3, 4, '2015-09-01', '2015-09-30', 2500, 2420, 2000, 1000, 200, NULL, 500, '2015-09-05', '2015-09-10', NULL, NULL, 0),
(4, 4, '2015-11-01', '2015-11-30', NULL, 2400, NULL, 0, NULL, NULL, 550, '2015-09-06', '2015-11-10', NULL, NULL, 0),
(5, 5, '2015-11-01', '2015-11-30', NULL, NULL, NULL, 0, NULL, NULL, 550, '2015-09-06', '2015-11-10', NULL, NULL, 0),
(6, 6, '2015-11-01', '2015-11-30', NULL, NULL, NULL, 0, NULL, NULL, 550, '2015-09-06', '2015-11-10', NULL, NULL, 0),
(7, 7, '2015-11-01', '2015-11-30', NULL, 1900, NULL, 0, NULL, NULL, 550, '2015-09-06', '2015-11-10', NULL, NULL, 0),
(8, 8, '2015-11-01', '2015-11-30', NULL, 1815, NULL, 0, NULL, NULL, 550, '2015-09-06', '2015-11-10', NULL, NULL, 0),
(9, 9, '2015-11-01', '2015-11-30', NULL, 1815, NULL, 0, NULL, NULL, 550, '2015-09-06', '2015-11-10', NULL, NULL, 0),
(10, 4, '2015-09-01', '2015-09-30', NULL, 2400, NULL, 0, NULL, NULL, 550, '2015-09-06', '2015-09-10', NULL, NULL, 0),
(11, 5, '2015-09-01', '2015-09-30', NULL, NULL, NULL, 0, NULL, NULL, 550, '2015-09-06', '2015-09-10', NULL, NULL, 0),
(12, 6, '2015-09-01', '2015-09-30', NULL, NULL, NULL, 0, NULL, NULL, 550, '2015-09-06', '2015-09-10', NULL, NULL, 0),
(13, 7, '2015-09-01', '2015-09-30', NULL, 1900, NULL, 0, NULL, NULL, 550, '2015-09-06', '2015-09-10', NULL, NULL, 0),
(14, 8, '2015-09-01', '2015-09-30', NULL, 1815, NULL, 0, NULL, NULL, 550, '2015-09-06', '2015-09-10', NULL, NULL, 0),
(15, 9, '2015-09-01', '2015-09-30', NULL, 1815, NULL, 0, NULL, NULL, 550, '2015-09-06', '2015-09-10', NULL, NULL, 0),
(16, 9, '2015-12-01', '2016-02-29', NULL, 5445, NULL, 0, NULL, NULL, 499, '2015-09-06', '2016-01-01', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `MARKS`
--

CREATE TABLE IF NOT EXISTS `MARKS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `STD_ID` int(11) NOT NULL,
  `ASS_ID` int(11) NOT NULL,
  `OBTAINED` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `MARKS`
--

INSERT INTO `MARKS` (`ID`, `STD_ID`, `ASS_ID`, `OBTAINED`) VALUES
(1, 4, 1, 20),
(2, 4, 2, 40),
(3, 4, 3, 33),
(4, 4, 4, 19),
(5, 5, 1, 20),
(6, 5, 2, 40),
(7, 5, 3, 33),
(8, 5, 4, 18),
(9, 4, 7, 20),
(10, 5, 7, 15),
(11, 8, 8, 15);

-- --------------------------------------------------------

--
-- Table structure for table `PARENT`
--

CREATE TABLE IF NOT EXISTS `PARENT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(30) NOT NULL,
  `CNIC` varchar(16) NOT NULL,
  `ADDRESS` text NOT NULL,
  `PHONE` varchar(16) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `PARENT`
--

INSERT INTO `PARENT` (`ID`, `NAME`, `CNIC`, `ADDRESS`, `PHONE`) VALUES
(6, 'Muzammil Ghauri', '36302-1828681-3', 'NUST H-12, Islamabad', '03324554565'),
(7, 'Test Parent', '36302-1828681-4', 'Test Address 2', '0333-1234567'),
(8, 'Test Guardian', '36302-1828681-9', 'Test Address 3', '03001234567'),
(9, 'Tuition Parent', '36379-4842579-1', 'Tuition address', '0345-1231234'),
(10, 'Father of Computer', '45762-2785790-9', 'NICE, H-12', '0312-8105123');

-- --------------------------------------------------------

--
-- Table structure for table `STUDENT`
--

CREATE TABLE IF NOT EXISTS `STUDENT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `REG_NO` varchar(30) DEFAULT NULL,
  `SESSON` int(11) NOT NULL,
  `NAME` varchar(30) NOT NULL,
  `DOB` date NOT NULL,
  `P_ID` int(11) NOT NULL,
  `CLASS` varchar(20) NOT NULL,
  `SECTION` varchar(20) DEFAULT NULL,
  `TUITION` int(11) DEFAULT NULL,
  `TRANSPORT` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `STUDENT`
--

INSERT INTO `STUDENT` (`ID`, `REG_NO`, `SESSON`, `NAME`, `DOB`, `P_ID`, `CLASS`, `SECTION`, `TUITION`, `TRANSPORT`) VALUES
(4, '222', 2012, 'Uzair Ghauri', '1994-01-21', 6, 'SE-3', 'A', 2400, 550),
(5, '223', 2013, 'Test User', '0000-00-00', 6, 'SE-3', 'A', 2420, NULL),
(6, '230', 2014, 'Test User 2', '1999-10-10', 7, 'EE-4', 'B', NULL, NULL),
(7, '240', 2015, 'Test User 3', '2002-02-05', 8, 'CS-2', 'C', 1900, 0),
(8, '774', 2013, 'Tuition User', '2008-05-13', 9, 'ME-7', 'B', 1815, 490),
(9, '43556', 2012, 'Hello World', '2005-07-11', 10, 'CE-10', 'C', 1815, 499);

-- --------------------------------------------------------

--
-- Table structure for table `SUBJECT`
--

CREATE TABLE IF NOT EXISTS `SUBJECT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `SUBJECT`
--

INSERT INTO `SUBJECT` (`ID`, `NAME`) VALUES
(1, 'PHYSICS'),
(2, 'CHEMISTRY'),
(3, 'COMPUTER'),
(4, 'MATHS'),
(5, 'ENGLISH');

-- --------------------------------------------------------

--
-- Table structure for table `USER`
--

CREATE TABLE IF NOT EXISTS `USER` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FIRST_NAME` varchar(16) NOT NULL,
  `LAST_NAME` varchar(16) NOT NULL,
  `USER_NAME` varchar(20) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `USER`
--

INSERT INTO `USER` (`ID`, `FIRST_NAME`, `LAST_NAME`, `USER_NAME`, `PASSWORD`) VALUES
(1, 'Uzair', 'Ghauri', '12beseughauri', 'lionking');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
