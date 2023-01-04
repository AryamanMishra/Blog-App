const { Router } = require("express");
const express = require("express");
const router = express.Router();

const requireLogin = require("../middleware/requireLogin");

/* Required models to be used */
const User = require("../models/user");
const Blog = require("../models/blog");

router.get("/users/:id/home/My-Blogs/:bid", requireLogin, async (req, res) => {
  try {
    const params = req.params;
    const id = params.id;
    const bid = params.bid;
    const user = await User.findById(id);
    const blog = await Blog.findById(bid);
    res.render("users/aUserBlog", { user, blog });
  } catch (error) {
    console.log(error, "error in myblogs");
  }
});

module.exports = router;
