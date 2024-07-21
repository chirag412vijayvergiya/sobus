import { useRef, useState, useEffect } from 'react';
import Button from '../Button';
import ProjectCard from '../ProjectCard';

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [rowHeight, setRowHeight] = useState(0);
  const containerRef = useRef(null);
  const itemRef = useRef(null); // Ref to get the height of one row

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

  useEffect(() => {
    // Calculate the height of one row after the first item renders
    if (itemRef.current) {
      setRowHeight(itemRef.current.clientHeight);
    }
  }, []);

  const handleClick = () => {
    setShowAll(!showAll);
    if (containerRef.current && rowHeight > 0) {
      containerRef.current.scrollBy({
        top: rowHeight, // Scroll by one row height
        behavior: 'smooth',
      });
    }
  };

  const visibleItems = showAll ? data : data.slice(0, 6);

  return (
    <div id="projects-section">
      <div className="min-w-screen relative flex min-h-[calc(100vh-90px)] overflow-hidden bg-green-100 bg-cover dark:bg-gray-900">
        <div className="rotate-150 bg-blue-00 absolute -bottom-5 -left-11 hidden h-80 w-80 rounded-full bg-blue-400 opacity-40 blur-[120px] dark:bg-blue-800 dark:opacity-30 md:block"></div>
        <div className="absolute -top-2 right-0 hidden h-80 w-80 rounded-full bg-green-400 opacity-40 blur-[120px] dark:bg-green-600 dark:opacity-20 md:block"></div>
        <div className="mx-auto w-full p-4 pb-0 text-center sm:p-8">
          <h1
            className="mb-4 font-mono text-2xl font-semibold tracking-wider text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 hover:dark:text-indigo-300"
            style={{ textUnderlineOffset: '4px' }}
          >
            PROJECTS
          </h1>
          <div
            className="mb-4 grid grid-cols-1 gap-3 overflow-y-auto p-2 sm:grid-cols-2 sm:p-4 lg:grid-cols-3"
            style={{ maxHeight: '500px' }} // Adjust height as needed
            ref={containerRef}
          >
            {visibleItems.map((item, index) => (
              <div ref={index === 0 ? itemRef : null} key={item.id}>
                <ProjectCard color="custom-gradient-green" elements={item} />
              </div>
            ))}
          </div>
          <Button
            type="reset"
            onClick={handleClick}
            className="mt-4 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-300"
          >
            {showAll ? 'View Less' : 'View More'}
          </Button>
          <div className="mt-6 border-b border-grey-200 dark:border-grey-600"></div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
