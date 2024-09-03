import classNames from 'classnames';
import { format } from 'date-fns';
import { TbExternalLink } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';

function ActivityCard({ color, elements }) {
  const navigate = useNavigate();
  return (
    <div className="parent mx-auto">
      <div
        className={classNames(
          `bg-custom-gradient-green dark:bg-custom-gradient-darkgreen`,
          'card',
        )}
      >
        <div class="logo">
          {/* <span class="circle circle2"></span> */}
          <span class="circle circle3"></span>
          <span class="circle circle4"></span>
          <span class="circle circle5">
            <button
              onClick={() => navigate(`/activities/${elements._id}`)}
              className="group relative p-2"
            >
              <TbExternalLink className="h-6 w-6 transform text-slate-800 transition-transform group-hover:scale-125" />
            </button>
          </span>
        </div>
        <div class="glass"></div>
        <div class="content">
          <span className="block font-mono text-xl font-extrabold text-indigo-400">
            {elements.activityName}
          </span>
          <span class="text font-mono">{elements.activityLocation}</span>
          <span class="text font-mono tracking-wider">
            {format(
              new Date(`${elements.activityStartDate}`),
              'EEE, MMM dd yyyy',
            )}
          </span>
        </div>
        <div class="bottom">
          <div class="social-buttons-container">
            <button class="social-button .social-button1">
              <svg
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
                class="svg"
              >
                <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
              </svg>
            </button>
            {/* <button class="social-button .social-button2">
              <svg
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                class="svg"
              >
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
              </svg>
            </button> */}
            <Link
              to="https://www.linkedin.com/company/sobus-insight-forum"
              target="_blank"
            >
              <button class="social-button .social-button3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="svg"
                >
                  <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.58 0 53.48 0 24 24.62 0 53.79 0s53.42 24 53.42 53.48c0 30.1-24.09 54.62-53.42 54.62zM447.95 448h-92.88V302.4c0-34.71-.71-79.3-48.33-79.3-48.32 0-55.73 37.78-55.73 76.83V448h-92.83V148.9h89.08v40.8h1.29c12.41-23.5 42.67-48.33 87.75-48.33 93.79 0 111.14 61.79 111.14 142.19V448z" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityCard;
