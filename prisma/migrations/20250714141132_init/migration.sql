-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `booking` DROP FOREIGN KEY `Booking_showtime_id_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_booking_id_fkey`;

-- DropForeignKey
ALTER TABLE `seat` DROP FOREIGN KEY `Seat_theater_id_fkey`;

-- DropForeignKey
ALTER TABLE `seatbooking` DROP FOREIGN KEY `SeatBooking_booking_id_fkey`;

-- DropForeignKey
ALTER TABLE `seatbooking` DROP FOREIGN KEY `SeatBooking_seat_id_fkey`;

-- DropForeignKey
ALTER TABLE `showtime` DROP FOREIGN KEY `Showtime_movie_id_fkey`;

-- DropForeignKey
ALTER TABLE `showtime` DROP FOREIGN KEY `Showtime_theater_id_fkey`;

-- AlterTable
ALTER TABLE `showtime` ADD COLUMN `audio_type` ENUM('Thai', 'Soundtrack', 'English') NULL,
    ADD COLUMN `subtitle_type` ENUM('Thai', 'English', 'None') NULL;
