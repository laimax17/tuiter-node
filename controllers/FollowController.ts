/**
 * @file Controller RESTful Web service API for likes resource
 */
 import {Express, Request, Response} from "express";
 import FollowDao from "../daos/FollowDao";
 import FollowControllerI from "../interfaces/FollowControllerI";
 
 /**
  * @class FollowController Implements RESTful Web service API for follows resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /api/users/:uid/follows to retrieve all other users followed by a user
  *     </li>
  *     <li>GET /api/tuits/:uid/follower to retrieve all other users following a user
  *     </li>
  *     <li>POST /api/users/:uid/follows/:auid to record that a user follows another user
  *     </li>
  *     <li>DELETE /api/users/:uid/unfollows/:auid to record that a user no longer follow another user
  *     </li>
  * </ul>
  * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
  * @property {FollowController} FollowController Singleton controller implementing
  * RESTful Web service API
  */
 export default class FollowController implements FollowControllerI {
     private static followDao: FollowDao = FollowDao.getInstance();
     private static followController: FollowController | null = null;
     /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return followController
      */
     public static getInstance = (app: Express): FollowController => {
         if(FollowController.followController === null) {
             FollowController.followController = new FollowController();
             app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersFollowing);
             app.get("/api/tuits/:uid/follower", FollowController.followController.findAllUsersFollower);
             app.post("/api/users/:uid/follows/:auid", FollowController.followController.userFollowsUser);
             app.delete("/api/users/:uid/unfollows/:auid", FollowController.followController.userUnfollowsUser);
             app.delete("/api/users/:uid/unfollows/all",FollowController.followController.userUnfollowAll);
             app.delete("/api/users/:uid/removefollowers/all",FollowController.followController.userRemoveAllFollowers);
         }
         return FollowController.followController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that the user is following from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user following others
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the follow objects
      */
      findAllUsersFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowing(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * Retrieves all other users following a user from the database
      * @param {Request} req Represents request from client, including the path
      * parameter uid representing the user being followed
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the follow objects 
      */
      findAllUsersFollower = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollower(req.params.uid)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and auid representing the user that is following another user
      * and the another user is being followed
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new likes that was inserted in the
      * database
      */
      userFollowsUser = (req: Request, res: Response) =>
         FollowController.followDao.userFollowsUser(req.params.uid, req.params.auid)
             .then(follows => res.json(follows));
 
     /**
      * @param {Request} req Represents request from client, including the
      * path parameters uid and tid representing the user that is unfollowing another user
      * and the user being unfollowed
      * @param {Response} res Represents response to client, including status
      * on whether deleting the like was successful or not
      */
      userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.uid, req.params.auid)
            .then(status => res.send(status));
      
      userUnfollowAll = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowAll(req.params.uid)
            .then(status => res.send(status));

      userRemoveAllFollowers = (req: Request, res: Response) =>
        FollowController.followDao.userRemoveAllFollowers(req.params.uid)
            .then(status => res.send(status));
 };