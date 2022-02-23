import {Request, Response} from "express";

export default interface MessageControllerI {
    findAllMessagesUserSent (req: Request, res: Response): void;
    findAllMessagesUserReceived(req: Request, res: Response): void;
    deleteMessageByUser (req: Request, res: Response): void;
    createMessageByUser (req: Request, res: Response): void;
    findMessageByMid (req: Request, res: Response): void;
    deleteAllMessageByUser (req: Request, res: Response): void;
};