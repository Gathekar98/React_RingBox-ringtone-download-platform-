import { useParams } from "react-router-dom";

function SoundDetails() {
    const {id} = useParams();
    return(
        <section>
            <h1>Sound Details</h1>
            <p>Sound ID : {id}</p>
        </section>
    );
}
export default SoundDetails;