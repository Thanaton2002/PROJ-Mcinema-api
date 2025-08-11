import { addSeats, addTheater, deleteSeatByTheaterId, deleteTheaterById, editSeatById, editTheater, findTheaterByName, getAllTheaters, getSeatsByTheaterId, getTheatersById } from "../services/theater.service.js";
import createError from "../utils/createError.util.js";

// ฟังก์ชันนี้มีเซอร์วิสสองตัวที่ใช้ในการจัดการโรงภาพยนตร์กับที่นั่ง
export async function createTheater(req, res, next) {
    try {
        const isAdmin = req.user?.role === "Admin";
        if (!isAdmin) {
            createError(403, "You are not allowed to do this");
        }

        const { name, type, capacity } = req.body;

        if (!name || !type || !capacity) {
            createError(400, "Detail is missing");
        }

        const existingTheater = await findTheaterByName(name);
        if (existingTheater) {
            createError(400, "Theater already exists");
        }

        const size = Math.sqrt(parseInt(capacity));
        if (!Number.isInteger(size)) {
            throw createError(400, "Capacity must be a perfect square");
        }

        const theaterData = {
            name,
            type,
            capacity: parseInt(capacity),
        }
        const theater = await addTheater(theaterData);

        const seats = [];
        for (let row = 1; row <= size; row++) {
            const rowChar = String.fromCharCode(64 + row); // 65 = 'A'
            for (let col = 1; col <= size; col++) {
                seats.push({
                    row: rowChar,
                    column: col.toString(),
                    theaterId: theater.id,
                });
            }
        }
        const seatsAdded = await addSeats(seats);

        res.status(201).json({
            message: "Theater created successfully",
        });

    } catch (error) {
        next(error);
    }
}

export async function getTheaters(req, res, next) {
    try {
        const theaters = await getAllTheaters();

        res.status(200).json({
            message: "Get Theaters successfully",
            theaters,
        });

    } catch (error) {
        next(error);
    }
}

export async function getSeats(req, res, next) {
    try {
        const { id } = req.params;

        const seats = await getSeatsByTheaterId(id);

        if (!seats || seats.length === 0) {
            createError(404, "No seats found for this theater");
        }

        res.status(200).json({
            message: "Get Seats successfully",
            seats,
        });

    } catch (error) {
        next(error);
    }
}

export async function getSelectedTheaters(req, res, next) {
    try {
        const { id } = req.params;

        const theater = await getTheatersById(id);

        if (!theater || theater.length === 0) {
            createError(404, "Theater not found");
        }

        res.status(200).json({
            message: "Get Theater successfully",
            theater,
        });

    } catch (error) {
        next(error);
    }
}

export async function updateTheater(req, res, next) {
    try {
        const isAdmin = req.user?.role === "Admin";
        if (!isAdmin) {
            createError(403, "You are not allowed to do this");
        }

        const { id } = req.params;
        const { name, type, capacity } = req.body;

        const existingTheater = await getTheatersById(name);
        if (existingTheater) {
            createError(400, "Theater already exists");
        }

        const updatedData = {};
        if (name) updatedData.name = name;
        if (type) updatedData.type = type;      
        if (capacity) {
            const size = Math.sqrt(parseInt(capacity));
            if (!Number.isInteger(size)) {
                throw createError(400, "Capacity must be a perfect square");
            }
            updatedData.capacity = parseInt(capacity);
        }

        const theaterEdited = await editTheater(id, updatedData);

        res.status(200).json({
            message: "Update Theater successfully",
            theaterEdited,
        });

    } catch (error) {
        next(error);
    }
}

export async function updateSeat(req, res, next) {
    try {
        const {id} = req.params;
        const {status} = req.body;

        if (!status) {
            createError(400, "Status is missing");
        };

        const seatEdited = await editSeatById(id, status);

        res.status(200).json({
            message: "Update Seat successfully",
            seatEdited,
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteTheater(req, res, next) {
    try {
        const isAdmin = req.user?.role === "Admin";
        if (!isAdmin) {
            createError(403, "You are not allowed to do this");
        }

        const { id } = req.params;

        const theater = await getTheatersById(id);
        if (!theater || theater.length === 0) {
            createError(404, "Theater not found");
        }

        const deletedSeats = await deleteSeatByTheaterId(id);

        const deletedTheater = await deleteTheaterById(id);

        res.status(200).json({
            message: "Delete Theater successfully",
        });

    } catch (error) {
        next(error);
    }
}