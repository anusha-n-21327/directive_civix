import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-card shadow-sm p-4 flex items-center gap-4">
      <Link to="/">
        <img src="/civix-logo.jpeg" alt="Civix Logo" className="h-10 w-10 rounded-full" />
      </Link>
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
        Civicx
      </h1>
    </header>
  );
};

export default Header;