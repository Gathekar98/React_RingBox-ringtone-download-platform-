import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <p>We could not find that page.</p>

      <Link to="/">Return Home</Link>
    </section>
  );
}

export default NotFound;