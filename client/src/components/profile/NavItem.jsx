function NavItem({ link, text, icon, active }) {
  return (
    <li className={`${active ? 'side-nav--active' : ''} `}>
      <a href={link}>
        <svg>
          <use xlinkHref={`#${icon}`} />
        </svg>
        <span className="text-md">{text}</span>
      </a>
    </li>
  );
}

export default NavItem;
