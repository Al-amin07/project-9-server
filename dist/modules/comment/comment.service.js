"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const prismaProvider_1 = __importDefault(require("../../utils/prismaProvider"));
const createComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.comment.create({
        data: payload,
    });
    return result;
});
const getCommentId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.comment.findUniqueOrThrow({
        where: { id },
    });
    return result;
});
const getAllComment = (paginateQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = paginateQuery;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const result = yield prismaProvider_1.default.comment.findMany({
        include: {
            post: {
                include: {
                    category: true, // Assuming you want to include the category of the post
                },
            }, // Assuming you want to include the related post
            user: true, // Assuming you want to include the user who made the comment
        },
        orderBy: {
            createdAt: "desc",
        },
        skip,
        take,
    });
    return {
        data: result,
        meta: {
            page: Number(page),
            limit: Number(limit),
            total: yield prismaProvider_1.default.comment.count({}),
            totalPages: Math.ceil((yield prismaProvider_1.default.comment.count({})) / Number(limit)),
        },
    };
});
const getAllUsersComment = (payload, paginateQuery) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = paginateQuery;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const result = yield prismaProvider_1.default.comment.findMany({
        where: {
            userId: payload === null || payload === void 0 ? void 0 : payload.id,
        },
        skip,
        take,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            post: {
                include: {
                    category: true, // Assuming you want to include the category of the post
                },
            }, // Assuming you want to include the related post
            user: true, // Assuming you want to include the user who made the comment
        },
    });
    return {
        data: result,
        meta: {
            page: Number(page),
            limit: Number(limit),
            total: yield prismaProvider_1.default.comment.count({
                where: {
                    userId: payload === null || payload === void 0 ? void 0 : payload.id,
                },
            }),
            totalPages: Math.ceil((yield prismaProvider_1.default.comment.count({
                where: {
                    userId: payload === null || payload === void 0 ? void 0 : payload.id,
                },
            })) / Number(limit)),
        },
    };
});
const deleteComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaProvider_1.default.comment.delete({
        where: { id },
    });
    return result;
});
exports.commentService = {
    createComment,
    getCommentId,
    getAllComment,
    getAllUsersComment,
    deleteComment,
};
