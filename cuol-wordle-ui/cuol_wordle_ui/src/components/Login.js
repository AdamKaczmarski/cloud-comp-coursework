import {useState} from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useDispatch } from "react-redux";
import {setToken} from "../store/authReducer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Register from "./Register";
const Login = (props) =>{
  const dispatch = useDispatch();
  const [showRegister, setShowRegister] = useState(false);
    const[prompt,setPrompt] = useState({}) ;
  const loginData = {
    email: "",
    password: "",
  };

  const login = async (ev) => {
    ev.preventDefault();
        const url = process.env.REACT_APP_SERVER_URL;
    try {
      const response = await axios({
        method: "POST",
        //url: `${url}/auth/login/`,
        url: `/auth/login/`,
        data: loginData,
      });
      if (response.status === 200) {
        dispatch(setToken(response.data.access))
        props.onHide();
      }
    } catch (err) {
        setPrompt({msg:"Could not log in, try again",status:err.response.status});
    }
  };
  const emailHandler = (ev) => {
    loginData.email = ev.target.value;
  };
  const passwordHandler = (ev) => {
    loginData.password = ev.target.value;
  };
  const showRegisterHandler = ()=>{
    setShowRegister(!showRegister);
  }
    const handleRegister=(msg)=>{
        setPrompt(msg)
    }
  return (
      <>
    <Modal show={props.show} onHide={props.onHide} >
      <Modal.Header className=" mx-3">
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body className=" mx-3">
      {prompt.status?<Alert variant={prompt.status===201?"success":"danger"}>{prompt.msg?prompt.msg:"Something went wrong, please try again"}</Alert>:null}
      <Form className="mx-3 mb-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            onChange={emailHandler}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={passwordHandler}
          />
        </Form.Group>
      <Row>
      <Col>
        <Button variant="primary" type="submit" onClick={login}>
          Login
        </Button>
      </Col>
      
      <Col>
      <p className="text-muted">Don't have an account? <a onClick={showRegisterHandler} href="#">Register here</a></p>
      </Col>
</Row>
      </Form>
      </Modal.Body>
    </Modal>
      <Register show={showRegister} onHide={showRegisterHandler}  handleRegister={handleRegister} />

      </>
  );
}

export default Login;
