import React, { useState, useEffect } from "react";


import "./styles.css";
import {useParams} from "react-router-dom";
import models from "../../modelData/models";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  useEffect(()=>{
    fetchModel(`/user/${userId}`)
    .then((data)=>{
      setUserData(data);
    })
    .catch((err)=>{
      console.error("Lỗi khi tải chi tiết user:",err);
  });
      
  },[userId]);
    if (!userData) {
    return <Typography>Không tìm thấy người dùng!</Typography>;
  }

    return (
      <div style={{ padding: "16px" }}>
      
      <Typography variant="h4" gutterBottom>
        {userData.first_name} {userData.last_name}
      </Typography>
      
      <Typography variant="body1">
        <strong>Vị trí:</strong> {userData.location}
      </Typography>
      
      <Typography variant="body1">
        <strong>Nghề nghiệp:</strong> {userData.occupation}
      </Typography>
      
      <Typography variant="body1" paragraph>
        <strong>Mô tả:</strong> {userData.description}
      </Typography>
        <Button
          variant="contained"
          component={Link}
          to={`/photos/${userId}`}
        >  
        Xem ảnh của {userData.first_name}
        </Button>
        </div>
    );
}

export default UserDetail;
