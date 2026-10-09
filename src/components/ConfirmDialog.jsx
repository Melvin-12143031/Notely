
import { useEffect, useRef } from "react"

import Button from "./Button"

const ConfirmDialog = ({
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    confirmDisabled = false,
}) => {

    const cancelButtonRef = useRef(null);

    useEffect(() => {
        cancelButtonRef.current?.focus();
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onCancel()
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [onCancel]);


    return (
        <div
            className="dialog-backdrop"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    e.preventDefault();
                }
            }}
        >
            <div
                className="confirm-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="dialog-title"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 id="dialog-title">{title}</h2>
                <p>{message}</p>

                <div className="dialog-actions">
                    <Button
                        ref={cancelButtonRef}
                        variant="secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        onClick={onConfirm}
                        disabled={confirmDisabled}
                    >
                        {confirmText}
                    </Button>
                </div>

            </div>

        </div>
    )
}

export default ConfirmDialog
