export interface Message {
    name: string;
    color: string;
    message: string;
};

const UserMessage = ({name, color, message}: Message) => (
    <div className="inline-block">
        <strong style={{color: `${color}`}}>{name}</strong><span className="text-[#e5e3e8]">: {message}</span>
    </div>
);

export default UserMessage;