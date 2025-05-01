import { useState, useEffect } from "react";
import { MessageType } from "../types/types";

export const useToast = () => {
  const [message, setMessage] = useState<MessageType>({
    text: "",
    type: null,
  });
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (message.text) {
      setToastVisible(true);

      const timer = setTimeout(() => {
        setToastVisible(false);

        const clearTimer = setTimeout(() => {
          setMessage({ text: "", type: null });
        }, 300);

        return () => clearTimeout(clearTimer);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return { message, setMessage, toastVisible };
};
