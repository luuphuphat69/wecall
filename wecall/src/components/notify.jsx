import React, { useState, useEffect } from "react";
import ToastList from '../components/toast_list/toast_list';

const Notify = ({ message, type }) => {

    const [toasts, setToasts] = useState([]);
    const [autoClose, setAutoClose] = useState(true);
    const [autoCloseDuration, setAutoCloseDuration] = useState(5);
    const [position, setPosition] = useState("bottom-right");

    useEffect(() => {
        // show toast notify
        const toast = {
            id: Date.now(),
            message,
            type,
        };

        setToasts((prevToasts) => [...prevToasts, toast]);

        if (autoClose) {
            setTimeout(() => {
                removeToast(toast.id);
            }, autoCloseDuration * 1000);
        }

        // Cleanup function to remove the toast on component unmount
        return () => {
            removeToast(toast.id);
        };

    }, [autoClose, autoCloseDuration]);

    const removeToast = (id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <ToastList data={toasts} position={position} removeToast={removeToast} />
    );
}

export default Notify;