import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChatBox } from "react-chatbox-component";
import "react-chatbox-component/dist/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMessanges } from "../../store/chat/chatActions";
import { sendMessage } from "../../store/chat/chatActions";
const Chat = () => {
    const {id} = useParams();
    const [sentMessage, setSendMessage] = useState(false);
    const dispatch = useDispatch();
    const {messanges} = useSelector(state => state.chat);
    console.log(messanges)
    useEffect(() => {
     dispatch(getMessanges({id: id}));
    }, [dispatch, id, sentMessage])
    const handleSubmit = (text) => {
        dispatch(sendMessage({id: id, text: text}))
        window.location.href = `http://localhost:3000/chat/${id}`;
    }

  return (
    <div className="container">
      <ChatBox onSubmit={handleSubmit} messages={messanges} />
    </div>
  );
};

export default Chat;
