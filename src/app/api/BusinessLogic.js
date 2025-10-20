import { toMinifiedFormat } from "@/app/util/ConversionUtils";
import { parse, stringify } from 'yaml';


class BusinessLogic {

    constructor(backend){
        this.BACKEND = backend;
        this.TENETATIVE_PLANS = "TENTATIVE_PLANS";
    }


    getPrompt(currentEvents, plannedEvents) {
        return ` You are a scheduling assistant. You are designed to take in tasks and help the user schedule them in their schedule.
              Here are the user's confirmed events in YAML format: 
              \`\`\`
              ${stringify(toMinifiedFormat(currentEvents))}
              \`\`\`
              
              Here are the tentative plans so far: 
              \`\`\`
              ${stringify(toMinifiedFormat(plannedEvents))}
              \`\`\`
        
              Respond to the user in text form, and then write the tentative plans back. Don't indicate the text session with anything.
              If the user scheduled tentative plans, modify them and write them back in YAML format.
              You are to divide your response into a text section and a tentative plan section.
              Each message you send back should have ONLY ONE text section and tentative plan section.
              Seperate the sections with the phrase TENTATIVE_PLANS.
              The schema for an event is as follows:
              \`\`\`
              name: <string>
              startTime: <time in local time, such as 12:30PM>
              endTime: <time in local time, such as 12:30PM>
              location: <string>
              description: <string>
              \`\`\`
        
              The TENTATIVE_PLANS section should be a list of events. Do not make it a map.
              NO EVENTS ALREADY IN CONFIRMED PLANS SHOULD BE IN TENTATIVE PLANS.
        
              Failure to separate the sections like this will result in a bad user experience. You must follow the prescribed output format.`;
    }

    async sendMessage(messages, currentEvents, plannedEvents, chatCallbackFunction, plannedEventsSetFunction) {
        try {
            await this.BACKEND.streamText(
                this.getPrompt(currentEvents, plannedEvents),
                messages
            ).then(async (stream) => {
                if (typeof stream == 'string') {
                    console.error("An error was encountered while trying to stream a response from the server: ", stream);
                    throw new Error(stream);
                }
                let reader = stream.getReader();
                const decoder = new TextDecoder();
                let returnedMessage = "";
                while (true) {
                    const {done, value} = await reader.read();
                    if (done) {
                        break;
                    }
                    let nextToken = decoder.decode(value, { stream: true });
                    returnedMessage += nextToken;
                    chatCallbackFunction(returnedMessage.split(this.TENETATIVE_PLANS)[0]);
                }
                
                if (returnedMessage.split(this.TENETATIVE_PLANS).length == 2) {
                    let scheduleYAMLString = returnedMessage.split(this.TENETATIVE_PLANS)[1];
                    const parsedTentativeEventSchedule = parse(scheduleYAMLString)
                    plannedEventsSetFunction(parsedTentativeEventSchedule);
                }
            });
        } catch (err) {
            console.error("Issue occurred while generating scheudle: " + err);
            throw err;
        }
    }




}

export default BusinessLogic;