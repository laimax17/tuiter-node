import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    userFollowsUser (uid: string, auid: string): Promise<Follow>;
    userUnfollowsUser (uid: string, auid: string): Promise<any>;
    findAllUsersFollowing (uid: string): Promise <Follow[]>;
    findAllUsersFollower (uid: string): Promise <Follow[]>;
    userUnfollowsAll (uid: string): Promise<any>;
    userRemoveAllFollowers (uid: string): Promise<any>;
};