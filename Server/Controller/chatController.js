import { log } from "console";
import chatModel from "../Model/chatModel.js";
export async function createChat(req,res){
    console.log(req.body);
    const newChat=new chatModel({
       members: [req.body.senderId,req.body.reciverId]
    })
    try{
        const result= await newChat.save()
        res.json({err:false,result})
    }catch(error){
        res.json({error})
    }

}
export async function userChat(req,res){
    try{
    
        let userChats=await chatModel.find({
            members:{$in:[req.params.id]}
        })

        res.json({err:false,userChats})

    }catch(error){
        res.json({error})
    }
}
export async function findChat(req,res){
    try{
        let chat=await chatModel.find({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.json({err:false,chat})

    }catch(error){
        res.json({error})
    }
}