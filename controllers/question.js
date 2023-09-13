import questions from "../models/question.js";
import mongoose from "mongoose";

export const askQuestion= async(req,res)=>{
      const postQuestion=req.body;
      try{
            const newQuestion= new questions(postQuestion)
            await newQuestion.save()
            res.status(200).json({message:"Question posted successfully"})
      }
      catch(e){
            console.log(e)
            res.status(409).json("Couldn't post a new question")
      }
}

export const getAllQuestions = async(req,res)=>{
      try{
            const questionList=await questions.find();
            res.status(200).json(questionList)
      }
      catch(e){
            res.status(404).json({message:e.message})
      }
}

export const deleteQuestion=async(req,res)=>{
      const {id:_id}=req.params;
      if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send("Question unavailable....")
      }
      try{
            await questions.findByIdAndRemove(_id);
            res.status(200).json({message:"Question successfully deleted"})
      }
      catch(e){
            res.status(404).json({message:e.message});
      }
}

export const voteQuestion=async(req,res)=>{
      const {id:_id}=req.params;
      const {value,userId}=req.body;

      if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).send("Question unavailable....")
      }

      try{
            const question = await questions.findById(_id);
            const upVotesIndex= question.upVotes.findIndex((id)=> id === String(userId));
            const downVotesIndex= question.downVotes.findIndex((id)=> id === String(userId));

            if(value === 'up'){
                  if(downVotesIndex !== -1){
                        question.downVotes= question.downVotes.filter((id)=> id !== String(userId));
                  }
                  if(upVotesIndex === -1){
                        question.upVotes.push(userId);
                  }
                  else{
                        question.upVotes= question.upVotes.filter((id)=> id !== String(userId));
                  }
            }
            else if(value === 'down'){
                  if(upVotesIndex !== -1){
                        question.upVotes= question.upVotes.filter((id)=>id !== String(userId));
                  }
                  if(downVotesIndex === -1){
                        question.downVotes.push(userId);
                  }
                  else{
                        question.downVotes= question.downVotes.filter((id)=>id !== String(userId));
                  }
            }

            await questions.findByIdAndUpdate(_id,question);
            return res.status(200).json({message:"Successfully voted"})
      }
      catch(e){
            console.log(e)
            res.status(404).json({message:"Id not found"})
      }
}