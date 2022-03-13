import { useEffect, useState } from "react";
import cookie from "react-cookies";
import CodeScreen from "./CodeScreen";
import EmailScreen from "./EmailScreen";
import logo from "../assets/images/logo.png";

const LandingScreen = () => {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState(false);

  useEffect(() => {
    const authCookie = cookie.load("auth");
    if (authCookie) {
      fetch("http://localhost:5000/auth", { credentials: "include" })
        .then((resp) => resp.text())
        .then((text) => {
          const data = text.toJson();
          setAuth(data);
        });
    }
  }, []);

  return (
    <>
      
        <img src={logo} alt="" width={60}/>
        {!auth && <EmailScreen setAuth={setAuth} email={email} setEmail={setEmail}/>}
        {auth && <CodeScreen email={email}/>}
      
    </>
  );
};

export default LandingScreen;
