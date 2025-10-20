
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Calendar from "./Calendar";
import Planner from "./planner/Planner";


export default function CalendarRootView() {
    return <>
            <a href="https://andygrace.space"> back to my space </a>
        <Row>
            <Col>
                <h1> AI Panel</h1>
                <Planner></Planner>
            </Col>
            <Col>
                <h1> Calendar Panel</h1>
                <Calendar />
            </Col>
        </Row>
    </>
}