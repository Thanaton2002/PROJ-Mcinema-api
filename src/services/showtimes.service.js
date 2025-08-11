import prisma from "../config/prisma.config.js";

export async function getShowtimes() {
    return prisma.showtime.findMany({
        include: {
            movie: { select: { id: true, name: true } },
            theater: { select: { id: true, name: true } }
        }
    });
}

export async function getShowtimeByIdService(id) {
    return prisma.showtime.findUnique({
        where: { id: Number(id) },
        include: {
            movie: { select: { id: true, name: true } },
            theater: { select: { id: true, name: true } }
        }
    });
}

export async function createShowtimeService(data) {
    return prisma.showtime.create({
        data,
    });
}

export async function updateShowtimeService(id, data) {
    return prisma.showtime.update({
        where: { id: Number(id) },
        data,
    });
}

export async function deleteShowtimeService(id) {
    return prisma.showtime.delete({
        where: { id: Number(id) },
    });
}