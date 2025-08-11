import prisma from "../config/prisma.config.js";


export function addMovie(data) {
    return prisma.movie.create({data});
}

export function getMovies() {
    return prisma.movie.findMany();
}

export function findMoviesById(id) {
    return prisma.movie.findUnique({
        where: { id: parseInt(id) },
    });
}

export function updateMovie(id, data) {
    return prisma.movie.update({
        where: { id: parseInt(id) },
        data,
    });
}

export function deleteMovieById(id) {
    return prisma.movie.delete({
        where: { id: parseInt(id) },
    });
}

export async function getMoviesName() {
    return prisma.movie.findMany({
        select: {
            name: true,
        },
    });
}