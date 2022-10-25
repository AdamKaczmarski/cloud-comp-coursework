import Col from "react-bootstrap/Col";
const Letter = (props) => {
  return (
    <Col md={1} className="mx-1 justify-content-center align-center" style={{ border: "1px solid #ccc", borderRadius: "16px", maxWidth:"5vh", maxHeight:"5vh",minHeight:"5vh" }}>
      <p className="p-1 text-center m-0">{props.letter}</p>
    </Col>
  );
};

export default Letter;
