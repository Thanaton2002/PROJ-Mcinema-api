import prisma from "../config/prisma.config.js";

export function getMemberByEmail(email) {
    return prisma.member.findUnique({
        where: { email },
    });
}   

export function createMember(memberData) {
    return prisma.member.create({
        data: memberData,
    });
}

export function getMemberById(id) {
    return prisma.member.findUnique({
        where: { id },
    });
}