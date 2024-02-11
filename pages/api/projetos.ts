import { connectToDatabase } from "../../util/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
export default async (req: NextApiRequest, res: NextApiResponse) => {

  const { db } = await connectToDatabase();

  const projetos = await db
    .collection("projects")
    .find({})
    .sort({ data_inicio: -1 })
    .toArray();
  const withId = projetos.map((projeto) => {
    return { ...projeto, id: projeto._id }
  })
  return res.json(withId)

};