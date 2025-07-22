import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.models.js"
import {Like} from "../models/like.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const getChannelStats = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }
   
    const totalVideos = await Video.countDocuments({ owner: channelId });
    
    const videos = await Video.find({ owner: channelId });
    const totalViews = videos.reduce((sum, v) => sum + (v.views || 0), 0);
   
    const totalSubscribers = await Subscription.countDocuments({ channel: channelId });
    
    const videoIds = videos.map(v => v._id);
    const totalLikes = await Like.countDocuments({ video: { $in: videoIds } });
    const stats = {
        totalVideos,
        totalViews,
        totalSubscribers,
        totalLikes
    };
    return res.status(200).json(new ApiResponse(200, stats, "Channel stats fetched successfully"));
});


const getChannelVideos = asyncHandler(async (req, res) => {
    const { channelId } = req.params;
    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }
    const videos = await Video.find({ owner: channelId }).sort({ createdAt: -1 });
    return res.status(200).json(new ApiResponse(200, videos, "Channel videos fetched successfully"));
});

export {
    getChannelStats, 
    getChannelVideos
}