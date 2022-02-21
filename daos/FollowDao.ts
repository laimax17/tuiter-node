import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    
    userFollowsUser = async (uid: string, auid: string): Promise<Follow> =>
        FollowModel.create({ userFollowing: uid, userFollowed: auid});

    userUnfollowsUser = async (uid: string, auid: string): Promise<any> => 
        FollowModel.deleteOne({userFollowing: uid, userFollowed: auid});

    findAllUsersFollowing = async (uid: string): Promise <Follow[]> => 
        FollowModel
            .find({userFollowing: uid})
            .populate("userFollowed")
            .exec();

    findAllUsersFollower = async (uid: string): Promise <Follow[]> =>
        FollowModel
                .find({userFollowed: uid})
                .populate("userFollowing")
                .exec();
}