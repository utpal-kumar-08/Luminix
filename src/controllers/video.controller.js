import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query = "", sortBy = "createdAt", sortType = "desc", userId } = req.query;
    const match = {};
    if (query) {
        match.$or = [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } }
        ];
    }
    if (userId && isValidObjectId(userId)) {
        match.owner = new mongoose.Types.ObjectId(userId);
    }
    const sort = {};
    sort[sortBy] = sortType === "asc" ? 1 : -1;
    const aggregate = Video.aggregate([
        { $match: match },
        { $sort: sort }
    ]);
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        populate: { path: "owner", select: "_id username avatar" }
    };
    const result = await Video.aggregatePaginate(aggregate, options);
    return res.status(200).json(new ApiResponse(200, result, "Videos fetched successfully"));
});


const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description, duration } = req.body;
    if (!title || !description || !duration) {
        throw new ApiError(400, "Title, description, and duration are required");
    }
    if (!req.files || !req.files.video || !req.files.thumbnail) {
        throw new ApiError(400, "Video file and thumbnail are required");
    }
    const videoFilePath = req.files.video[0].path;
    const thumbnailPath = req.files.thumbnail[0].path;
    const videoUpload = await uploadOnCloudinary(videoFilePath);
    const thumbnailUpload = await uploadOnCloudinary(thumbnailPath);
    if (!videoUpload || !thumbnailUpload) {
        throw new ApiError(500, "Failed to upload video or thumbnail to Cloudinary");
    }
    const video = await Video.create({
        videoFile: videoUpload.url,
        thumbnail: thumbnailUpload.url,
        title,
        description,
        duration,
        owner: req.user._id
    });
    return res.status(201).json(new ApiResponse(201, video, "Video published successfully"));
});


const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }
    const video = await Video.findById(videoId).populate("owner", "_id username avatar");
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    return res.status(200).json(new ApiResponse(200, video, "Video fetched successfully"));
});


const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }
    const { title, description } = req.body;
    let update = {};
    if (title) update.title = title;
    if (description) update.description = description;
    if (req.files && req.files.thumbnail) {
        const thumbnailPath = req.files.thumbnail[0].path;
        const thumbnailUpload = await uploadOnCloudinary(thumbnailPath);
        if (!thumbnailUpload) {
            throw new ApiError(500, "Failed to upload new thumbnail");
        }
        update.thumbnail = thumbnailUpload.url;
    }
    const video = await Video.findByIdAndUpdate(videoId, update, { new: true });
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    return res.status(200).json(new ApiResponse(200, video, "Video updated successfully"));
});


const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }
    const video = await Video.findByIdAndDelete(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    return res.status(200).json(new ApiResponse(200, video, "Video deleted successfully"));
});


const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    video.isPublished = !video.isPublished;
    await video.save();
    return res.status(200).json(new ApiResponse(200, video, `Video is now ${video.isPublished ? "published" : "unpublished"}`));
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}