import './index.css';

export const ErrosFormLogin = ({error}) => {

    return (
        <>
            <div className="error-message">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-exclamation-circle-fill"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm.93-9.412-1 4A.5.5 0 0 1 7.5 10h-1a.5.5 0 0 1-.485-.625l1-4a.5.5 0 1 1 .97.25zM7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" />
                </svg>
                <span>{error}</span>
            </div>
        </>
    )
}