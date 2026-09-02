
const Button = ({ children, className, onClick, type = "button", disabled = false }) => {
    return (
        <>
            <div className="text-center">
                <button type={type} disabled={disabled} onClick={onClick} className={`${className} text-white text-center font-medium bg-black cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}>
                    {children}
                </button>
            </div>
        </>
    );
};

export default Button;

