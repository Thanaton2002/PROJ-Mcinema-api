export default function error(err, req, res, next) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        errorMessage: err.message || "Internal Server Error",
    });
}