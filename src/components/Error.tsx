import { ErrorProps } from "../utils/interfaces";
import "../styles/error.css"
import parseErrorMessage from "../utils/error";

export default function Error({errorMessage}: ErrorProps) {


    return (
        <div className="main-div">
            {parseErrorMessage(errorMessage)}
        </div>
    )
}