import mongoose from "mongoose"
import Users from "../models/auth.js"

export const getAllUsers=async(req,res)=>{
      try{
            const allUsers = await Users.find();
            const usersDetail = []
            allUsers.map((user)=>{
                  usersDetail.push({_id:user._id,name:user.name,joinedOn:user.joinedOn,tags:user.tags,about:user.about})
            })
            res.status(200).json(usersDetail)
      }
      catch(e){
            res.status(404).json({message:e.message})
      }
}

export const updateUser=async(req,res)=>{
      const {id:_id} = req.params;
      const {name, about, tags}=req.body;
      if(!mongoose.Types.ObjectId.isValid(_id)){
            res.status(404).json({message:"User not found"})
      }
      try{
            const updatedUser= await Users.findByIdAndUpdate(_id,{ $set : { 'name':name, 'about':about, 'tags':tags}},{new:true});
            res.status(200).json(updatedUser)
      }
      catch(e){
            res.status(405).json({message:"Profile not updated, try again!!"})
      }
}