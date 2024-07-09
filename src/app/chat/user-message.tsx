export interface Message {
    name: string;
    color: string;
    message: string;
};

const UserMessage = ({name, color, message}: Message) => (
    <div className="inline-block">
        <strong style={{color: `${color}`}}>{name}</strong><span className="text-slate-200">: {message}</span>
    </div>
);

export default UserMessage;