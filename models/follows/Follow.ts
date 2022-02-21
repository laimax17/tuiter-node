/**
 * @file Declares Like data type representing relationship between
 * users and tuits, as in user likes a tuit
 */
 import User from "../users/User";
 
 /**
  * @typedef Follow Represents follows relationship between a user and another user,
  * as in a user follows another user
  * @property {User} userFollowed User being followed by another user
  * @property {User} userFollowing User(follower) following another user
  */
 
 export default interface Follow {
     userFollowed: User,
     userFollowing: User
 };