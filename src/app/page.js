'use client'

import { Col, Container, Row, Form, Button } from "react-bootstrap";
import ICSRegister from "./components/ICSRegister";
import { useCalendarStore } from "./store/CalendarStore";
import { useEffect, useState } from "react";
import CalendarRootView from "./components/calendar/CalendarRootView";


export default function Home() {

  const refresh = useCalendarStore((state) => state.refresh);
  const loadFromStorage = useCalendarStore((state) => state.loadFromStorage);

  const [refreshHack, setRefreshHack] = useState(0);

  const icalURL = useCalendarStore((state) => state.icalURL);

  useEffect(() => {
    loadFromStorage();
    refresh();
    setRefreshHack(!refreshHack);
  }, []);

  //let view  = <CalendarRootView/>;
  let view = <ICSRegister></ICSRegister>
  if (icalURL) {
    view = <CalendarRootView/>
  }

  return (
    <>
      <Row className='my-5 mx-3'>
        <Col>
          {view}
        </Col>
      </Row>
    </>
  );
}
