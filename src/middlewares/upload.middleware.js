import multer from "multer";
import path from "path";

const desty = path.join(process.cwd(), "src/temp_files");


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, desty),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}_${Math.round(Math.random() * 1e6)}${ext}`
        cb(null, filename);
    }
});

const upload = multer({storage})

export default upload