import { NextApiRequest,NextApiResponse } from 'next'
import fs from 'node:fs'


export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse<any>
){
    const { name , age} = req.body;
    if(name && age ){
        const file = fs.readFileSync("./data/db");
        const data = JSON.parse(file as any)
        if(data?.users){
            let updatedUser = {
                users:[...data.users,{...req.body,id:(Math.random() * 1e18).toString()}]
            }
            fs.writeFileSync("./data/db",JSON.stringify(updatedUser),"utf8")
        }
        else {
            let updatedUser = {
                users:[{...req.body,id:(Math.random() * 1e18).toString()}]
            }
            fs.writeFileSync("./data/db",JSON.stringify(updatedUser),"utf8")
        }
    }
    else {
        res.status(200).json({ error: "fields are missing"})
    }
}