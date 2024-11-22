import { FaEnvelope } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineInstagram } from 'react-icons/ai';
import { BiLogoLinkedin } from 'react-icons/bi';

function Footer() {
  return (
    <footer className="relative bottom-0 w-full rounded-tl-[125px] bg-gradient-to-r from-green-500 to-green-200 pb-5 pt-5 font-mono text-black">
      <div className="mx-auto flex max-w-[90%] flex-wrap items-start justify-between lg:flex-nowrap">
        {/* Logo and Description */}
        <div className="mb-6 w-full p-2 sm:basis-1/2 lg:basis-1/4">
          <img
            src="sobuslight.png"
            alt="Sobus Logo"
            className="mx-auto mb-4 h-[60px] w-[120px] lg:mx-0"
          />
          <p className="text-center text-sm lg:text-left">
            Sobus is the college entrepreneurship club that supports students by
            funding and mentoring innovative startup ideas. It fosters a culture
            of creativity and helps turn ideas into successful ventures.
          </p>
        </div>

        {/* Made By Section */}
        <div className="mb-6 w-full p-2 sm:basis-1/2 lg:basis-[15%]">
          <h3 className="relative mb-4 text-center font-bold lg:text-left">
            Made by
            <div className="relative mt-1.5 inline-block h-1.5 w-full rounded bg-green-500">
              <span className="animate-moving absolute left-[10px] top-0 block h-full w-[15px] rounded bg-indigo-500"></span>
            </div>
          </h3>
          <ul className="space-y-3 text-center lg:text-left">
            <li>
              <a
                href="https://www.linkedin.com/in/chirag-vijayvergiya-548635245/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                className="text-black no-underline hover:text-indigo-800"
              >
                Chirag Vijayvergiya
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/yashas-sawai-bab0ab250/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                className="text-black no-underline hover:text-indigo-800"
              >
                Yashas Sawai
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/shubham-agarwal-880435251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                className="text-black no-underline hover:text-indigo-800"
              >
                Shubham Agrawal
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full p-2 sm:basis-full lg:basis-1/4">
          <h3 className="relative mb-4 text-center font-bold lg:text-left">
            Newsletter
            <div className="relative mt-1.5 inline-block h-1.5 w-full rounded bg-green-500">
              <span className="animate-moving absolute left-[10px] top-0 block h-full w-[15px] rounded bg-indigo-500"></span>
            </div>
          </h3>
          <form className="mb-8 flex flex-col items-center space-y-4 border-b border-black pb-4 lg:flex-row lg:items-center lg:space-x-2 lg:space-y-0">
            <FaEnvelope className="text-lg text-gray-700" />
            <input
              type="email"
              placeholder="Enter your email-id"
              required
              className="w-full border-none bg-transparent text-gray-700 placeholder-gray-800 outline-none"
            />

            <button
              type="submit"
              className="cursor-pointer border-none bg-transparent text-gray-800 outline-none hover:text-black"
            >
              <FaArrowRightLong className="text-xl" />
            </button>
          </form>
          <div className="flex justify-center space-x-4 lg:justify-start">
            <FaFacebookF className="h-10 w-10 transform cursor-pointer rounded-full bg-green-400 px-2 py-2 text-center text-black transition-transform ease-linear hover:-translate-y-2 hover:bg-green-600" />
            <AiOutlineInstagram className="h-10 w-10 transform cursor-pointer rounded-full bg-green-400 px-2 py-2 text-center text-black transition-transform ease-linear hover:-translate-y-2 hover:bg-green-600" />
            <BiLogoLinkedin className="h-10 w-10 transform cursor-pointer rounded-full bg-green-400 p-2 text-center text-black transition-transform ease-linear hover:-translate-y-2 hover:bg-green-600" />
          </div>
        </div>
      </div>
      <hr className="mx-auto my-5 w-[90%] border-t border-black" />
      <p className="text-md text-center font-bold">
        Sobus | NMIMS &#169; 2024 - All Rights Reserved
      </p>
    </footer>
  );
}

export default Footer;
