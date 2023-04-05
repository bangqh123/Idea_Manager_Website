const router = require("express").Router();
const blogCommentController = require("./../controllers/blogComment.controller");
const middleware = require("./../helpers/middleware");

router.get("/:blog_id/comments", blogCommentController.list);
router.post(
  "/:blog_id/comments/create",
  middleware.auth,
  blogCommentController.create
);
module.exports = router;

