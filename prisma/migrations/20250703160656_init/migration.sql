-- CreateTable
CREATE TABLE `Member` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `birth_date` DATETIME(3) NULL,
    `phone_number` VARCHAR(191) NULL,
    `createDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('Admin', 'User') NOT NULL DEFAULT 'User',
    `status` ENUM('Available', 'NotAvailable', 'Pending', 'Completed') NOT NULL DEFAULT 'Available',

    UNIQUE INDEX `Member_id_key`(`id`),
    UNIQUE INDEX `Member_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `status` ENUM('Available', 'NotAvailable', 'Pending', 'Completed') NOT NULL DEFAULT 'Available',
    `release_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Movie_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Theater` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `status` ENUM('Available', 'NotAvailable', 'Pending', 'Completed') NOT NULL DEFAULT 'Available',

    UNIQUE INDEX `Theater_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Seat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `theater_id` INTEGER NOT NULL,
    `row` VARCHAR(191) NOT NULL,
    `column` VARCHAR(191) NOT NULL,
    `status` ENUM('Available', 'NotAvailable', 'Pending', 'Completed') NOT NULL DEFAULT 'Available',

    UNIQUE INDEX `Seat_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Showtime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `movie_id` INTEGER NOT NULL,
    `theater_id` INTEGER NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `status` ENUM('Available', 'NotAvailable', 'Pending', 'Completed') NOT NULL DEFAULT 'Available',

    UNIQUE INDEX `Showtime_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `member_id` INTEGER NOT NULL,
    `showtime_id` INTEGER NOT NULL,
    `booking_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `amount_seats` INTEGER NOT NULL,
    `status` ENUM('Available', 'NotAvailable', 'Pending', 'Completed') NOT NULL DEFAULT 'Pending',

    UNIQUE INDEX `Booking_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SeatBooking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_id` INTEGER NOT NULL,
    `seat_id` INTEGER NOT NULL,
    `status` ENUM('Available', 'NotAvailable', 'Pending', 'Completed') NOT NULL DEFAULT 'Available',

    UNIQUE INDEX `SeatBooking_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_id` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `payment_date` DATETIME(3) NULL,
    `payment_method` ENUM('CreditCard', 'DebitCard', 'BankTransfer') NULL,
    `status` ENUM('Available', 'NotAvailable', 'Pending', 'Completed') NOT NULL DEFAULT 'Pending',

    UNIQUE INDEX `Payment_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_theater_id_fkey` FOREIGN KEY (`theater_id`) REFERENCES `Theater`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Showtime` ADD CONSTRAINT `Showtime_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Showtime` ADD CONSTRAINT `Showtime_theater_id_fkey` FOREIGN KEY (`theater_id`) REFERENCES `Theater`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_showtime_id_fkey` FOREIGN KEY (`showtime_id`) REFERENCES `Showtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeatBooking` ADD CONSTRAINT `SeatBooking_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SeatBooking` ADD CONSTRAINT `SeatBooking_seat_id_fkey` FOREIGN KEY (`seat_id`) REFERENCES `Seat`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
