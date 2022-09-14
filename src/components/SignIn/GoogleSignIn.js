import React, { useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { REACT_APP_GOOGLE_CLIENT_ID, BASE_URL } from '../../config';
import { gapi } from 'gapi-script';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleLogin } from '../../store/user/userSlice';
function GoogleSignIn() {  
    const dispatch = useDispatch();
    const navigate = useNavigate()
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);
  

  const onSuccess = async response => {
    
    const resp = await fetch(`${BASE_URL}/users/google/login/`, {
        method: 'POST',
        body: JSON.stringify({token: response.tokenId}),
        headers: {
            'Content-type': 'Application/json'
        }
    });
    const loginData = await resp.json();
    console.log(loginData.token, loginData['is_admin'], 'hello')
    localStorage.setItem(
        "userDetails",
        JSON.stringify({ token: loginData.token, isAdmin: loginData["is_admin"] })
      );
      dispatch(googleLogin(loginData))
    navigate('/home')
   
  };
  const onFailure = response => {
    console.log('FAILED', response);
  };
//   const onLogoutSuccess = () => {
//     console.log('SUCESS LOG OUT');
//   };

  return (
    <div style={{paddingLeft: 80, marginTop: 20}}>
      <GoogleLogin
        clientId={REACT_APP_GOOGLE_CLIENT_ID}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}

export default GoogleSignIn;