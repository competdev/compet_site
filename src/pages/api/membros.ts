import { connectToDatabase } from "../../util/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  const membros = await db
    .collection("membros")
    .find({})
    .sort({data_inicio : -1 })
    .toArray();

  res.json(membros);
};