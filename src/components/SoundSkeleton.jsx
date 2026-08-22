import "./SoundSkeleton.css";

function SoundSkeleton({
  count = 8,
}) {
  return (
    <div className="sound-grid">
      {Array.from({
        length: count,
      }).map((_, index) => (
        <div
          className="sound-skeleton"
          key={index}
        >
          <div className="sound-skeleton__wave" />

          <div className="sound-skeleton__content">

            <div className="sound-skeleton__line sound-skeleton__line--title" />

            <div className="sound-skeleton__line sound-skeleton__line--small" />

            <div className="sound-skeleton__progress" />

            <div className="sound-skeleton__footer">
              <span />
              <span />
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default SoundSkeleton;