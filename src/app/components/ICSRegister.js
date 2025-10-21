'use client';
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useCalendarStore } from "../store/CalendarStore";
import Backend from "../api/Backend";

/**
 * This is the main screen of the app that appears when you need to register a calendar URL.
 */
export default function ICSRegister() {
    const setUrl = useCalendarStore((state) => state.setUrl);

    const [compUrl, setCompUrl] = useState("")
    const [validationErrors, setValidationErrors] = useState("")

    const validateURL = async () => {
        try {
            const icsData = Backend.fetchICS(compUrl)
            setUrl(compUrl)
        } catch (err) {
            setValidationErrors(err.toString());
        }
    }

    return (
        <>
        <a href="https://andygrace.space"> back to my space </a>
        <Container fluid className="my-5">
  <h1 className="text-center"> Natural Language Calendar </h1>
            <h4 className="text-center"> Help schedule your day and maximize your throughput.</h4>

        </Container>
          
            <Row>
                <Col md="12" lg="6">
                    <Container fluid className="rounded-4 shadow-lg p-5 my-5">
                        <h4>Help</h4>
                        <h5>What does this tool do?</h5>
                        This tool allows you to schedule your day using natural language. Instead of manually creating events, you can ask the assistant to schedule one.
                        <h5>How does it work?</h5>
                        First, you need to connect this to your calendar. You can do this for any calendar provider that publishes an ICS file for your calendar.<br></br>
                        <a href="https://support.google.com/calendar/answer/37648?hl=en#zippy=%2Cget-your-calendar-view-only">Gmail calendar ICS files.</a> &nbsp; &nbsp;
                        <a href="https://outlook.live.com/mail/0/options/calendar/SharedCalendars">Outlook Shared Calendars</a> <br>
                        </br>
                        Then, you can copy the URL and put it into the form on this page.
                        <h5>Is it private?</h5>
                        Yes. I do not use request logging. Your calendar data will be shared with HuggingFace, the inference provider for this service, but neither they nor I will look at any data you send to this application.
                        <br></br>
                        Then, you can copy the URL and put it into the form on this page.
                        <h5>Can I modify my calendar?</h5>
                        No. This is read-only as of now.
                    </Container>
                </Col>
                <Col md="12" lg="6">
                    <Container fluid  className="rounded-4 shadow-lg p-5 my-5">
                        <h4>Demo</h4>
                        Enter your calendar ICS URL.

                        <Form.Control
                            type="url"
                            id="calendarUrlInput"
                            aria-describedby="calendarUrlHelpBlock"
                            onChange={(e) => { console.log(e.target.value); setCompUrl(e.target.value) }}
                        />
                        <Form.Text id="calendarUrlHelpBlock" muted>
                            Must be an ICS link.
                        </Form.Text>
                        <br></br>

                        <Button type="submit" onClick={(e) => validateURL()}>Continue</Button>

                        {validationErrors}
                    </Container>
                </Col>

            </Row>





        </>
    )
}


