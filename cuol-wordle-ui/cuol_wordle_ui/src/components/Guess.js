import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Letter from './Letter';
const Guess = (props) => {
    const guess = useSelector((state) => state.guesses.guessesDone[props.displayIdx]);
    if (!guess) {
        return (
            <Row className="justify-content-md-center my-3">
                {Array(props.length).fill(<Letter letter={" "}/>)}          
            </Row>
    )}
    const letters=[]
    for (let i =0;i<guess.length;i++){
        letters.push(<Letter letter={guess[i]} key={guess[i]+i}/>)
    }
    return(
        <Row className="justify-content-md-center my-3">
            {letters}
        </Row>
    )
}

export default Guess;