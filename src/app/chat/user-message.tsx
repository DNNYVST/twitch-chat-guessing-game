const UserMessage = ({name, color, message}: {name: string, color: string, message: string}) => (
    <div className="inline-block">
        <strong style={{color: `${color}`}}>{name}</strong><span className="text-slate-200">: {message}</span>
    </div>
);

export default UserMessage;