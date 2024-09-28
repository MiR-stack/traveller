import { IoCloseOutline } from "react-icons/io5";
import Backdrop from "./backdrop";
import "@/styles/components/utils/modal.scss";

const Modal = ({
  handleClose,
  children,
}: {
  handleClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="modal">
      <Backdrop onClick={handleClose} />
      <div className="modal__content">
        <IoCloseOutline className="modal__close" onClick={handleClose} />
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
