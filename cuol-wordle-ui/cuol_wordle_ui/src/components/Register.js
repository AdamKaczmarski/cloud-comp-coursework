import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useDispatch } from "react-redux";
import {setToken} from "../store/authReducer";
const Register= (props) =>{
    const dispatch = useDispatch();
    const registerData = {
        email: "",
        password: "",
    };

    const register= async (ev) => {
        ev.preventDefault();
        const url = process.env.REACT_APP_SERVER_URL;
        try {
            const response = await axios({
                method: "POST",
                url: `${url}/auth/register/`,
                data: registerData,
            });
                props.handleRegister({msg:response.data.message,status:response.status});
            
        } catch (err) {
                props.handleRegister({msg:err.message,status:err.response.status});
        }
        props.onHide();
    };
    const emailHandler = (ev) => {
        registerData.email = ev.target.value;
    };
    const passwordHandler = (ev) => {
        registerData.password = ev.target.value;
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
        <Button variant="primary" type="submit" onClick={register}>
        Register 
        </Button>
        </Form>
        </Modal.Body>
        </Modal>
    );
}

export default Register;
