const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.get("/list", async (request, response) => {
  try{
    const users= await User.find({},"_id first_name last_name");
    response.json(users);
  } catch (err){
    response.status(500).send("Lỗi Server");
  }
});

router.get("/:id", async (request, response) => {
  try{
    const user=await User.findById(request.params.id);
    if (!user){
        return response.status(400).send("Không tìm thấy user");
    }
    response.json(user);
  } catch(err){
    response.status(400).send("ID không hợp lệ");
  }
});

module.exports = router;