"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./controller/user.controller");
const session_controller_1 = require("./controller/session.controller");
const post_controller_1 = require("./controller/post.controller");
const middleware_1 = require("./middleware");
const user_schema_1 = require("./schema/user.schema");
const post_schema_1 = require("./schema/post.schema");
function default_1(app) {
    /**
     * @openapi
     * /healthcheck:
     *  get:
     *    tags:
     *    - Healthcheck
     *    description: Responds if the app is up and running
     *    responses:
     *      200:
     *        description: App is up and running
     */
    app.get("/healthcheck", (req, res) => res.sendStatus(200));
    // Register user
    /**
     * @openapi
     * '/api/users':
     *  post:
     *     tags:
     *     - User
     *     summary: Register a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateUserInput'
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/CreateUserResponse'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.post("/api/users", (0, middleware_1.validateRequest)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    // Login
    app.post("/api/sessions", (0, middleware_1.validateRequest)(user_schema_1.createUserSessionSchema), session_controller_1.createUserSessionHandler);
    // Get the user's sessions
    app.get("/api/sessions", middleware_1.requiresUser, session_controller_1.getUserSessionsHandler);
    // Logout
    app.delete("/api/sessions", middleware_1.requiresUser, session_controller_1.invalidateUserSessionHandler);
    // Create a post
    /**
     * @openapi
     * '/api/posts':
     *  post:
     *     tags:
     *     - Posts
     *     summary: Create a post
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *             $ref: '#/components/schemas/PostInput'
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/PostResponse'
     *      400:
     *        description: Bad request
     */
    app.post("/api/posts", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.createPostSchema)], post_controller_1.createPostHandler);
    // Update a post
    /**
     * @openapi
     * '/api/posts/{postId}':
     *  put:
     *     tags:
     *     - Posts
     *     summary: Update a single post by the postId
     *     parameters:
     *      - name: postId
     *        in: path
     *        description: The id of the post
     *        required: true
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/PostInput'
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/PostResponse'
     *       404:
     *         description: Post not found
     */
    app.put("/api/posts/:postId", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.updatePostSchema)], post_controller_1.updatePostHandler);
    // Get a post
    /**
    * @openapi
    * '/api/posts/{postId}':
    *  get:
    *     tags:
    *     - Posts
    *     summary: Get a single post by the postId
    *     parameters:
    *      - name: postId
    *        in: path
    *        description: The id of the post
    *        required: true
    *     responses:
    *       200:
    *         description: Success
    *         content:
    *          application/json:
    *           schema:
    *              $ref: '#/components/schemas/PostResponse'
    *       404:
    *         description: Post not found
    */
    app.get("/api/posts/:postId", post_controller_1.getPostHandler);
    // Delete a post
    /**
    * @openapi
    * '/api/posts/{postId}':
    *  delete:
    *     tags:
    *     - Posts
    *     summary: delete a single post by the postId
    *     parameters:
    *      - name: postId
    *        in: path
    *        description: The id of the post
    *        required: true
    *     responses:
    *       204:
    *         description: Post Deleted
    *       404:
    *         description: Post not found
    */
    app.delete("/api/posts/:postId", [middleware_1.requiresUser, (0, middleware_1.validateRequest)(post_schema_1.deletePostSchema)], post_controller_1.deletePostHandler);
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map