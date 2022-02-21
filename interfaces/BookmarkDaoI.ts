import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @file Declares API for bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    findAllUsersThatBookmarkedTuit(tid: string): Promise<Bookmark[]>;
    findAllTuitsBookmarkedByUser (uid: string): Promise<Bookmark[]>;
    userUnbookmarksTuit (uid: string, tid: string): Promise<any>;
    userBookmarksTuit (uid: string, tid: string): Promise<Bookmark>;
    findSpecificTuitBookmarkedByUser (uid: string, tid: string): Promise<Bookmark>;
};