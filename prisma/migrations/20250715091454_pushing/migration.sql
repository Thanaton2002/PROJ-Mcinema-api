-- AddForeignKey
ALTER TABLE `showtime` ADD CONSTRAINT `showtime_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `showtime` ADD CONSTRAINT `showtime_theater_id_fkey` FOREIGN KEY (`theater_id`) REFERENCES `theater`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
