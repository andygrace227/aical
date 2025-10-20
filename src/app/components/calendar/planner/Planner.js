import ChatContainer from "./chat/ChatContainer/ChatContainer";
import { useCalendarStore } from "@/app/store/CalendarStore";
import { Row, Col } from "react-bootstrap";
import TentativeEventCard from "../TentativeEventCard";
import Backend from "@/app/api/Backend";



export default function Planner() {

    let currentPlannedEvents = useCalendarStore((state) => state.currentPlannedEvents)
    let backend = new Backend();
    let eventElements = []

    for (let i = 0; i < currentPlannedEvents.length; i++) {
        let event = currentPlannedEvents[i]
        eventElements.push(
            <TentativeEventCard event={event} key={"tentativeEvent" + i} />
        )
    }


    return <>

        <Row><Col><ChatContainer backend={backend} ></ChatContainer>
        </Col></Row>
        <Row>
            <Col>
                <h2>Tentative Events</h2><br>
                </br>

                {eventElements}
            </Col>
        </Row>
    </>
}