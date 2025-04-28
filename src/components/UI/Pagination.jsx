import { useState } from 'react';
import { Children } from 'react';

export default function Pagination({
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
  paginatingItemsClassNames,
  pageSize = 10,
  children,
  isDataFromServer = false,
  maxButtonItemDisplay = 5,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = Children.count(children);
  const totalPages = Math.ceil(totalItems / pageSize);

  let paginatedItems = null;
  if (isDataFromServer) {
    paginatedItems = children;
  } else {
    paginatedItems = Children.toArray(children).slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize,
    );
  }

  function handleSetPage(page) {
    setCurrentPage(page);
  }

  function handleNextPage() {
    if (!isLastPage) {
      setCurrentPage((currentPage) => currentPage + 1);
      onNextPage();
    }
  }

  function handlePrevPage() {
    if (!isFirstPage) {
      setCurrentPage((currentPage) => currentPage - 1);
      onPreviousPage();
    }
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const paginationButtonClasses =
    'cursor-pointer py-2 px-1 hover:text-stone-400 ';
  const disabledClasses = 'cursor-not-allowed! text-stone-300!';

  return (
    <>
      <div className={paginatingItemsClassNames}>{paginatedItems}</div>

      <div className='mt-6 flex'>
        <ul className='mx-auto flex justify-center gap-2 rounded-full border border-stone-500 bg-stone-100/5 px-4 shadow backdrop-blur-md'>
          {/* <li>
            <button
              onClick={() => setCurrentPage(1)}
              className={`${paginationButtonClasses} ${isFirstPage && disabledClasses}`}
            >
              First
            </button>
          </li> */}
          <li>
            <button
              onClick={handlePrevPage}
              className={`${paginationButtonClasses} ${isFirstPage && disabledClasses}`}
            >
              &lt; Prev
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, idx) => (
            <li key={idx}>
              <button
                className={paginationButtonClasses}
                onClick={() => handleSetPage(idx + 1)}
              >
                {idx + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleNextPage}
              className={`${paginationButtonClasses} ${isLastPage && disabledClasses}`}
              disabled={isLastPage}
            >
              Next &gt;
            </button>
          </li>
          {/* <li>
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`${paginationButtonClasses} ${isLastPage && disabledClasses}`}
              disabled={isLastPage}
            >
              Last
            </button>
          </li> */}
        </ul>
      </div>
    </>
  );
}
