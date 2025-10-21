import { Col, Container, Row, Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useCalendarStore } from "@/app/store/CalendarStore";
import EventCard from "./EventCard";


export default function Calendar() {

    const [currentDate, setCurrentDate] = useState(new Date(Date.now()))

    const events = useCalendarStore((state) => state.events);
    const setCurrentDayEvents = useCalendarStore((state) => state.setCurrentDayEvents);

    const pastDate = new Date(currentDate)
    pastDate.setTime(pastDate.getTime() - 864e5);


    const futureDate = new Date(currentDate)
    futureDate.setTime(futureDate.getTime() + 864e5);

    const keyDate = new Date(currentDate);
    keyDate.setHours(0, 0, 0, 0);

        let dayEvents = undefined;

    if (events != null) {
        dayEvents = events[keyDate.getTime()];

    }


    queueMicrotask(() => {
        setCurrentDayEvents(dayEvents);
    });


    let dayEventsElement = <strong>No events for today!</strong>
    let createCalendar = (events) => {
        events = events.sort((a, b) => { return a.startDate.toJSDate() > b.startDate.toJSDate() });

        let grid = [[events[0]]];
        let lastEvent = null;

        for (let i = 1; i < events.length; i++) {
            let lastRow = grid[grid.length - 1];
            if (lastRow[0].endDate.toJSDate() > events[i].startDate.toJSDate()) {
                grid[grid.length - 1].push(events[i])
            } else {
                grid.push([events[i]])
            }
        }

        let rows = [];

        for (let i = 0; i < grid.length; i++) {

            let row = grid[i];
            let cols = [];
            for (let col of row) {
                cols.push(<Col>
                    <EventCard event={col} key={col.uuid}></EventCard>
                </Col>)
            }

            rows.push(<Row key={"row" + i}>
                {cols}
            </Row>)
        }
        return rows
    }

    if (dayEvents != undefined) {
        dayEventsElement = createCalendar(dayEvents)
    }

    return <>
        <Row>
            <InputGroup className="text-center">
                <Button onClick={(e) => setCurrentDate(pastDate)}> Past Date</Button>
                <InputGroup.Text>{currentDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</InputGroup.Text>
                <Button onClick={(e) => setCurrentDate(futureDate)}> Next Date</Button>
            </InputGroup>
        </Row>

        <Row>
            <h5>Events:</h5>
            {dayEventsElement}

        </Row>
    </>

}