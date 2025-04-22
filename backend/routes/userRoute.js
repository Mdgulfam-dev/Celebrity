import express from "express";
import * as userController from "../controllers/userController.js";
import bodyParser from "body-parser";


const user_route = express.Router();

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

// Twilio send-message, login and register endpoints
user_route.post('/send-message',userController.sendMessage);
user_route.post('/login', userController.loginUser);
user_route.post('/register', userController.registerUser);

export default user_route;
