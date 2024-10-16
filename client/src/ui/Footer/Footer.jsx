import { SiFacebook } from 'react-icons/si';
import { RiInstagramFill } from 'react-icons/ri';
import { FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="relative flex min-h-[100px] w-[100%] flex-col flex-wrap items-center justify-center bg-[#a1ff8c] px-[50px] py-[20px]">
      <div className="h-[30px]">
        <div
          className="z-1000 absolute -top-[70px] bottom-0 left-0 h-[100px] w-full animate-wave bg-custom opacity-100"
          style={{ backgroundImage: "url('wave.png')" }}
        ></div>
        <div
          className="z-999 absolute -top-[70px] bottom-2.5 left-0 h-[100px] w-full animate-wave2 bg-custom opacity-50"
          style={{ backgroundImage: "url('wave.png')" }}
        ></div>
        <div
          className="z-1000 absolute -top-[70px] bottom-4 left-0 h-[100px] w-full animate-wave3 bg-custom opacity-20"
          style={{ backgroundImage: "url('wave.png')" }}
        ></div>
        <div
          className="z-999 absolute -top-[70px] bottom-5 left-0 h-[100px] w-full animate-wave4 bg-custom opacity-70"
          style={{ backgroundImage: "url('wave.png')" }}
        ></div>
      </div>
      <ul className="relative my-[10px] flex items-center justify-center gap-4">
        <li className="list-none">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-[10px] inline-block text-3xl text-white transition-transform duration-500 hover:translate-y-[-10px]"
          >
            <SiFacebook />
          </a>
        </li>
        <li className="list-none">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-[10px] inline-block text-3xl text-white transition-transform duration-500 hover:translate-y-[-10px]"
          >
            <RiInstagramFill />
          </a>
        </li>
        <li className="list-none">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-[10px] inline-block text-3xl text-white transition-transform duration-500 hover:translate-y-[-10px]"
          >
            <FaLinkedin />
          </a>
        </li>
        <li className="list-none">
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-[10px] inline-block text-3xl text-white transition-transform duration-500 hover:translate-y-[-10px]"
          >
            <FaSquareXTwitter />
          </a>
        </li>
      </ul>

      {/* Internal Navigation Links */}
      <ul className="relative my-[10px] flex items-center justify-center">
        <li className="list-none">
          <Link
            to="/home"
            className="mx-[10px] inline-block text-xl text-white no-underline opacity-75 hover:opacity-100"
          >
            Home
          </Link>
        </li>
        <li className="list-none">
          <Link
            to="/about"
            className="mx-[10px] inline-block text-xl text-white no-underline opacity-75 hover:opacity-100"
          >
            About
          </Link>
        </li>
        <li className="list-none">
          <Link
            to="/team"
            className="mx-[10px] inline-block text-xl text-white no-underline opacity-75 hover:opacity-100"
          >
            Team
          </Link>
        </li>
        <li className="list-none">
          <Link
            to="/contact"
            className="mx-[10px] inline-block text-xl text-white no-underline opacity-75 hover:opacity-100"
          >
            Contact
          </Link>
        </li>
      </ul>
      <p className="text-md mb-[5px] mt-[5px] text-center text-white">
        Copyright &copy; 2024 | All Rights Reserved | Made By Yashas, Chirag &
        Shubham
      </p>
    </footer>
  );
}

export default Footer;
