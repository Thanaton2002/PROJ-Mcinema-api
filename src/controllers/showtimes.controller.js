import { number } from "yup";
import { getShowtimes, getShowtimeByIdService, createShowtimeService, updateShowtimeService, deleteShowtimeService } from "../services/showtimes.service.js";
import createError from "../utils/createError.util.js";

export async function getAllShowtimes(req, res, next) {
    try {
        const showtimes = await getShowtimes();
        res.status(200).json({
            message: "Get all showtimes success",
            showtimes,
        });
    } catch (error) {
        next(error);
    }
}

export async function getShowtimeById(req, res, next) {
    try {
        const { id } = req.params;
        const showtime = await getShowtimeByIdService(id);
        if (!showtime) {
            throw createError(404, "Showtime not found");
        }
        res.status(200).json({
            message: "Get showtime success",
            showtime,
        });
    } catch (error) {
        next(error);
    }
}

export async function createShowtime(req, res, next) {
    try {
        const { movieId, theaterId, startTime, endTime, audioType, subtitleType, status } = req.body;
        if (!movieId || !theaterId || !startTime || !endTime) {
            throw createError(400, "Missing required fields");
        }
        const showtime = await createShowtimeService({
            movieId: parseInt(movieId),
            theaterId: parseInt(theaterId),
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            audioType,
            subtitleType,
            status,
        });
        res.status(201).json({
            message: "Showtime created successfully",
            showtime,
        });
    } catch (error) {
        next(error);
    }
}

export async function updateShowtime(req, res, next) {
    try {
        const { id } = req.params;
        const { movieId, theaterId, startTime, endTime, audioType, subtitleType, status } = req.body;
        const showtime = await updateShowtimeService(id, {
            movieId,
            theaterId,
            startTime: startTime ? new Date(startTime) : undefined,
            endTime: endTime ? new Date(endTime) : undefined,
            audioType,
            subtitleType,
            status,
        });
        if (!showtime) {
            throw createError(404, "Showtime not found");
        }
        res.status(200).json({
            message: "Showtime updated successfully",
            showtime,
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteShowtime(req, res, next) {
    try {
        const { id } = req.params;
        const deleted = await deleteShowtimeService(id);
        if (!deleted) {
            throw createError(404, "Showtime not found");
        }
        res.status(200).json({
            message: "Showtime deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}