
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-[60px] bg-gradient-to-r from-[#2c99b7] to-[#4550b6] shadow-md z-50 ">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        
          <div className="nav-icon">🌌 Ocean-Assistant </div>
        <ul className="flex items-center list-none gap-30 space-x-6">
          <li>
            <Link to="/"  className="links text-white hover:text-cyan-300 transition-colors no-underline" >
              Home</Link>
          </li>
          <li>
            <Link to="/AboutPage" className="links text-white hover:text-cyan-300 transition-colors no-underline"  >
              About </Link>
          </li>
          <li>
            <Link
              to="/AboutPage"
              className="links text-white hover:text-cyan-300 transition-colors no-underline"
            >
              Data
            </Link>
          </li>
          <li>
            <Link
              to="/AboutPage"
              className="links text-white hover:text-cyan-300 transition-colors no-underline"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/AboutPage"
              className="links text-white hover:text-cyan-300 transition-colors no-underline"
            >
              Partners
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
