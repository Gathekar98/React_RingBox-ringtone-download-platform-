import {
  useParams,
} from "react-router-dom";

function SoundDetails() {
  const { id } =
    useParams();

  return (
    <section className="section">

      <div className="container">

        <h1 className="section-title">
          Sound Details
        </h1>

        <p className="section-description">
          Sound ID: {id}
        </p>

      </div>

    </section>
  );
}

export default SoundDetails;