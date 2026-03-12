import { connectToDatabase } from "../../util/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDatabase()

    const gradeNova = await db
        .collection("gradeNova")
        .find({})
        .toArray()

    res.status(200).json(gradeNova)
}