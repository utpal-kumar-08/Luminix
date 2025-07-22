import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.models.js"
import { Subscription } from "../models/subscription.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }
    if (req.user._id.toString() === channelId) {
        throw new ApiError(400, "You cannot subscribe to yourself");
    }
    const existing = await Subscription.findOne({
        subscriber: req.user._id,
        channel: channelId
    });
    let message = "";
    if (existing) {
        await existing.deleteOne();
        message = "Unsubscribed from channel";
    } else {
        await Subscription.create({
            subscriber: req.user._id,
            channel: channelId
        });
        message = "Subscribed to channel";
    }
    return res.status(200).json(new ApiResponse(200, null, message));
});


const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channel ID");
    }
    const subscribers = await Subscription.find({ channel: channelId }).populate("subscriber", "_id username avatar");
    return res.status(200).json(new ApiResponse(200, subscribers, "Channel subscribers fetched successfully"));
});


const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;
    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriber ID");
    }
    const channels = await Subscription.find({ subscriber: subscriberId }).populate("channel", "_id username avatar");
    return res.status(200).json(new ApiResponse(200, channels, "Subscribed channels fetched successfully"));
});

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}