import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }
    const existing = await Like.findOne({ video: videoId, likedBy: req.user._id });
    let message = "";
    if (existing) {
        await existing.deleteOne();
        message = "Video unliked";
    } else {
        await Like.create({ video: videoId, likedBy: req.user._id });
        message = "Video liked";
    }
    return res.status(200).json(new ApiResponse(200, null, message));
});


const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params;
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }
    const existing = await Like.findOne({ comment: commentId, likedBy: req.user._id });
    let message = "";
    if (existing) {
        await existing.deleteOne();
        message = "Comment unliked";
    } else {
        await Like.create({ comment: commentId, likedBy: req.user._id });
        message = "Comment liked";
    }
    return res.status(200).json(new ApiResponse(200, null, message));
});


const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params;
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }
    const existing = await Like.findOne({ tweet: tweetId, likedBy: req.user._id });
    let message = "";
    if (existing) {
        await existing.deleteOne();
        message = "Tweet unliked";
    } else {
        await Like.create({ tweet: tweetId, likedBy: req.user._id });
        message = "Tweet liked";
    }
    return res.status(200).json(new ApiResponse(200, null, message));
});


const getLikedVideos = asyncHandler(async (req, res) => {
    const likes = await Like.find({ likedBy: req.user._id, video: { $ne: null } }).populate("video");
    const likedVideos = likes.map(like => like.video);
    return res.status(200).json(new ApiResponse(200, likedVideos, "Liked videos fetched successfully"));
});

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}