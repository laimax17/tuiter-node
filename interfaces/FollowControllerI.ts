import {Request, Response} from "express";

/**
 * @file Declares follows controller interface.
 */
export default interface FollowControllerI {
    userFollowsUser (req: Request, res: Response): void;
    userUnfollowsUser (req: Request, res: Response): void;
    findAllUsersFollowing (req: Request, res: Response): void;
    findAllUsersFollower (req: Request, res: Response): void;
    userUnfollowsAll (req: Request, res: Response): void;
    userRemoveAllFollowers (req: Request, res: Response): void;
};