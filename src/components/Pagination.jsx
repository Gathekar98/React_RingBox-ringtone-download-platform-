import "./Pagination.css";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">

      <button
        type="button"
        onClick={goToPrevious}
        disabled={currentPage === 1}
      >
        ← Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        onClick={goToNext}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>

    </div>
  );
}

export default Pagination;