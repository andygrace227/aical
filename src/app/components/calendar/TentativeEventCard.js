import { Card, Button } from "react-bootstrap"
import { useState } from "react";


export default function TentativeEventCard(props) {

    const [name, setName] = useState(props.event.name);
    const [endTime, setEndTime] = useState(props.event.endTime);
    const [startTime, setStartTime] = useState(props.event.startTime);
    const [location, setLocation] = useState(props.event.startTime);
    const [description, setDescription] = useState(props.event.description);
    const [locked, setLocked] = useState(false)
    const [editMode, setEditMode] = useState(false)

    let locationString = props.event.location ? <><i className="bi bi-pin-map-fill"></i> {location} <br></br> </> : null;

    return <>
        <Card className='my-1 '>
            <Card.Body>
                <Card.Title>
                    {name}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {startTime}
                    -
                    {endTime}
                </Card.Subtitle>
                {description}
                {locationString}
                <br>
                </br>
                <Button>
                    {locked ? <><i class="bi bi-unlock"></i>&nbsp;Unlock</> : <><i class="bi bi-lock-fill"></i>&nbsp;Lock</>}
                </Button>
                &nbsp;
                <Button>
                    {editMode ? <i class="bi bi-floppy-fill"></i> : <><i class="bi bi-pencil-fill"></i>&nbsp;Edit</>}
                </Button>
                &nbsp;
                <Button>
                    <i class="bi bi-arrow-right-square-fill"></i> Confirm
                </Button>
            </Card.Body>
        </Card>
    </>
}