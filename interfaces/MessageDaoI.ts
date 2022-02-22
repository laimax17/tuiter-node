import Message from "../models/messages/Message";

/**
 * @file Declares API for messages related data access object methods
 */
export default interface MessageDaoI {
    findAllMessagesUserSent(uid: string): Promise<Message[]>;
    findAllMessagesUserReceived (uid: string): Promise<Message[]>;
    deleteMessageByUser (uid: string, mid: string): Promise<any>;
    createMessageByUser (uid: string, auid: string, message: Message): Promise<Message>;
    findMessageByMid (mid: string): Promise<Message>;
    findMessageByDate (uid: string, date: string): Promise<Message[]>;
};