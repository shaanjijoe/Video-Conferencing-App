import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../componentcss/LoginPage.css"
import Background from "../components/Background";
import getApiUrl from "../logicscripts/apiUtils";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../logicscripts/AuthContext";

const LoginPage = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false); //To show alert for invalid input
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();


  const handleSubmit = async (event) => {

    try {
      event.preventDefault();
      setLoading(true);
      await delay(500);
      // console.log(`Username :${inputUsername}, Password :${inputPassword}`);

      const data = { inputUsername, inputPassword };
      const url = getApiUrl('login');

      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.message);

          if (data.message === "success") {
            setShow(false);
            // localStorage.setItem("jwt-token", data.accessToken);
            login(data.accessToken);
            console.log(data.accessToken);
            setInputUsername("");
            setInputPassword("");
            navigate('/homepage');
            // router.push("/jwt-safehouse");
            console.log("Mission Success");
          } else {
            // alert(data.message);
            setShow(true);
          }
        })
      // if (inputUsername !== "admin" || inputPassword !== "admin") {
      //   setShow(true);
      // }
    } catch (error) {
      console.error("Error during fetch:", error);
      // Perform any additional error handling or logging as needed
    } finally {
      setLoading(false);
    }

  };

  const handlePassword = () => { };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <Background>

      <div className="sign-in__backdrop"></div>

      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>

        <div className="h4 mb-2 text-center">Sign In</div>
        {/* ALert */}
        {show ? (
          <Alert className="mb-2" variant="danger" onClose={() => setShow(false)} dismissible>
            Incorrect username or password.
          </Alert>
        ) : (<div />)}

        <Form.Group className="mb-2" controlId="username">

          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={inputUsername} placeholder="Username"
            onChange={(e) => setInputUsername(e.target.value)} required />

        </Form.Group>

        <Form.Group className="mb-2" controlId="password">

          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={inputPassword} placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)} required />

        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">

          <Form.Check type="checkbox" label="Remember me" />

        </Form.Group>


        {!loading ? (
          <Button className="w-100" variant="primary" type="submit" >
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}


        <div className="d-grid justify-content-end">
          <Button className="text-muted px-0" variant="link"
            onClick={handlePassword}> Forgot password?
          </Button>
        </div>

      </Form>
    </Background>
  );
};

export default LoginPage;
