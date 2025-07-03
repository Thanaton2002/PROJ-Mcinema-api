import { createMember, getMemberByEmail } from "../services/member.service.js";
import createError from "../utils/createError.util.js";
import bcrypt from 'bcryptjs'

export async function register(req, res, next) {
    try {
        const { email, password, firstName, lastName, birthDate, phoneNumber, role } = req.body;

        const existingMember = await getMemberByEmail(email);
        if (existingMember) {
            createError(400, "Email already used");
        }

        const newMember = {
            email,
            password: await bcrypt.hash(password, 10), // Hash the password
            firstName,
            lastName,
            birthDate: new Date(birthDate), // Convert to Date object
            phoneNumber,
            role
        }

        const createdMember = await createMember(newMember);

        res.status(201).json({
            message: "Member registered successfully",
        });

    } catch (error) {
        next(error);
    }
}