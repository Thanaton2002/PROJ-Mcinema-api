-- AlterTable
ALTER TABLE `movie` MODIFY `status` ENUM('Available', 'NotAvailable', 'Pending', 'Completed') NOT NULL DEFAULT 'NotAvailable';
