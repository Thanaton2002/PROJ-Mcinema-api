import express from 'express';
import { deleteMovie, editMovie, getAllMovies, getMovieById, postMovies } from '../controllers/movies.controller.js';
import { authCheck } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';


const moviesRouter = express.Router();

moviesRouter.post("/", authCheck, upload.single('image'), postMovies);
moviesRouter.get("/",  getAllMovies);
moviesRouter.get("/:id",  getMovieById);
moviesRouter.patch("/:id", authCheck, upload.single('image'), editMovie);
moviesRouter.delete("/:id", authCheck, deleteMovie);

export default moviesRouter;