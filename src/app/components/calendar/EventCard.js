import { Card } from "react-bootstrap"


export default function EventCard(props) {

    let description = props.event.description ? <> {props.event.description} <br></br> </> : null;
    let locationString = props.event.location ? <><i className="bi bi-pin-map-fill"></i> {props.event.location} <br></br> </> : null;

    return <>
        <Card className='my-1 '>
            <Card.Body>
                <Card.Title>
                    {props.event.summary}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {props.event.startDate.toJSDate().toLocaleTimeString("en-us", { hour: "numeric", minute: "2-digit" })}
                    -
                    {props.event.endDate.toJSDate().toLocaleTimeString("en-us", { hour: "numeric", minute: "2-digit" })}
                </Card.Subtitle>
                {description}
                {locationString}
            </Card.Body>

        </Card>

    </>

}