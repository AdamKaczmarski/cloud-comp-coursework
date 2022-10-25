import Row from 'react-bootstrap/Row';
import Letter from './Letter';
const Guess = (props) => {
    return (
        <Row className="justify-content-md-center my-3">
            {props.empty ? Array(props.length).fill(<Letter letter={" "} />):
            "HOUSE"}          
        </Row>
    )
}

export default Guess;