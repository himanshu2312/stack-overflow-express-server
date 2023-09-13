import express from "express";
import {askQuestion} from "../controllers/question.js"
import {getAllQuestions} from "../controllers/question.js"
import {deleteQuestion} from "../controllers/question.js"
import {voteQuestion} from "../controllers/question.js"
import auth from "../middlewares/auth.js";

const router=express.Router();

router.post('/ask',auth,askQuestion);
router.get('/get',getAllQuestions);
router.delete('/delete/:id',auth,deleteQuestion);
router.patch('/vote/:id',auth,voteQuestion);

export default router;