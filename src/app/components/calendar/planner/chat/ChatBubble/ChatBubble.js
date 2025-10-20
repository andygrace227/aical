import "./ChatBubble.css";
import Markdown from 'react-markdown';
function ChatBubble(props) {
  let text = "";
  let className = "chatBubble";
  if (props.text) {
    text = props.text;
  }

  if (props.isUserText) {
    className += " chatBubble-right";
  }

  if (props.isTyping) {
    className += " chatBubble-typing"
    text = <span style={{"display":"flex", "perspective":"200px"}}>
            <span className="chatBubble-bubble0">
            •
            </span>
            <span className="chatBubble-bubble1">
            •
            </span>
            <span className="chatBubble-bubble2">
            •
            </span>
        </span>;
    return <div className="chatBubble-container">
      <span className={className}>
        {text}
      </span>
      </div>



  }

  return (
    <div className="chatBubble-container">
      <span className={className}>
        <Markdown>
            {text}
        </Markdown>
        </span>
    </div>
  );
}

export default ChatBubble;
