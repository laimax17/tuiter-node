/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
 import MessageModel from "../mongoose/messages/MessageModel";
 import Message from "../models/messages/Message";
 import MessageDaoI from "../interfaces/MessageDaoI";
 
 /**
  * @class UserDao Implements Data Access Object managing data storage
  * of Users
  * @property {MessageDao} messageDao Private single instance of UserDao
  */
 export default class MessageDao implements MessageDaoI{
     private static tuitDao: MessageDao | null = null;
     public static getInstance = (): MessageDao => {
         if(MessageDao.tuitDao === null) {
             MessageDao.tuitDao = new MessageDao();
         }
         return MessageDao.tuitDao;
     }
     private constructor() {}
     findAllMessagesUserSent = async (uid: string): Promise<Message[]> =>
         MessageModel.find({from: uid});

     findAllMessagesUserReceived = async (uid: string): Promise<Message[]> =>
         MessageModel.find({to: uid});

     createMessageByUser = async (uid: string, auid: string, message: Message): Promise<Message> =>
         MessageModel.create({...message, from: uid, to: auid});

     deleteMessageByUser = async (uid: string, mid: string): Promise<any> =>
         MessageModel.deleteOne({_id: mid});

     findMessageByMid = async (mid: string): Promise<any> =>
         MessageModel.find({_id: mid});
        
     findMessageByDate = async (uid: string, date: Date): Promise<Message[]> => 
         MessageModel.find({from:uid, sentOn: date});
 }