
import { object, string } from "yup";

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
  body: object({
    title: string().required("Title is required"),
    body: string()
      .required("Body is required")
      .min(120, "Body is too short - should be 120 chars minimum."),
  }),
};

const params = {
  params: object({
    postId: string().required("postId is required"),
  }),
};

export const createPostSchema = object({
  ...payload,
});

export const updatePostSchema = object({
  ...params,
  ...payload,
});

export const deletePostSchema = object({
  ...params,
});