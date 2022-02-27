import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Post, { PostDocument } from "../model/post.model";
import { databaseResponseTimeHistogram } from "../utils/metrics";

const timer = databaseResponseTimeHistogram.startTimer();

export async function createPost(input: DocumentDefinition<PostDocument>) {
  const metricsLabels = {
    operation: "createPost",
  };

  try {
    const result = await Post.create(input);
    timer({ ...metricsLabels, success: "true" });

    return result;
  } catch (error: any) {
    timer({ ...metricsLabels, success: "false" });
    throw error;
  }
}

export async function findPost(
  query: FilterQuery<PostDocument>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabels = {
    operation: "findPost",
  };

  try {
    const result = await Post.findOne(query, {}, options);
    timer({ ...metricsLabels, success: "true" });

    return result;
  } catch (error: any) {
    timer({ ...metricsLabels, success: "false" });
    throw error;
  }
}

export async function findAndUpdate(
  query: FilterQuery<PostDocument>,
  update: UpdateQuery<PostDocument>,
  options: QueryOptions
) {
  const metricsLabels = {
    operation: "updatePost",
  };

  try {
    const result = await Post.findOneAndUpdate(query, update, options);
    timer({ ...metricsLabels, success: "true" });

    return result;
  } catch (error: any) {
    timer({ ...metricsLabels, success: "false" });
    throw error;
  }
}

export async function deletePost(query: FilterQuery<PostDocument>) {
  const metricsLabels = {
    operation: "deletePost",
  };

  try {
    const result = await Post.deleteOne(query);
    timer({ ...metricsLabels, success: "true" });

    return result;
  } catch (error) {
    timer({ ...metricsLabels, success: "false" });
    throw error;
  }
}