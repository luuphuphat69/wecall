import React from "react";
import "../toast/toast.css";
import {
    SuccessIcon,
    FailureIcon,
    WarningIcon,
    CloseIcon,
} from "../icon/icon";

const Toast = ({ message, type, onClose }) => {
    const iconMap = {
        success: <SuccessIcon />,
        failure: <FailureIcon />,
        warning: <WarningIcon />,
    };

    const toastIcon = iconMap[type] || null;

    return (
        <div className={`toast toast--${type}`} role="alert">
            <div className="toast-message">
                {toastIcon && (
                    <div className="icon icon--lg icon--thumb">{toastIcon}</div>
                )}
                <p style={{marginLeft:'15px'}}>{message}</p>
            </div>
            <button className="toast-close-btn" onClick={onClose}>
                <span className="icon">
                    <CloseIcon />
                </span>
            </button>
        </div>
    );
};

export default Toast;