import mongoose from 'mongoose'

const questionSchema=mongoose.Schema({
      questionTitle:{type:String,require:"Question must have Title"},
      questionTags:{type:[String],require:"Question must have Tags"},
      questionBody:{type:String,require:"Question must have Body"},
      upVotes:{type:[String],default:[]},
      downVotes:{type:[String],default:[]},
      noOfAnswers:{type:Number,default:0},
      userPosted:{type:String,require:"Question must have an Author"},
      userId:{type:String},
      askedOn:{type:Date,default:Date.now},
      answer:[{
            answerBody: String,
            userId:String,
            userAnswered:String,
            userId: String,
            answeredOn: {type:Date,default:Date.now}
      }]

})

export default mongoose.model("Questions",questionSchema);