import prisma from "../config/prisma.config.js"


export async function addTheater(data) {
    return await prisma.theater.create({ data })
}

export async function addSeats(data) {
    return await prisma.seat.createMany({ data })
}

export async function findTheaterByName(name) {
    return await prisma.theater.findFirst({
        where: { name: name },
    });
}

export async function getAllTheaters() {
    return await prisma.theater.findMany({});
}

export async function getTheatersById(id) {
    return await prisma.theater.findMany({ where: { id: parseInt(id) } });
}

export async function editTheater(id, data) {
    return await prisma.theater.update({
        where: { id: parseInt(id) },
        data,
    });
}

export async function deleteTheaterById(id) {
    return await prisma.theater.delete({
        where: { id: parseInt(id) },
    });
}

export async function getSeatsByTheaterId(id) {
    return await prisma.seat.findMany({
        where: { theaterId: parseInt(id) },
    });
}

export async function editSeatById(id, status) {
    return await prisma.seat.update({
        where: { id: parseInt(id) },
        data: { status },
    });
}

export async function deleteSeatByTheaterId(theaterid) {
    return await prisma.seat.deleteMany({
        where: { theaterId: parseInt(theaterid) },
    });
}