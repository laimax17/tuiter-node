import {Request, Response} from "express";

/**
 * @file Declares bookmarks controller interface.
 */
export default interface BookmarkControllerI {
    findAllUsersThatBookmarkedTuit (req: Request, res: Response): void;
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;
    userBookmarksTuit (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
    findSpecificTuitBookmarkedByUser (req: Request, res: Response): void;
};