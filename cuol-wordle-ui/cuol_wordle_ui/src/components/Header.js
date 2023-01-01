import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Login from "./Login";
import Stats from "./Stats";
import Navbar from 'react-bootstrap/Navbar';
import {useState} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {setToken} from "../store/authReducer";
const Header = () => {
    const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const showLoginHandler = ()=>{
    setShowLogin(!showLogin);
  }
    const logoutHandler=()=>{
        dispatch(setToken(""))
    }
  const [showStats, setShowStats] = useState(false);
  const showStatsHandler = ()=>{
    setShowStats(!showStats);
  }
  const token = useSelector((state) => state.auth.token);
  return (
    <>
    <Navbar bg="light" variant="light" expand="lg" className="p-0 my-3">
      <Container>
        <Navbar.Brand href=".">IN3046 Group 8 - Cloud Wordle</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link className="mx-3" onClick={showStatsHandler}>Stats</Nav.Link>
          <Nav.Link className="mx-3" onClick={token?logoutHandler:showLoginHandler}>{token?"Logout":"Login"}</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {showLogin ? <Login show={showLogin} onHide={setShowLogin} /> :null}
    {showStats ? <Stats show={showStats} onHide={setShowStats} /> :null}
    </>
  );
};

export default Header;
