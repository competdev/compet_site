import { connectToDatabase } from "../../util/mongodb"
import type { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDatabase()

    const gradeAntiga = await db
        .collection("gradeAntiga")
        .find({})
        .toArray()

    res.status(200).json(gradeAntiga)
}