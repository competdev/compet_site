import { connectToDatabase } from "../../util/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { projetos } from "../../../util/constants";
export default async (req: NextApiRequest, res: NextApiResponse) => {

  const {projectId} = req.query;
  //const { db } = await connectToDatabase();
//
  //const projetos = await db
  //  .collection("projetos")
  //  .find({})
  //  .sort({data_inicio : -1 })
  //  .toArray();
//
  //res.json(projetos);
  const projeto = projetos.find(projeto => projeto.id === projectId)
  if(projeto){
    return res.json(projeto)
  }
  return res.status(400).json({error:"Projeto não encontrado"})
};