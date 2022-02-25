/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
 import {Express, Request, Response} from "express";
 import BookmarkDao from "../daos/BookmarkDao";
 import BookmarkControllerI from "../interfaces/BookmarkControllerI";
 
 /**
  * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/bookmarks to retrieve all the tuits bookmarked by a user
  *     </li>
  *     <li>GET /api/tuits/:tid/bookmarks to retrieve all users that bookmarked a tuit
  *     </li>
  *     <li>POST /api/users/:uid/bookmarks/:tid to record that a user bookmarks a tuit
  *     </li>
  *     <li>DELETE /api/users/:uid/unbookmarks/:tid to record that a user
  *     no longer bookmarks a tuit
  *     </li>
  *     <li>GET /api/users/:uid/bookmarks/:tid to get a specific tuit bookmarked by user
  *     </li>
  * </ul>
  * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
  * @property {BookmarkController} BookmarkController Singleton controller implementing
  * RESTful Web service API
  */
 export default class BookmarkController implements BookmarkControllerI {
     private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
     private static bookmarkController: BookmarkController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return TuitController
      */
     public static getInstance = (app: Express): BookmarkController => {
         if(BookmarkController.bookmarkController === null) {
             BookmarkController.bookmarkController = new BookmarkController();
             app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
             app.get("/api/tuits/:tid/bookmarks", BookmarkController.bookmarkController.findAllUsersThatBookmarkedTuit);
             app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
             app.delete("/api/users/:uid/unbookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
             app.get("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.findSpecificTuitBookmarkedByUser);
         }
         return BookmarkController.bookmarkController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that bookmarkd a tuit from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the bookmarked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findAllUsersThatBookmarkedTuit = (req: Request, res: Response) =>
         BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
             .then(bookmarks => res.json(bookmarks));
 
     /**
      * Retrieves all tuits bookmarkd by a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user bookmarked tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing tuit objects that were bookmarked
      */
     findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
         BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
             .then(bookmarks => res.json(bookmarks));
 
     /**
      * User bookmarks a tuit 
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that bookmark the tuit
      * and the tuit being bookmarked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new bookmarks that was inserted in the
      * database
      */
     userBookmarksTuit = (req: Request, res: Response) =>
         BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
             .then(bookmarks => res.json(bookmarks));
 
     /**
      * User unbookmarks a tuit
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that unbookmark
      * the tuit and the tuit being unbookmarked
      * @param {Response} res Represents response to client, including status
      * on whether deleting the bookmark was successful or not
      */
     userUnbookmarksTuit = (req: Request, res: Response) =>
         BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
             .then(status => res.send(status));
             
    
     /**
      * Retrieves specific tuit that is bookmarked by the user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter tid representing the bookmarked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects
      */
    findSpecificTuitBookmarkedByUser = (req: Request, res: Response) =>
      BookmarkController.bookmarkDao.findSpecificTuitBookmarkedByUser(req.params.uid, req.params.tid)
          //.then(status => res.send(status));
          .then(bookmarks => res.json(bookmarks));
 };