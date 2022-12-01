import {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import './App.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import Header from './components/Header'
import Footer from './components/Footer'
import WordInput from './components/WordInput'
import GuessesDisplay from './components/GuessesDisplay';

import {fetchChosenWordInfo} from './store/chosenWordReducer';

function App() {
  let isLoading=false;
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchLengthTrigger = async()=>{
            await dispatch(fetchChosenWordInfo());
        }
        fetchLengthTrigger();
    },[]);
  if (isLoading)  {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  
return (
  <Container className="d-flex min-vh-100 flex-column"
  style={{ maxWidth: "90%" }}>
    <Header />
    <GuessesDisplay />
    <WordInput />
    <Footer />
  </Container>
);
}

export default App;
