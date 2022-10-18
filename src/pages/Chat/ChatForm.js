import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getReasonsForIssue } from "../../store/chat/chatActions";
import { createChat } from "../../store/chat/chatActions";
import { Button } from "@mui/material";
import { getChats } from "../../store/chat/chatActions";
import { handleCloseModal } from "../../store/ui/uiSlice";
const ChatForm = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
  useEffect(() => {
    dispatch(getReasonsForIssue());
    dispatch(getChats());
  }, [dispatch]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reason = chat.subjects.find((el) => el.label === data.get("reason"));
    dispatch(createChat({ subject: reason.id, text: data.get("message") }));
    dispatch(handleCloseModal());
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
        {chat.subjects && (
          <Autocomplete
            disablePortal
            fullWidth
            id="combo-box-demo"
            options={chat.subjects}
            sx={{ mt: 2, mb: 5 }}
            renderInput={(params) => (
              <TextField
                id="reason"
                name="reason"
                {...params}
                label={"Issue"}
              />
            )}
          />
        )}

        <TextField
          name="message"
          id="standard-multiline-static"
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
        <Button type="submit">Send message</Button>
      </Box>
    </>
  );
};

export default ChatForm;
