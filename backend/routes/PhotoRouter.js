const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

router.get(["/photosOfUser/:id","/:id"], async (request, response) => {
    try{
        const user=await User.findById(request.params.id);
        if (!user){
            return response.status(400).send("Không tìm thấy user");
        
        }
         const photos= await Photo.find({user_id:request.params.id}).lean();
         const result =await Promise.all(
            photos.map(async(photo)=>{
                const comments = await Promise.all(
                    (photo.comments||[]).map(async(c)=>{
                        const author = await User.findById(c.user_id,"_id first_name last_name");
                        return{
                            _id:c._id,
                            comment:c.comment,
                            date_time:c.date_time,
                            user:author,
                        };
                    })
                );
                return {...photo,comments};
            })
         ); 
         response.json(result);  
    } catch (err){
        response.status(400).send("ID không hợp lệ");
    }
    
});



module.exports = router;
