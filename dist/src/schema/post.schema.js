"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostSchema = exports.updatePostSchema = exports.createPostSchema = void 0;
const yup_1 = require("yup");
/**
 * @openapi
 * components:
 *   schemas:
 *     PostInput:
 *       type: object
 *       required:
 *        - title
 *        - body
 *       properties:
 *         title:
 *           type: string
 *           default: A title for post
 *         body:
 *           type: string
 *           default: text post here
 *     PostResponse:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         body:
 *           type: string
 *         _id:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         postId:
 *           type: string
 *         user:
 *           type: string
 */
const payload = {
    body: (0, yup_1.object)({
        title: (0, yup_1.string)().required("Title is required"),
        body: (0, yup_1.string)()
            .required("Body is required")
            .min(120, "Body is too short - should be 120 chars minimum."),
    }),
};
const params = {
    params: (0, yup_1.object)({
        postId: (0, yup_1.string)().required("postId is required"),
    }),
};
exports.createPostSchema = (0, yup_1.object)(Object.assign({}, payload));
exports.updatePostSchema = (0, yup_1.object)(Object.assign(Object.assign({}, params), payload));
exports.deletePostSchema = (0, yup_1.object)(Object.assign({}, params));
//# sourceMappingURL=post.schema.js.map