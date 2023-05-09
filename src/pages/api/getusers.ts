// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'node:fs'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const file = fs.readFileSync("./data/db");
  const data = JSON.parse(file as any)
  if(data?.users){
    res.status(200).json(data.users)
  }
  else {
    res.status(200).json([])
  }
}
