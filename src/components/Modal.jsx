import "../styles/modal.css";

function Modal(props) {
    const { className, open, children, ...childProps } = props;
    return (
        open && (
            <dialog className={`modal ${className||''}`} open={open}>
                <div className="modal__inner">
                    {children}
                </div>
            </dialog>
        )
    );
}

export default Modal;