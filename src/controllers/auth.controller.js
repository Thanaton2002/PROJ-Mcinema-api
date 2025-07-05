import { createMember, getMemberByEmail, getMemberById } from "../services/member.service.js";
import createError from "../utils/createError.util.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

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


export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const member = await getMemberByEmail(email);

        if (!member) {
            createError(401, "Email or Password is incorrect");
        }

        const isPasswordValid = await bcrypt.compare(password, member.password);
        if (!isPasswordValid) {
            createError(401, "Email or Password is incorrect");
        }

        const payload = {
            id: member.id,
            role: member.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        next(error);
    }
}

export async function getMe(req, res, next) {
    try {
        const member = await getMemberById(req.user.id);
        if (!member) {
            return next(createError(404, "Member not found"));
        }

        res.status(200).json({
            id: member.id,
            email: member.email,
            firstName: member.firstName,
            lastName: member.lastName,
            birthDate: member.birthDate,
            phoneNumber: member.phoneNumber,
            role: member.role
        });

    } catch (error) {
        next(error);
    }
}