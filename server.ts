/**
 * @file Server file
 */
 import dotenv from "dotenv";
 import express, {Request, Response} from 'express';
 import mongoose from "mongoose";

 dotenv.config();

 const db_username = process.env.DB_USERNAME;
 const db_password = process.env.DB_PASSWORD;
 const mongoUrl = `mongodb+srv://max17:max17@cluster0.gci7e.mongodb.net/tuiter?retryWrites=true&w=majority`;

 mongoose.connect(mongoUrl);
 import bodyParser from "body-parser";
 //import CourseController from "./controllers/CourseController";
 import UserController from "./controllers/UserController";
 import TuitController from "./controllers/TuitController";
 import LikeController from "./controllers/LikeController";
 import BookmarkController from "./controllers/BookmarkController";
 import MessageController from "./controllers/MessageController";
 import FollowController from "./controllers/FollowController";

 const app = express();
 app.use(bodyParser.json())
 
 app.get('/', (req: Request, res: Response) =>
     res.send('Welcome to the TS!'));
 
 app.get('/add/:a/:b', (req: Request, res: Response) =>
     res.send(req.params.a + req.params.b));
 
 //const courseController = new CourseController(app);
 const userController = UserController.getInstance(app);
 const tuitController = TuitController.getInstance(app);
 const likesController = LikeController.getInstance(app);
 const bookmarkController = BookmarkController.getInstance(app);
 const messageController = MessageController.getInstance(app);
 const followController = FollowController.getInstance(app);
 
 const PORT = 4000;
 app.listen(process.env.PORT || PORT);