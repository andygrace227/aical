import ChatBubble from "../ChatBubble/ChatBubble";
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import "./ChatContainer.css";
import { useState, useRef, useEffect } from "react";
import { useCalendarStore } from "@/app/store/CalendarStore";
import BusinessLogic from "@/app/api/BusinessLogic";


function ChatContainer(props) {
  const [chats, setChats] = useState([]);
  const chatRef = useRef(new Array());
  const wasPressedRef = useRef(false);
  const textAreaRef = useRef(null);
  const backendRef = useRef(props.backend)
  const scheduleStringRef = useRef("");
  const businessLogic = new BusinessLogic(backendRef.current)
  const setCurrentPlannedEvents = useCalendarStore((state) => state.setCurrentPlannedEvents);

  function setLoading() {
    chatRef.current = [...chatRef.current, { text: "", isUserText: false, isTyping: true }];
    setChats(chatRef.current);
  }

  function setNotLoading() {
    chatRef.current = chatRef.current.filter((chat) => chat["isTyping"] != true);
    setChats(chatRef.current);
  }

  let chatElements = chatRef.current.map((e) => {
    return new ChatBubble(e);
  });

  let chatBox = (
    <Form.Control
      ref={textAreaRef}
      as="textarea"
      className="resizeNone"
      rows={3}
      placeholder="Press ⌘ + Enter to send a message..."
    ></Form.Control>
  );

  async function sendChat() {
    const currentEvents = useCalendarStore.getState().currentDayEvents;
    const plannedEvents = useCalendarStore.getState().currentPlannedEvents;
    scheduleStringRef.current = "";

    if (textAreaRef.current.value == "") {
      return;
    }

    let input = textAreaRef.current.value;
    textAreaRef.current.value = "";

    let nextChats =  [
      ...chatRef.current,
      {
        isUserText: true,
        text: input,
      },
    ];

    chatRef.current = nextChats;
    setChats(nextChats);
    setLoading();

    console.log(currentEvents)

    let llmMessages = nextChats.map((chat) => {
      return {
        role: chat.isUserText == true ? "user" : "assistant",
        content: chat.text,
        type: "text"
      };
    });


    const chatCallbackFunction = (messageFromLLM) => {
      console.log(messageFromLLM)
      chatRef.current = [...nextChats, { text: messageFromLLM, isUserText: false }];
      setChats([...chatRef.current]);
    }

    const setPlannedEventsFunction = (scheduledEventsArray) => {
        queueMicrotask(() => {
          setCurrentPlannedEvents(scheduledEventsArray);
        });
    }

    try {
      businessLogic.sendMessage(
        llmMessages,
        currentEvents,
        plannedEvents,
        chatCallbackFunction,
        setPlannedEventsFunction
      )
    } catch (err) {
      textAreaRef.current.value = input;
    }
  }

  useEffect(() => {
    textAreaRef.current.addEventListener("keydown", (e) => {
      if (
        (e.getModifierState("Meta") || e.getModifierState("Control")) &&
        e.key == "Enter" &&
        wasPressedRef.current == false
      ) {
        let f = () => sendChat();
        f();
        wasPressedRef.current = true;
      } else {
        wasPressedRef.current = false;
      }
    });
  });


  return (
    <div className="chatContainer">
      <Row className="chatElementsContainer">
        <Col></Col>
        {chatElements}
      </Row>
      <Row style={{ "marginLeft": "0px", "marginRight": "0px" }}>
        <Col xs='12' style={{ "padding": "0px" }}>
          <InputGroup>
            {chatBox}
            <Button className="sendButton" onClick={(e) => sendChat()} variant="mine">
              SEND
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
}

export default ChatContainer;
