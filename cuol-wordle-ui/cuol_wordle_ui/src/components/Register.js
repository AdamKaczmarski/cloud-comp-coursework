import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Alert from "react-bootstrap/Modal"
import { useState } from "react";
const Register= (props) =>{
    const[registerData, setRegisterData]= useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const register= async (ev) => {
        ev.preventDefault();
        const url = process.env.REACT_APP_SERVER_URL;
        try {
            const response = await axios({
                method: "POST",
                url: `${url}/auth/register/`,
               // url: `/auth/register/`,
                data: registerData,
            });
                props.handleRegister({msg:response.data.message,status:response.status});
            
        } catch (err) {
                props.handleRegister({msg:err.message,status:err.response.status});
        }
        props.onHide();
    };
    const emailHandler = (ev) => {
        setRegisterData({...registerData,email : ev.target.value});
    };
    const passwordHandler = (ev) => {
        setRegisterData({...registerData,password : ev.target.value});
    };
    const confirmPasswordHandler = (ev) => {
        setRegisterData({...registerData,confirmPassword : ev.target.value});
    };
    return (
        <Modal show={props.show} onHide={props.onHide} >
        <Modal.Header className=" mx-3">
        <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body className=" mx-3">

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
        <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
        type="password"
        placeholder="Confirm password"
        onChange={confirmPasswordHandler}
        />
        </Form.Group>
        {registerData.password !== registerData.confirmPassword?
            <Alert variant="danger">Passwords are not the same</Alert>:null}
        <Button variant="primary" type="submit" onClick={register} disabled={registerData.password !== registerData.confirmPassword}>
        Register 
        </Button>

        </Form>
        </Modal.Body>
        </Modal>
    );
}

export default Register;
