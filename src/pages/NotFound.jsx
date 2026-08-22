import {
  Link,
} from "react-router-dom";

function NotFound() {
  return (
    <>
      <title>
        Page Not Found | RingBox
      </title>

      <meta
        name="robots"
        content="noindex"
      />
      <section className="section">

        <div className="container">

          <h1 className="section-title">
            404
          </h1>

          <p className="section-description">
            We couldn't find that
            page.
          </p>

          <div
            style={{
              marginTop:
                "20px",
            }}
          >
            <Link to="/">
              Return Home
            </Link>
          </div>

        </div>

      </section>
    </>
  );
}

export default NotFound;