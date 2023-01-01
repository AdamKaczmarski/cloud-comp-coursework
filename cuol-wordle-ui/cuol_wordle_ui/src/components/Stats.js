import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
const Stats = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [userStats, setUserStats] = useState({});
  const [globalStats, setGlobalStats] = useState({});
  const fetchUserStats = useCallback(async () => {
        const url = process.env.REACT_APP_SERVER_URL;
    try {
      const response = await axios({
        method: "GET",
        url: `/cuol_wordle/user_stats`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUserStats(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [token]);
  const fetchGlobalStats = useCallback(async () => {
        const url = process.env.REACT_APP_SERVER_URL;
    try {
      const response = await axios({
        method: "GET",
        url: `/cuol_wordle/global_stats`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setGlobalStats(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [token]);
  useEffect(() => {
    fetchUserStats();
    fetchGlobalStats();
  }, [fetchGlobalStats, fetchUserStats]);
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header className=" mx-3">
        <Modal.Title>Statistics</Modal.Title>
      </Modal.Header>
      <Modal.Body className=" mx-3">
        <h3>User</h3>
        <Row>
          {userStats
            ? Object.keys(userStats).map((key, idx) => {
                let capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                capitalizedKey = capitalizedKey.replace("_", " ");
                return (
                  <Row key={idx}>
                    <Col>{capitalizedKey}</Col>
                    <Col>{userStats[key]}</Col>
                  </Row>
                );
              })
            : null}
          {userStats ? (
            <Row>
              <Col>Winrate</Col>
              <Col>{(userStats.games_won / userStats.games_played) * 100}%</Col>
            </Row>
          ) : null}
        </Row>
        <hr />
        <h3>Global</h3>
        <Row>
          {globalStats
            ? Object.keys(globalStats).map((key, idx) => {
                let capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
                capitalizedKey = capitalizedKey.replace("_", " ");
                return (
                  <Row key={idx}>
                    <Col>{capitalizedKey}</Col>
                    <Col>{globalStats[key]}</Col>
                  </Row>
                );
              })
            : null}
          {globalStats ? (
            <>
            <Row>
              <Col>Total Winrate</Col>
              <Col>{(globalStats.total_won / globalStats.total_games)*100}%</Col>
            </Row>
            <Row>
              <Col><b> Today's Winrate</b></Col>
              <Col><b>{(globalStats.today_won / globalStats.today_played) * 100}%</b></Col>
            </Row>
            </>
          ) : null}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default Stats;
