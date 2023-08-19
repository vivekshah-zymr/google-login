import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);

  // const responseMessage = (response: any) => {
  //   console.log("response=====", response);
  // };
  // const errorMessage = () => {
  //   console.log("errorMessage=====");
  // };

  const login = useGoogleLogin({
    hosted_domain: process.env.REACT_APP_DOMAIN || "",
    onSuccess: (codeResponse: any) => {
      console.log("===codeResponse--=",codeResponse);
      setUser(codeResponse)
    },
    onError: (error) => console.log('Login Failed:===', error)
  });

  useEffect(
    () => {
      if (user) {
        const access_token = (user as any)['access_token'] as string;
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            console.log("res---",res)
            setProfile(res.data);
          })
          .catch((err) => console.log("err===",err));
      }
    },
    [user]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={(profile as any).picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {(profile as any).name}</p>
          <p>Email Address: {(profile as any).email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        // <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}
export default App;