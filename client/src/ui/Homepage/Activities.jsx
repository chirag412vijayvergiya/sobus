import { useState, useRef, useEffect } from 'react';
import ActivityCard from '../ActivityCard';
import { useGetAllActivities } from './useGetAllActivities';
import SpinnerMini from '../SpinnerMini';

function Activities() {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null);
  const firstItemRef = useRef(null);
  const [rowHeight, setRowHeight] = useState(0);
  const { isPending, activities } = useGetAllActivities();

  useEffect(() => {
    if (firstItemRef.current) {
      setRowHeight(firstItemRef.current.clientHeight);
    }
  }, []);

  if (isPending) return <SpinnerMini />;

  const handleClick = () => {
    setShowAll(!showAll);
    if (containerRef.current && rowHeight > 0) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollTop + rowHeight,
        behavior: 'smooth',
      });
    }
  };

  const visibleItems = showAll ? activities : activities.slice(0, 6);

  return (
    <div
      id="home"
      className="mt-[90px] min-h-[calc(100vh-90px)] bg-green-100 dark:bg-slate-900 sm:mt-[4rem]"
    >
      <div className="min-w-screen relative flex w-full overflow-hidden md:min-h-[100vh]">
        <div className="rotate-150 absolute -left-11 top-0 z-[100] hidden h-80 w-80 rounded-full bg-blue-400 opacity-40 blur-[120px] dark:bg-blue-800 dark:opacity-30 md:block"></div>
        <div className="absolute bottom-0 right-0 z-[100] hidden h-80 w-80 rounded-full bg-green-400 opacity-40 blur-[120px] dark:bg-green-600 dark:opacity-20 md:block"></div>
        <div className="mx-auto w-full p-4 pb-0 text-center sm:p-8">
          <h1
            className="font-mono text-2xl font-semibold tracking-wider text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:dark:text-indigo-300"
            style={{ textUnderlineOffset: '4px' }}
          >
            ACTIVITIES
          </h1>
          <div
            className="mb-4 grid grid-cols-1 gap-3 overflow-y-auto p-2 sm:grid-cols-2 sm:p-4 lg:grid-cols-3"
            style={{ maxHeight: '510px' }}
            ref={containerRef}
          >
            {visibleItems.map((item, index) => (
              <ActivityCard
                key={item.id}
                color="custom-gradient-green"
                elements={item}
                ref={index === 0 ? firstItemRef : null}
              />
            ))}
          </div>
          <button
            type="reset"
            onClick={handleClick}
            className="p-small mx-auto flex items-center justify-center rounded-md bg-indigo-800 px-3 py-2 font-mono text-sm font-medium tracking-wider text-grey-50 dark:bg-slate-800 md:px-6"
          >
            {showAll ? 'View Less' : 'View More'}
          </button>
          <div className="mt-6 border-b border-grey-200 dark:border-grey-600"></div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
