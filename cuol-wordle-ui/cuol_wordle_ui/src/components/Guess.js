import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Letter from './Letter';
const Guess = (props) => {
    const guess = useSelector((state) => state.guesses.guessesDone[props.displayIdx]);
    const [letters,setLetters] = useState([]);
    useEffect(()=>{
        if (guess){
            const tmp =[]
            const dummyArrayForIndexSort =[]
            for(let l in guess){
                const dummyObj = {...guess[l],letter:l}
                dummyArrayForIndexSort.push([dummyObj,guess[l].index])
            }
            dummyArrayForIndexSort.sort((a,b)=>a[1]-b[1])

            for(let i =0;i<dummyArrayForIndexSort.length;++i){
                const letter = dummyArrayForIndexSort[i][0]
                tmp.push(<Letter letter={letter.letter} key={letter.letter+letter.index} isCorrectPosition={letter.isCorrectPosition} isInTheWord={letter.isInTheWord}/>)
            }
            setLetters(()=>tmp);
        }
    },[guess,setLetters]);

    if (!guess) {
        return (
            <Row className="justify-content-md-center my-3">
                {Array(props.length).fill(<Letter letter={null}/>)}          
            </Row>
    )}
    return(
        <Row className="justify-content-md-center my-3">
            {letters}
        </Row>
    )
}

export default Guess;