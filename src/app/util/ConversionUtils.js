

export function toMinifiedFormat(events) {
    let minified = [];

    console.log(events?? 'undefined')

    try {
        for (let event of events) {
            console.log(event)
            let miniEvent = {
                "name" : event.summary,
                "startTime" : event.startDate.toJSDate().toLocaleTimeString("en-us", { hour: "numeric", minute: "2-digit" }),
                "endTime" : event.endDate.toJSDate().toLocaleTimeString("en-us", { hour: "numeric", minute: "2-digit" }),
                "location" : event.location,
                "description" : event.description,
            }
            minified.push(miniEvent)
        }
        console.log(minified)
    
        return minified;
    

    } catch (err) {
        return [];
    }

}