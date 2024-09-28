import Modal from "@/components/utils/modal";
import "@/styles/components/shared/alert.scss";

interface AlertProps {
  message: string;
  status: "success" | "error";
  handleClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, status, handleClose }) => {
  return (
    <Modal handleClose={handleClose}>
      <div className="modal-alert">
        <div className={`modal-alert__icon modal-alert__icon--${status}`}>
          {status === "success" ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <p className="modal-alert__message">{message}</p>
      </div>
    </Modal>
  );
};

export default Alert;
