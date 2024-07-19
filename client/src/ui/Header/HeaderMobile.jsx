import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { routes } from './Routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import * as Scroll from 'react-scroll';
import Button from '../Button';
// import { useUser } from '../../../features/authentication/Patients/useUser';
function HeaderMobile() {
  // const { user } = useUser();
  const user = {
    data: {
      data: {
        name: 'John Doe',
        photo: 'https://randomuser.me/api/portraits',
      },
    },
  };

  const [isOpen, setOpen] = useState(false);
  const path = useLocation().pathname;
  const location = path.split('/')[1];
  const navigate = useNavigate();
  const scroller = Scroll.scroller;
  const goToPageAndScroll = async (selector) => {
    try {
      await navigate('/home');
      await scroller.scrollTo(selector, {
        duration: 500,
        smooth: true,
        offset: -75,
        spy: true,
      });
      setOpen(false);
    } catch (err) {
      console.error('Error navigating or scrolling:', err);
    }
  };

  return (
    <div>
      <Hamburger size={22} toggled={isOpen} toggle={setOpen} />
      {isOpen && (
        <div className="fixed left-0 right-0 top-[5rem] border-b border-b-white/20 p-5 pt-7 backdrop-blur-md backdrop-filter">
          <ul className="grid gap-2">
            {location === ''
              ? routes.map((route) => {
                  const { Icon } = route;

                  return (
                    <li
                      key={route.title}
                      className="w-full rounded-xl bg-gradient-to-tr from-gray-500 via-gray-900 to-gray-800 p-[0.08rem]"
                    >
                      <ScrollLink
                        to={route.href}
                        spy={true}
                        smooth={true}
                        offset={-75}
                        duration={500}
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between rounded-xl bg-gray-900 p-5"
                      >
                        <span className="flex gap-1 text-lg">
                          {route.title}
                        </span>
                        <Icon className="text-xl" />
                      </ScrollLink>
                    </li>
                  );
                })
              : routes.map((route) => {
                  const { Icon } = route;

                  return (
                    <li
                      key={route.title}
                      className="w-full rounded-xl bg-gradient-to-tr from-gray-500 via-gray-900 to-gray-800 p-[0.08rem]"
                    >
                      <ScrollLink
                        onClick={
                          (() => setOpen((prev) => !prev),
                          () => goToPageAndScroll(route.href))
                        }
                        className="flex w-full items-center justify-between rounded-xl bg-gray-900 p-5"
                      >
                        <span className="flex gap-1 text-lg">
                          {route.title}
                        </span>
                        <Icon className="text-xl" />
                      </ScrollLink>
                    </li>
                  );
                })}
          </ul>
          {!user ? (
            <div className="my-6 flex justify-center">
              {/* Center the login button */}
              <Link to="/login" onClick={() => setOpen((prev) => !prev)}>
                <Button type="primary">Login</Button>
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
}

export default HeaderMobile;
