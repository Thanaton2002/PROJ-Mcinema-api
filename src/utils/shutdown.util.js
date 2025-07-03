import prisma from "../prisma/client.js";

export default async function(signals) {
    console.log(`Received shutdown signal: ${signals}`);
    try {
        // Close the Prisma Client connection
        await prisma.$disconnect();
        console.log("Prisma Client disconnected successfully.");
    } catch (error) {
        console.error("Error disconnecting Prisma Client:", error);
    }finally {
        // Exit the process
        process.exit(0);
    }
}