const Button = ({children, ...rest}: {children: any}) => (
    <button className="text-[#efeff1] bg-[#9147ff] hover:bg-[#772ce8] text-sm font-semibold rounded-sm text-sm px-2 py-1" {...rest}>{children}</button>
);

export default Button;