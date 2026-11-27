import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import models from "../../modelData/models";
import { Link } from "react-router-dom";

import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    const[users,setUsers]=useState([]);
    useEffect(()=>{
      fetchModel("/user/list")
      .then((data)=>{
        setUsers(data);
      })
      .catch((err)=>{
        console.error("Lỗi khi tải danh sách user:",err);
      });
    },[])
    return (
      <div>
        
          <List component="nav">
    {users.map((item) => (
      <React.Fragment key={item._id}>
        <ListItem component={Link} to={`/users/${item._id}`}>
          <ListItemText primary={`${item.first_name} ${item.last_name}`} />
        </ListItem>
        <Divider />
      </React.Fragment>
    ))}
  </List>
        
      </div>
    );
}

export default UserList;
