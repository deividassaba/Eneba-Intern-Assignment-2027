
import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react";

interface MessageContextType {
    message: string | null;
    showError: (message: string) => void;
    showMessage: (message: string) => void;
    clear: () => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export function MessageProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState<string | null>(null);
    const [status, setStatus] = useState<string>("");

    const showError = (message: string) => {
        setMessage(message);
        setStatus("error");
    };
    const showMessage = (message: string) => {
        setMessage(message);
        setStatus("success");
    };
    const clear = () => {
        setMessage(null);
        setStatus("");
    };

    return (
        <MessageContext.Provider value={{ message, showError,showMessage, clear }}>
            {children}

            {message && (
                <div className={"global-message "+status} role="alert">
                    <span>{message}</span>
                    <button onClick={clear} aria-label="Close error">
                        &times;
                    </button>
                </div>
            )}
        </MessageContext.Provider>
    );
}

export function useMessage() {
    const context = useContext(MessageContext);

    if (!context) {
        throw new Error("useMessage must be used within MessageProvider");
    }

    return context;
}
