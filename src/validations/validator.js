import {object, ref, string} from "yup"

export const registerSchema = object({
    email: string()
        .email("รูปแบบอีเมลไม่ถูกต้อง")
        .required("กรุณากรอกอีเมล"),
    password: string()
        .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร")
        .required("กรุณากรอกรหัสผ่าน"),
    confirmPassword: string()
        .oneOf([ref("password"), null], "รหัสผ่านไม่ตรงกัน"),
    phoneNumber: string()
        .notRequired()
        .nullable()
        .when({
            is: (val) => val && val.length > 0,
            then: (schema) => schema.matches(/^\d{10}$/, "หมายเลขโทรศัพท์ต้องมี 10 หลัก"),
        })
})

export const validator = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, {
            abortEarly: false, // Validate all fields, not just the first error
        });
        next();
    } catch (error) {
        const errMsg = error.errors.map((err)=> err)
        const errText = errMsg.join(", ")
        const mergedError = new Error(errText);
        next(mergedError);
    }
}