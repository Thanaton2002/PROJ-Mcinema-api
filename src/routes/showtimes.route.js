import express from "express";
import { getAllShowtimes, getShowtimeById, createShowtime, updateShowtime, deleteShowtime } from "../controllers/showtimes.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";

const showtimeRouter = express.Router();

// สร้างรอบฉาย (admin)
showtimeRouter.post("/", authCheck, createShowtime);
// ดูรอบฉายทั้งหมด
showtimeRouter.get("/", getAllShowtimes);
// ดูรอบฉายตาม id
showtimeRouter.get("/:id", getShowtimeById);
// แก้ไขรอบฉาย (admin)
showtimeRouter.patch("/:id", authCheck, updateShowtime);
// ลบรอบฉาย (admin)
showtimeRouter.delete("/:id", authCheck, deleteShowtime);

export default showtimeRouter;