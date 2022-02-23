/**
 * @file Controller RESTful Web service API for messages resource
 */
 import MessageDao from "../daos/MessageDao";
 import Message from "../models/messages/Message";
 import {Express, Request, Response} from "express";
 import MessageControllerI from "../interfaces/MessageControllerI";
 
 /**
  * @class MessageController Implements RESTful Web service API for messages resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users/:uid/messages to create a new message instance for
  *     a given user</li>
  *     <li>GET /api/messages to retrieve all the message instances</li>
  *     <li>GET /api/messages/:tid to retrieve a particular message instances</li>
  *     <li>GET /api/users/:uid/messages to retrieve messages for a given user </li>
  *     <li>PUT /api/messages/:tid to modify an individual message instance </li>
  *     <li>DELETE /api/messages/:tid to remove a particular message instance</li>
  * </ul>
  * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
  * @property {MessageController} messageController Singleton controller implementing
  * RESTful Web service API
  */
 export default class MessageController implements MessageControllerI {
     private static messageDao: MessageDao = MessageDao.getInstance();
     private static messageController: MessageController | null = null;
 
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return MessageController
      */
     public static getInstance = (app: Express): MessageController => {
         if(MessageController.messageController === null) {
             MessageController.messageController = new MessageController();
             app.get("/api/users/:uid/messages/sent", MessageController.messageController.findAllMessagesUserSent);
             app.get("/api/users/:uid/messages/received", MessageController.messageController.findAllMessagesUserReceived);
             app.delete("/api/users/:uid/messages/delete/:mid", MessageController.messageController.deleteMessageByUser);
             app.post("/api/users/:uid/sends/:auid/message", MessageController.messageController.createMessageByUser);
             app.get("/api/users/:uid/messages/:mid", MessageController.messageController.findMessageByMid);
             app.delete("/api/users/:uid/messages/delete", MessageController.messageController.deleteAllMessageByUser);
         }
         return MessageController.messageController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all messages from the database and returns an array of messages.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the message objects
      */
      findAllMessagesUserSent = (req: Request, res: Response) =>
         MessageController.messageDao.findAllMessagesUserSent(req.params.uid)
             .then((messages: Message[]) => res.json(messages));
     
     /**
      * Retrieves all messages from the database for a particular user and returns
      * an array of messages.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the message objects
      */
      findAllMessagesUserReceived = (req: Request, res: Response) =>
         MessageController.messageDao.findAllMessagesUserReceived(req.params.uid)
             .then((messages: Message[]) => res.json(messages));
 
    
 
     /**
      * @param {Request} req Represents request from client, including body
      * containing the JSON object for the new message to be inserted in the
      * database
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new message that was inserted in the
      * database
      */
     createMessageByUser = (req: Request, res: Response) =>
         MessageController.messageDao.createMessageByUser(req.params.uid, req.params.auid, req.body)
             .then((message: Message) => res.json(message));
 

     /**
      * @param {Request} req Represents request from client, including path
      * parameter tid identifying the primary key of the message to be removed
      * @param {Response} res Represents response to client, including status
      * on whether deleting a user was successful or not
      */
      deleteMessageByUser = (req: Request, res: Response) =>
         MessageController.messageDao.deleteMessageByUser(req.params.uid, req.params.mid)
             .then((status) => res.send(status));
      
      findMessageByMid = (req: Request, res: Response) => 
         MessageController.messageDao.findMessageByMid(req.params.mid)
             .then((message: Message) => res.json(message));
      
      deleteAllMessageByUser = (req: Request, res: Response) =>
             MessageController.messageDao.deleteAllMessageByUser(req.params.uid)
                 .then((status) => res.send(status));
 };