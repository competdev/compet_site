import { connectToDatabase } from "../../../util/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
export default async (req: NextApiRequest, res: NextApiResponse) => {

  const nome = decodeURI(req.query.projectId as string);
  const { db } = await connectToDatabase();
  const projeto = await db
    .collection("projects")
    .findOne({ nome })
  if (projeto) {
    const withId = { ...projeto, id: projeto._id };
    return res.json(withId)
  }

  return res.status(400).json({ error: "Projeto não encontrado" })
};