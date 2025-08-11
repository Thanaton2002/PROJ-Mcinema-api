import { addMovie, deleteMovieById, findMoviesById, getMovies, getMoviesName, updateMovie } from "../services/movies.service.js";
import createError from "../utils/createError.util.js";
import cloudinary from "../config/cloudinary.config.js";
import fs from "fs/promises";
import path from "path";


export async function postMovies(req, res, next) {
    try {
        const isAdmin = req.user?.role === "Admin";
        if (!isAdmin) {
            createError(403, "You are not allowed to do this");
        }

        const { name, genre, duration, releaseDate } = req.body;

        if (!name || !genre || !duration || !releaseDate) {
            createError(400, "Detail is missing");
        }

        const moviesName = await getMoviesName();
        console.log('moviesName', moviesName)
        const isNameExist = moviesName.map(movie => {
            const currName = movie.name.toLowerCase().replace(/\s+/g, '');
            const newMovieName = name.toLowerCase().replace(/\s+/g, '');
            if (currName === newMovieName) {
                createError(400, "This movie already exists")
            }
        })

        const image = !!req.file;
        let imageUrl = null;
        if (image) {
            imageUrl = await cloudinary.uploader.upload(req.file.path, {
                overwrite: true,
                public_id: path.parse(req.file.path).name,
            })
            await fs.unlink(req.file.path)
        }

        const data = image ? {
            name,
            genre,
            duration: parseInt(duration),
            releaseDate: new Date(releaseDate),
            imageUrl: imageUrl.secure_url,
        } : {
            name,
            genre,
            duration: parseInt(duration),
            releaseDate: new Date(releaseDate),
        }

        const movieAdded = await addMovie({ ...data });

        res.status(201).json({
            message: "Post success",
            data: {
                movie: movieAdded,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getAllMovies(req, res, next) {
    try {
        const movies = await getMovies();

        res.status(200).json({
            message: "Get movies success",
            movies
        });
    } catch (error) {
        next(error);
    }
}

export async function getMovieById(req, res, next) {
    try {
        const { id } = req.params;

        const movie = await findMoviesById(id);

        if (!movie || movie.length === 0) {
            createError(404, "Movie not found");
        }

        res.status(200).json({
            message: "Get movie success",
            movie,
        });
    } catch (error) {
        next(error);
    }
}

export async function editMovie(req, res, next) {
    try {
        const isAdmin = req.user?.role === "Admin";
        if (!isAdmin) {
            createError(403, "You are not allowed to do this");
        }

        const { id } = req.params;
        const { name, genre, duration, status, releaseDate } = req.body;

        const moviesName = await getMoviesName();
        // console.log('moviesName', moviesName)
        let isNameExist = null
        if (name) {
            isNameExist = moviesName.map(movie => {
                const currName = movie.name.toLowerCase().replace(/\s+/g, '');
                const newMovieName = name.toLowerCase().replace(/\s+/g, '');
                if (currName === newMovieName) {
                    createError(400, "This movie already exists")
                }
            })
        }


        const image = !!req.file;
        let imageUrl = null;
        if (image) {
            imageUrl = await cloudinary.uploader.upload(req.file.path, {
                overwrite: true,
                public_id: path.parse(req.file.path).name,
            })
            await fs.unlink(req.file.path)
        }

        const movie = await findMoviesById(id);
        if (!movie) {
            createError(404, "Movie not found");
        }

        const data = {};
        if (name !== undefined) data.name = name;
        if (genre !== undefined) data.genre = genre;
        if (duration !== undefined) data.duration = parseInt(duration);
        if (releaseDate !== undefined) data.releaseDate = new Date(releaseDate);
        if (status !== undefined) data.status = status;
        if (image && imageUrl?.secure_url) data.imageUrl = imageUrl.secure_url;

        const updatedMovie = await updateMovie(id, data);

        res.status(200).json({
            message: "Movie is updated",
            movie: updatedMovie,
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteMovie(req, res, next) {
    try {
        const isAdmin = req.user?.role === "Admin";
        if (!isAdmin) {
            createError(403, "You are not allowed to do this");
        }

        const { id } = req.params;

        const movie = await findMoviesById(id);
        if (!movie) {
            createError(404, "Movie not found");
        }

        if (movie.imageUrl) {
            const urlParts = movie.imageUrl.split('/');
            const fileName = urlParts[urlParts.length - 1]; // movie_123_99.jpg
            const publicId = path.parse(fileName).name;     // movie_123_99

            await cloudinary.uploader.destroy(publicId);
        }

        const deletedMovie = await deleteMovieById(id);

        res.status(200).json({
            message: "Movie deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}