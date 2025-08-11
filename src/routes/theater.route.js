import express from 'express';
import { createTheater, deleteTheater, getSeats, getSelectedTheaters, getTheaters, updateSeat, updateTheater } from '../controllers/theater.controller.js';
import { authCheck } from '../middlewares/auth.middleware.js';

const theaterRouter = express.Router();

theaterRouter.post("/", authCheck, createTheater)
theaterRouter.get("/",  getTheaters)
theaterRouter.get("/:id",  getSelectedTheaters)
theaterRouter.get("/:id/seats", getSeats)
theaterRouter.patch("/seats/:id", updateSeat)
theaterRouter.patch("/:id", authCheck, updateTheater)
theaterRouter.delete("/:id", authCheck, deleteTheater);


export default theaterRouter;