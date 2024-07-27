import Card from "./core/styled/card";
import UserMessage, { Message } from "./user-message";
import ChatPlaceholder from "./chat-placeholder";

const Chat = ({
  messages,
  channelName = "",
}: {
  messages: Message[];
  channelName?: string;
}) => (
  <Card title="Chat">
    {messages.length > 1 ? (
      <>
        {messages.map(({ name, color, message }, i) => (
          <div key={i}>
            <UserMessage name={name} color={color} message={message} />
          </div>
        ))}
      </>
    ) : (
      <>
        {channelName ? (
          <ChatPlaceholder />
        ) : (
          <p className="text-sm font-medium animate-pulse">
            Enter a channel name to begin!
          </p>
        )}
      </>
    )}
  </Card>
);

export default Chat;
