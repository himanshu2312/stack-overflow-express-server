import mongoose from "mongoose";
import questions from "../models/question.js";

export const postAnswer= async(req,res)=>{
      const {id: _id} = req.params;
      const {noOfAnswers,answerBody,userAnswered,userId}=req.body;
      if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send("Question unavailable....")
      }
      updateNoOfAnswers(_id,noOfAnswers);

      try{
            const updateQuestion= await questions.findByIdAndUpdate(_id,{ $addToSet: {'answer': [{answerBody,userAnswered,userId}]}});
            return res.status(200).json(updateQuestion)
      }
      catch(e){
            res.status(404).json(e)
      }
}

export const updateNoOfAnswers=async(_id,noOfAnswers)=>{
      try{
            await questions.findByIdAndUpdate(_id,{$set:{'noOfAnswers':noOfAnswers}});
      }
      catch(e){
            console.log(e)
      }
}

export const deleteAnswer=async(req,res)=>{
      const {id:_id}=req.params;
      const {answerId,noOfAnswers}=req.body;
      if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send("Question unavailable....")
      }
      if(!mongoose.Types.ObjectId.isValid(answerId)){
            return res.status(404).send("Answer unavailable....")
      }
      updateNoOfAnswers(_id,noOfAnswers);

      try{
            await questions.updateOne(
                  {_id},
                  {$pull:{'answer': {_id:answerId}}}
            )
            return res.status(200).json({message:"Answer successfully deleted"})
      }
      catch(e){
            res.status(404).json(e)
      }
}