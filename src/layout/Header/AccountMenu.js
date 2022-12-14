import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/user/userSlice";
import GoogleIcon from "@mui/icons-material/Google";
import { deleteGoogle } from "../../store/user/userActions";
import GoogleSignIn from "../../pages/SignIn/GoogleSignIn";
import CreateIcon from "@mui/icons-material/Create";
import { handleOpenModal } from "../../store/ui/uiSlice";
import MessageIcon from '@mui/icons-material/Message';
import { Badge } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    navigate("/signin");
    dispatch(logout());
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteGoogle = () => {
    dispatch(deleteGoogle());
    setTimeout(() => {
      window.location.href = `http://localhost:3000/home/${
        user.isAdmin ? "admin" : "user"
      }`;
    }, 2000)
  };
  const handleOpenCreateModal = () => {
    dispatch(handleOpenModal('create'));
  };
  console.log(userInfo, 'dsddd')
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Badge color="primary" variant={userInfo.has_new_message ? 'dot' : null}>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {user.isAdmin && (
          <MenuItem onClick={handleOpenCreateModal}>
            <ListItemIcon>
              <CreateIcon fontSize="small" />
            </ListItemIcon>
            Create new item
          </MenuItem>
        )}
        <MenuItem onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            My profile
          </MenuItem>
        <Badge color="primary" variant={userInfo.has_new_message ? 'dot' : null}>
        <MenuItem onClick={() => navigate('/messages')}>
            <ListItemIcon>
              <MessageIcon fontSize="small" />
            </ListItemIcon>
            Messages
          </MenuItem>
          </Badge>
        {userInfo.google_login ? (
          <MenuItem onClick={handleDeleteGoogle} sx={{ color: "red" }}>
            <ListItemIcon>
              <GoogleIcon sx={{ color: "red" }} fontSize="small" />
            </ListItemIcon>
            Disable google account
          </MenuItem>
        ) : (
          <MenuItem sx={{ color: "red" }}>
            <GoogleSignIn
              isLoginAction={false}
              text={"Attach google account"}
            />
          </MenuItem>
        )}
        
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </Badge>
    </React.Fragment>
  );
}
