import { IoMdCalendar } from 'react-icons/io';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { format } from 'date-fns';
import { MdLocationPin } from 'react-icons/md';
import { useEffect, useState } from 'react';

function ActivityDataBox({ activity }) {
  const [status, setStatus] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // Extracting the date part from activityStartDate and activityEndDate
      const startDate = activity.activityStartDate.split('T')[0];
      const endDate = activity.activityEndDate.split('T')[0];

      // Extracting start and end times from activityTime
      const [startTime, endTime] = activity.activityTime.split(' - ');

      // Creating full Date objects for start and end times
      // Note: Assuming the time is in the local timezone, so no need for 'Z'
      const startDateTime = new Date(`${startDate}T${startTime}:00`);
      const endDateTime = new Date(`${endDate}T${endTime}:00`);

      if (now < startDateTime) {
        const timeDiff = startDateTime - now;
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setStatus('Event starts in');
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else if (now >= startDateTime && now <= endDateTime) {
        setStatus('Event is live now');
        setTimeRemaining('');
      } else {
        setStatus('Event has ended');
        setTimeRemaining('');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activity]);

  return (
    <div className="my-[3vh] overflow-hidden rounded-xl border-[1px] border-solid border-grey-200 bg-grey-100 dark:border-slate-800 dark:bg-slate-900">
      <header className="flex flex-col items-center justify-between bg-indigo-500 p-[0.7rem_0.1rem] text-2xl font-medium text-slate-300 md:flex-row md:p-[1rem_2rem]">
        <div className="flex items-center gap-2 text-xl font-semibold md:gap-6 md:text-2xl">
          <IoMdCalendar />
          <p>
            <span className="pr-2 text-base uppercase md:pr-4 md:text-lg">
              Title
            </span>
            <span className="font-mono text-base tracking-wider text-green-300">
              {capitalizeFirstLetter(activity.activityName)}
            </span>
          </p>
        </div>
        <p className="font-mono text-sm font-medium tracking-wider md:text-lg md:font-semibold">
          Activity Start Date{' '}
          <span className="text-sm font-normal text-green-300">
            {format(
              new Date(`${activity.activityStartDate}`),
              'EEE, MMM dd yyyy',
            )}
          </span>
        </p>
      </header>
      <section className="pb-[1rem] pl-[3rem] pr-[3rem] pt-[1.2rem]">
        <div className="flex flex-col gap-1">
          <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
            Description
          </p>
          <p className="font-sans text-sm text-slate-700 dark:text-grey-400">
            {/* {activity.activityDescription} */}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
            fugiat laboriosam fugit culpa nemo dignissimos omnis officiis quasi
            aliquid optio, id similique cum cumque nobis iste illum hic velit
            quidem debitis itaque quas! A quisquam et error perferendis quia ad
            dolores, corrupti est ullam dolorum eaque placeat omnis iure
            provident.
          </p>
        </div>
        <div className="mt-5 flex flex-col justify-between md:flex-row">
          <div className="mt-4 flex flex-col items-center gap-1 md:mt-0">
            <p className="flex items-center text-base font-semibold text-slate-800 dark:text-slate-200">
              Activity Time
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-400">
              {activity.activityTime}
            </p>
          </div>
          <div className="mt-4 flex flex-col items-center gap-1 font-semibold md:mt-5">
            <p
              className={`font-mono text-lg transition-transform duration-300 ease-in-out ${
                status === 'Event starts in'
                  ? 'scale-110 transform animate-pulse text-green-700'
                  : status === 'Event is live now'
                    ? 'scale-125 transform animate-pulse text-orange-700'
                    : 'animate-fade-out scale-90 transform text-red-700'
              }`}
            >
              {status} {timeRemaining && <span>{timeRemaining}</span>}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-1 md:mt-0">
            <p className="flex items-center text-base font-semibold text-slate-800 dark:text-slate-200">
              <MdLocationPin
                className="mr-1 text-green-500"
                fill="currentColor"
              />
              Location
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-400">
              {activity.activityLocation}
            </p>
          </div>
        </div>
      </section>
      <footer className="p-[0.6rem_3rem] text-right font-mono text-lg text-grey-500 dark:text-grey-100">
        <p>
          Activity End Date{' '}
          <span className="text-sm text-green-600 dark:text-green-300">
            {format(
              new Date(`${activity.activityEndDate}`),
              'EEE, MMM dd yyyy',
            )}
          </span>
        </p>
      </footer>
    </div>
  );
}

export default ActivityDataBox;
