import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getChats } from "../../store/chat/chatActions";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'
import { Badge, Button } from "@mui/material";
import { archivateChat } from "../../store/chat/chatActions";
import { deleteChat } from "../../store/chat/chatActions";
const ListOfChats = ( {archivated}) => {
  const chat = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  console.log(chat.dialogs, "dialogs");
  const handleOpenChat = (id) => {
    navigate(`/chat/${id}`);
  };
  console.log(chat.dialogs, "dialogs");
  React.useEffect(() => {
    dispatch(getChats({archive: archivated ? 1 : 0}));
  }, [dispatch, archivated])
  const hanldeArchivate = (id) => {
    dispatch(archivateChat({id, isArchive: !archivated}))
    window.location.href = "http://localhost:3000/messages/";
  }
  const handleDeleteChat = (id) => {
    dispatch(deleteChat({id}));
    window.location.href = "http://localhost:3000/messages/";
  }
  return (
  <>
    <List
      sx={{
        width: "100%",
        maxWidth: "100%",
        bgcolor: "background.paper",
      }}
    >
      {chat.dialogs.map((chat) => (
        <Box key={chat.created_at}>
          <ListItem
            sx={{ mt: 2, cursor: 'pointer' }}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Badge color="secondary" variant={chat.new_message ? 'dot' : null}>
              <Avatar alt="User" src={chat.user.avatar} />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              // primary={`From ${chat.user.name}`}
              primary={
                <Box onClick={() => handleOpenChat(chat.id)} display={"flex"} justifyContent={"space-between"}>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`From ${chat.user.name}`}
                  </Typography>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`${chat.created_at}`}
                  </Typography>
                </Box>
              }
              secondary={
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Reason of message:
                    {" " + chat.subject.title}
                  </Typography>
                  {user.isAdmin && <Box >
                    <Button onClick={() => hanldeArchivate(chat.id)} variant="contained">{!archivated ? "Archivate" : 'Unarchivate'}</Button>
                    <Button onClick={() => handleDeleteChat(chat.id)} sx={{ml: 2, bgcolor: 'red'}} variant="contained">Delete</Button>
                  </Box>}
                  
                </Box>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </Box>
      ))}
    </List>
    </>
  );
};

export default ListOfChats;
