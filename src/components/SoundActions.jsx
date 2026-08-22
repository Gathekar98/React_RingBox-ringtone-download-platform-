import {
  useState,
} from "react";

import "./SoundActions.css";

function SoundActions({ sound }) {
  const [
    message,
    setMessage,
  ] = useState("");

  const showMessage =
    (text) => {
      setMessage(text);

      setTimeout(() => {
        setMessage("");
      }, 1800);
    };

  const handleDownload = () => {
    if (!sound.preview) return;

    const link =
      document.createElement("a");

    link.href = sound.preview;

    link.download =
      `${sound.title || "ringbox-sound"}.mp3`;

    document.body.appendChild(
      link
    );

    link.click();

    document.body.removeChild(
      link
    );
  };

  const handleCopyLink =
    async () => {
      const url =
        `${window.location.origin}/sound/${sound.id}`;

      try {
        await navigator.clipboard.writeText(
          url
        );

        showMessage(
          "Link copied"
        );
      } catch (error) {
        console.error(
          "Unable to copy link:",
          error
        );
      }
    };

  const handleShare =
    async () => {
      const url =
        `${window.location.origin}/sound/${sound.id}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: sound.title,
            text:
              `Listen to ${sound.title} on RingBox`,
            url,
          });
        } catch (error) {
          if (
            error.name !==
            "AbortError"
          ) {
            console.error(
              "Unable to share:",
              error
            );
          }
        }

        return;
      }

      handleCopyLink();
    };

  return (
    <div>
      <div className="sound-actions">

        <button
          type="button"
          onClick={
            handleDownload
          }
          disabled={
            !sound.preview
          }
        >
          ↓ Download
        </button>

        <button
          type="button"
          onClick={
            handleShare
          }
        >
          Share
        </button>

        <button
          type="button"
          onClick={
            handleCopyLink
          }
        >
          Copy Link
        </button>

      </div>

      {message && (
        <p className="sound-actions__message">
          {message}
        </p>
      )}
    </div>
  );
}

export default SoundActions;