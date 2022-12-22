import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useDispatch } from "react-redux";
import {setToken} from "../store/authReducer";
const Login = (props) =>{
  const dispatch = useDispatch();
  const loginData = {
    email: "",
    password: "",
  };

  const login = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:8000/auth/login/",
        data: loginData,
      });
      if (response.status === 200) {
        dispatch(setToken(response.data.access))
        props.onHide();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const emailHandler = (ev) => {
    loginData.email = ev.target.value;
  };
  const passwordHandler = (ev) => {
    loginData.password = ev.target.value;
  };
  return (
    <Modal show={props.show} onHide={props.onHide} >
      <Modal.Header className=" mx-3">
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body className=" mx-3">

      <Form className="mx-3 mb-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter login"
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
        <Button variant="primary" type="submit" onClick={login}>
          Login
        </Button>
      </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;