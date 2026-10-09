
import Button from "./Button";
const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="error-message">
            <h2>Something went wrong   </h2>
            <p>
                {message}
            </p>

            {onRetry && (
                <Button
                    variant="secondary"    
                    onClick={onRetry}
                >
                    Try Again
                </Button>
            )}
        </div>
    )
}

export default ErrorMessage
