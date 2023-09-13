import express from "express";
import {signup,login} from "../controllers/auth.js"
import {getAllUsers} from "../controllers/user.js"
import {updateUser} from "../controllers/user.js"
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/get',getAllUsers)
router.patch('/update/:id', auth , updateUser)

export default router;