import { connectToDatabase } from "../../util/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'
import { projetos } from "../../util/constants";
export default async (req: NextApiRequest, res: NextApiResponse) => {

  //const { db } = await connectToDatabase();
//
  //const projetos = await db
  //  .collection("projetos")
  //  .find({})
  //  .sort({data_inicio : -1 })
  //  .toArray();
//
  //res.json(projetos);
    return res.json(projetos)

};