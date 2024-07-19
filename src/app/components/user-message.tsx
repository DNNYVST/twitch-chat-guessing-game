export interface Message {
  name: string;
  color: string;
  message: string;
}

const UserMessage = ({ name, color, message }: Message) => (
  <div className="inline-block text-sm font-medium">
    <strong style={{ color: `${color}` }}>{name}</strong>
    <span className="text-[#efeff1]">: {message}</span>
  </div>
);

export default UserMessage;
