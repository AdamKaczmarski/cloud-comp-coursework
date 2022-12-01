import Col from "react-bootstrap/Col";
const Letter = (props) => {
  const {isCorrectPosition, isInTheWord} = props;
  let bgColor=""
  let bgColorText=""
  if (isInTheWord ){
    if (isCorrectPosition){
      //Green background
      bgColor="rgba(204,255,204,0.5)"
      bgColorText="rgba(204,255,204,0)"
      
    } else {
      //Orange-ish background
      bgColor="rgba(255,255,  153,0.5)"
      bgColorText="rgba(255,255,  153,0)"
    }
  
  } else if (isInTheWord !==undefined) { //Check if the isInTheWord is undefined to see whether we're displaying just empty letters (before the guess)
    //Paint the background gray-ish as the letter is not in the word
    bgColor="rgba(224,224,224,0.5)";
    bgColorText="rgba(224,224,224,0)";
  }
  return (
    <Col md={1} className="mx-1 justify-content-center align-center" style={{ border: "1px solid #ccc", borderRadius: "16px", maxWidth:"5vh", maxHeight:"5vh",minHeight:"5vh", backgroundColor:bgColor }}>
      {props.letter ? <p className="p-1 text-center m-0" style={{backgroundColor:bgColorText}}>{props.letter.toUpperCase()}</p> : null}
    </Col>
  );
};

export default Letter;
