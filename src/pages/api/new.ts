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
        console.log(data)
        if(data?.users){
            const newUser = {...req.body,id:(Math.random() * 1e18).toString()}
            let updatedUser = {
                users:[...data.users,newUser]
            }
            fs.writeFileSync("./data/db",JSON.stringify(updatedUser),"utf8")
            res.status(200).json(newUser)
        }
        else {
            const newUser = {...req.body,id:(Math.random() * 1e18).toString()}
            let updatedUser = {
                users:[newUser]
            }
            fs.writeFileSync("./data/db",JSON.stringify(updatedUser),"utf8")
            res.status(200).json(newUser)
        }
    }
    else {
        res.status(200).json({ error: "fields are missing"})
    }
}