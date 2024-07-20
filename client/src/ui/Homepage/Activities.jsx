import { useState } from 'react';
import ActivityCard from '../ActivityCard';
import Button from '../Button';

function Activities() {
  const isPending = false;
  const [showAll, setShowAll] = useState(false);

  const data = [
    { id: 1, content: 'Content 1' },
    { id: 2, content: 'Content 2' },
    { id: 3, content: 'Content 3' },
    { id: 4, content: 'Content 4' },
    { id: 5, content: 'Content 5' },
    { id: 6, content: 'Content 6' },
    { id: 7, content: 'Content 7' },
    { id: 8, content: 'Content 8' },
    { id: 9, content: 'Content 9' },
    { id: 10, content: 'Content 10' },
  ];

  const visibleItems = showAll ? data : data.slice(0, 6);
  return (
    <div
      id="home"
      className="mt-[90px] min-h-[calc(100vh-90px)] bg-green-100 dark:bg-slate-900 sm:mt-[4rem]"
    >
      <div className="min-w-screen relative flex w-full overflow-hidden md:min-h-[100vh]">
        <div className="rotate-150 absolute -left-11 top-0 z-[100] hidden h-80 w-80 rounded-full bg-blue-300 opacity-40 blur-[120px] dark:bg-blue-800 dark:opacity-30 md:block"></div>
        <div className="absolute bottom-0 right-0 z-[100] hidden h-80 w-80 rounded-full bg-green-200 opacity-40 blur-[120px] dark:bg-green-600 dark:opacity-20 md:block"></div>
        <div className="mx-auto w-full p-8 text-center">
          <h1
            className="font-mono text-2xl font-semibold tracking-wider text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:dark:text-indigo-300"
            style={{ textUnderlineOffset: '4px' }}
          >
            ACTIVITIES
          </h1>
          <div className="grid grid-cols-1 gap-3 overflow-scroll p-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <ActivityCard key={item.id} color="custom-gradient-green" />
            ))}
          </div>
          <Button
            type="reset"
            onClick={() => setShowAll(!showAll)}
            // className="mt-4 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-300"
          >
            {showAll ? 'View Less' : 'View More'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Activities;
