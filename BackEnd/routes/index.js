const authRoute = require("./authentication.route");
const profileRoute = require("./profile.route");
const blogRoute = require("./blog.route");
const blogCommentRoute = require("./blogComment.route");
const departmentRoute = require("./department.router");
const categoryRoute = require("./categoryRoute");
const ErrorMiddleWare = require("../middleware/error");

module.exports = (app) => {
  app.get("/", function (req, res) {
    res.send({
      message: "Our first endpoint",
    });
  });

  app.use("/auth", authRoute);
  app.use("/profile", profileRoute);
  app.use("/blogs", blogRoute);
  app.use("/blogs", blogCommentRoute);
  app.use("/depart", departmentRoute);
  app.use("/cate", categoryRoute);

  app.use(ErrorMiddleWare);
};
