/**
 * @file Declares Like data type representing relationship between
 * users and tuits, as in user bookmarks a tuit
 */
 import Tuit from "../tuits/Tuit";
 import User from "../users/User";
 
 /**
  * @typedef Bookmark Represents likes relationship between a user and a tuit,
  * as in a user likes a tuit
  * @property {Tuit} bookmarkedTuit Tuit being liked
  * @property {User} bookmarkedBy User liking the tuit
  */
 
 export default interface Bookmark {
     bookmarkedTuit: Tuit,
     bookmarkedBy: User
 };