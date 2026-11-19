import "./ErrorAlert.scss";

interface ErrorAlertProps {
    message: string;
    onClose?: () => void;
}

export default function ErrorAlert({ message, onClose }: ErrorAlertProps) {
    if (!message) return null;

    return (
        <div className="error-alert" role="alert">
            <span>{message}</span>

            {onClose && (
                <button onClick={onClose} aria-label="Close error">
                    &times;
                </button>
            )}
        </div>
    );
}