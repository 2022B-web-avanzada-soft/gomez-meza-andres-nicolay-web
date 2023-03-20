import Style from "./ModalStyle.module.css";

export const Modal = (props) => {
    const { title, children, onClose } = props;
    return (
        <div id="myModal" className={Style.modal}>
            <div className={Style["modal-content"]}>
        <span className={Style.close} onClick={onClose}>
          &times;
        </span>
                <div className="text-center text-violet-800 text-2xl">
                    <h2>{title}</h2>
                </div>
                {children}
            </div>
        </div>
    );
};