// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

<<<<<<< HEAD
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
=======
export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
>>>>>>> dbc1d04a5317edc061d1b0aa4a82dedbbeb7e8f0
  res.status(200).json({ name: 'John Doe' })
}
