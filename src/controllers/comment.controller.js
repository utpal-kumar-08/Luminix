import mongoose from "mongoose"
import {Comment} from "../models/comment.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const getVideoComments = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    const {page = 1, limit = 10} = req.query;
    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }
    const aggregate = Comment.aggregate([
        { $match: { video: new mongoose.Types.ObjectId(videoId) } },
        { $sort: { createdAt: -1 } }
    ]);
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        populate: { path: "owner", select: "_id username avatar" }
    };
    const result = await Comment.aggregatePaginate(aggregate, options);
    return res.status(200).json(new ApiResponse(200, result, "Comments fetched successfully"));
});


const addComment = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    const {content} = req.body;
    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }
    if (!content) {
        throw new ApiError(400, "Content is required");
    }
    const comment = await Comment.create({
        content,
        video: videoId,
        owner: req.user._id
    });
    return res.status(201).json(new ApiResponse(201, comment, "Comment added successfully"));
});


const updateComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params;
    const {content} = req.body;
    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }
    if (!content) {
        throw new ApiError(400, "Content is required");
    }
    const comment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true });
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    return res.status(200).json(new ApiResponse(200, comment, "Comment updated successfully"));
});


const deleteComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params;
    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    return res.status(200).json(new ApiResponse(200, comment, "Comment deleted successfully"));
});

export {
    getVideoComments, 
    addComment, 
    updateComment,
    deleteComment
}