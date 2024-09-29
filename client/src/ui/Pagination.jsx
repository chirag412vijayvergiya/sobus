import { useSearchParams } from 'react-router-dom';
// import { PAGE_SIZE } from '../utils/constants';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const PAGE_SIZE = 5;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between text-grey-800 dark:text-gray-50">
      <p className="ml-[0.8rem] text-sm">
        Showing{' '}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}{' '}
        </span>
        to{' '}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        of <span className="font-semibold">{count}</span> results
      </p>
      <div className="flex gap-2">
        <button
          className="not-disabled flex items-center justify-center gap-[0.3rem] rounded-sm border-none bg-transparent p-[0.2rem_0.3rem] text-sm font-semibold tracking-widest text-inherit transition-all hover:bg-brand-600 hover:text-brand-50 active:bg-indigo-600 active:text-grey-100"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft strokeWidth="2" />{' '}
          <span className="pr-[0.4rem]">Previous</span>
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="flex items-center justify-center gap-[0.3rem] rounded-sm border-none bg-transparent p-[0.2rem_0.4rem] text-sm font-semibold tracking-widest text-inherit transition-all hover:bg-brand-600 hover:text-brand-50 active:bg-indigo-600 active:text-grey-100"
        >
          <span className="pl-[0.4rem]">Next</span>
          <HiChevronRight strokeWidth="2" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
