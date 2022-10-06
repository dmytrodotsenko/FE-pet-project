import React, { useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { REACT_APP_GOOGLE_CLIENT_ID, BASE_URL } from "../../config";
import { gapi } from "gapi-script";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleLogin } from "../../store/user/userSlice";
import { attachGoogle } from "../../store/user/userActions";
function GoogleSignIn({text, isLoginAction}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: REACT_APP_GOOGLE_CLIENT_ID,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const onAddAccount = async (response) => {
      console.log(response.tokenId)
      dispatch(attachGoogle({token: response.tokenId, google_id: response.googleId}))
      window.location.href = `http://localhost:3000/home/${
        user.isAdmin ? "admin" : "user"
      }`
  }
  const onSuccess = async (response) => {
    console.log(response, "hello");
    const resp = await fetch(`${BASE_URL}/users/google/login/`, {
      method: "POST",
      body: JSON.stringify({
        token: response.tokenId,
        google_id: response.googleId,
      }),
      headers: {
        "Content-type": "Application/json",
      },
    });
    const loginData = await resp.json();
    console.log(loginData, "12");
    if (loginData.is_registred) {
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          token: loginData.token,
          isAdmin: loginData["is_admin"],
          isRegistred: loginData.is_registred,
        })
      );
      dispatch(googleLogin(loginData));
      navigate(`/home/${user.isAdmin ? "admin" : "user"}`);
    }
    if (!loginData.is_registred) {
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          token: null,
          isAdmin: null,
          isRegistred: loginData.is_registred,
          googleId: response.googleId,
          googleToken: response.tokenId
        })
      );
      navigate("/signup");
    }
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.disconnect();
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };
  //   const onLogoutSuccess = () => {
  //     console.log('SUCESS LOG OUT');
  //   };

  return (
    <>
      <GoogleLogin
        clientId={REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={isLoginAction ? onSuccess : onAddAccount}
        onFailure={onFailure}
        buttonText={text}
      />
    </>
  );
}

export default GoogleSignIn;
