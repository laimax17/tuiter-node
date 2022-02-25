/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
 import MessageModel from "../mongoose/messages/MessageModel";
 import Message from "../models/messages/Message";
 import MessageDaoI from "../interfaces/MessageDaoI";
 
 /**
  * @class MessageDao Implements Data Access Object managing data storage
  * of Users
  * @property {MessageDao} messageDao Private single instance of UserDao
  */
 export default class MessageDao implements MessageDaoI{
     private static tuitDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
     public static getInstance = (): MessageDao => {
         if(MessageDao.tuitDao === null) {
             MessageDao.tuitDao = new MessageDao();
         }
         return MessageDao.tuitDao;
     }
     private constructor() {}

    /**
      * Uses MessageModel to retrieve all messages sent by the user
      * @param {string} uid User's primary key
      * @returns Promise To be notified when the messages are retrieved from
      * database
      */
     findAllMessagesUserSent = async (uid: string): Promise<Message[]> =>
         MessageModel.find({from: uid});

    /**
      * Uses MessageModel to retrieve all messages received by the user
      * @param {string} uid User's primary key
      * @returns Promise To be notified when the messages are retrieved from
      * database
      */
     findAllMessagesUserReceived = async (uid: string): Promise<Message[]> =>
         MessageModel.find({to: uid});

    /**
      * Inserts message instance into the database with user id, another user id and message
      * @param {string} uid primary key of the user who send the message
      * @param {string} auid primary key of another user who receive the message
      * @param {Message} message Instance to be inserted into the database
      * @returns Promise To be notified when message is inserted into the database
      */
     createMessageByUser = async (uid: string, auid: string, message: Message): Promise<Message> =>
         MessageModel.create({...message, from: uid, to: auid});

    /**
      * Removes message from the database.
      * @param {string} uid User's primary key
      * @param {string} tid Message's primary key
      * @returns Promise To be notified when message is removed from the database
      */
     deleteMessageByUser = async (uid: string, mid: string): Promise<any> =>
         MessageModel.deleteOne({_id: mid});

    /**
      * Find a message from the database.
      * @param {string} uid User's primary key
      * @param {string} tid Message's primary key
      * @returns Promise To be notified when message is removed from the database
      */
     findMessageByMid = async (mid: string): Promise<any> =>
         MessageModel.find({_id: mid});

    /**
      * Deletes all messages user sent from the database.
      * @param {string} uid User's primary key
      * @returns Promise To be notified when message is removed from the database
      */
     deleteAllMessageByUser = async (uid: string): Promise<any> => 
         MessageModel.deleteMany({from:uid});
 }