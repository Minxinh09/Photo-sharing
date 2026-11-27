import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Divider } from "@mui/material";

import "./styles.css";
import {useParams} from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"; 
import { Link } from "react-router-dom";
/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const { userId } = useParams();
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
    // Gọi API lấy danh sách ảnh của user từ MongoDB
    fetchModel(`/photosOfUser/${userId}`)
      .then((data) => {
        setPhotos(data);
      })
      .catch((err) => {
        console.error("Lỗi khi tải ảnh của user:", err);
      });
  }, [userId]);
    return (
      <div>
      
      {photos.length === 0 ? (
        <Typography>Người dùng này chưa có ảnh nào</Typography>
      ) : (
        photos.map((photo) => (
          <Card key={photo._id} style={{ marginBottom: "20px" }}>
            
            <CardMedia
              component="img"
              image={`/images/${photo.file_name}`}
              alt="User photo"
            />
            <CardContent>
              
              <Typography variant="caption" color="textSecondary">
                Date: {new Date(photo.date_time).toLocaleString()}
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <Typography variant="subtitle2">Comments:</Typography>
             
              {photo.comments && photo.comments.length > 0 ? (
                photo.comments.map((c) => (
                  <div key={c._id} style={{ margin: "8px 0" }}>
                    
                    <Link
                      to={`/users/${c.user._id}`}
                      style={{ fontWeight: "bold", marginRight: "8px", textDecoration: "none", color: "#1976d2" }}
                    >
                      {c.user.first_name} {c.user.last_name}:
                    </Link>
                    
                    <span>{c.comment}</span>
                    
                    <Typography variant="caption" display="block" color="textSecondary">
                      {new Date(c.date_time).toLocaleString()}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Chưa có bình luận nào.
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
    );
}

export default UserPhotos;
