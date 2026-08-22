import {
  Link,
} from "react-router-dom";

import "./EmptyState.css";

function EmptyState({
  icon = "♫",
  title,
  description,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="empty-state">

      <div className="empty-state__icon">
        {icon}
      </div>

      <h2>
        {title}
      </h2>

      <p>
        {description}
      </p>

      {actionLabel &&
        actionTo && (
          <Link
            to={actionTo}
            className="empty-state__action"
          >
            {actionLabel}
          </Link>
        )}

    </div>
  );
}

export default EmptyState;