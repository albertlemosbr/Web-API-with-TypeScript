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
exports.deletePost = exports.findAndUpdate = exports.findPost = exports.createPost = void 0;
const post_model_1 = __importDefault(require("../model/post.model"));
const metrics_1 = require("../utils/metrics");
const timer = metrics_1.databaseResponseTimeHistogram.startTimer();
function createPost(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: "createPost",
        };
        try {
            const result = yield post_model_1.default.create(input);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: "true" }));
            return result;
        }
        catch (error) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: "false" }));
            throw error;
        }
    });
}
exports.createPost = createPost;
function findPost(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: "findPost",
        };
        try {
            const result = yield post_model_1.default.findOne(query, {}, options);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: "true" }));
            return result;
        }
        catch (error) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: "false" }));
            throw error;
        }
    });
}
exports.findPost = findPost;
function findAndUpdate(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: "updatePost",
        };
        try {
            const result = yield post_model_1.default.findOneAndUpdate(query, update, options);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: "true" }));
            return result;
        }
        catch (error) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: "false" }));
            throw error;
        }
    });
}
exports.findAndUpdate = findAndUpdate;
function deletePost(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const metricsLabels = {
            operation: "deletePost",
        };
        try {
            const result = yield post_model_1.default.deleteOne(query);
            timer(Object.assign(Object.assign({}, metricsLabels), { success: "true" }));
            return result;
        }
        catch (error) {
            timer(Object.assign(Object.assign({}, metricsLabels), { success: "false" }));
            throw error;
        }
    });
}
exports.deletePost = deletePost;
//# sourceMappingURL=post.service.js.map