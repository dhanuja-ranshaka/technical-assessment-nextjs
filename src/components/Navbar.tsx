import Link from 'next/link';

const navigationData = [
  { label: 'Showcase', href: '/showcase' },
  { label: 'Docs', href: '/docs' },
  { label: 'Blog', href: '/blog' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Templates', href: '/templates' },
  { label: 'Enterprise', href: '/enterprise' },
];

export default function Navbar() {
  return (
    <nav>
      <div className="navbar-desktop">
        <NavbarBrand />
        <NavLinks navigationData={navigationData} navWrapperClass='nav-wrapper-desktop' navLinkClass='nav-link-desktop' />
        <LoginButton />
        <SearchInput />
      </div>

      <div className="navbar-mobile">
        <input type="checkbox" id="mobile-menu-toggle" className="hidden peer" />

        <div className="navbar-mobile-collapsed">
          <div className='navbar-mobile-header'>
            <NavbarBrand />
            <label
              htmlFor="mobile-menu-toggle"
              className="hamburger-icon"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </label>
          </div>
        </div>

        <div className="navbar-mobile-expanded">
          <div className='navbar-mobile-header'>
            <NavbarBrand />
            <SearchInput />
            <label
              htmlFor="mobile-menu-toggle"
              className="close-icon"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </label>
          </div>

          <NavLinks navigationData={navigationData} navWrapperClass='nav-wrapper-mobile' navLinkClass='nav-link-mobile' />
          <LoginButton />
        </div>
      </div>
    </nav>
  );
}


function NavbarBrand() {
  return (
    <Link href="/" className="navbar-brand">
      AEON
    </Link>
  );
}

function LoginButton() {
  return (
    <Link href="/login" className="login-button">
      Log in
    </Link>
  );
}

function SearchInput() {
  return (
    <div className="search-wrapper">
      <input
        type="search"
        placeholder="Search documentation..."
        className="input-text"
      />
    </div>
  );
}

type NavLinksProps = {
  navigationData: { label: string; href: string }[];
  navWrapperClass?: string;
  navLinkClass?: string;
};

function NavLinks({ navigationData, navWrapperClass, navLinkClass }: NavLinksProps) {
  if (!navigationData || navigationData.length === 0) {
    return null;
  }

  return (
    <ul className={navWrapperClass}>
      {navigationData.map(link => (
        <li key={link.href} className={navLinkClass}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
}
