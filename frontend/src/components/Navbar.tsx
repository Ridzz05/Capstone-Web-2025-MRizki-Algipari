import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  onAddTask: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddTask, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Tangani klik di luar menu untuk menutup menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Tangani keydown untuk penanganan aksesibilitas
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuItemClick = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
    handleMenuItemClick();
  };

  const handleAddTaskClick = () => {
    navigate('/add-task');
    handleMenuItemClick();
  };

  const handleLogoutClick = () => {
    onLogout();
    handleMenuItemClick();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="navbar-content">
        <div className="navbar-logo">CPro</div>

        <div className="navbar-menu">
          <button
            className={`nav-btn ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={handleDashboardClick}
            aria-label="Dashboard"
          >
            <div className="nav-icon-container">
              <i className="icon-home"></i>
            </div>
            <span>Dashboard</span>
          </button>

          <button
            onClick={handleAddTaskClick}
            className={`nav-btn nav-btn-add ${isActive('/add-task') ? 'active' : ''}`}
            aria-label="Tambah Task"
          >
            <i className="icon-plus"></i>
            <span>Tambah Task</span>
          </button>

          <button onClick={handleLogoutClick} className="nav-btn" aria-label="Logout">
            <div className="nav-icon-container">
              <i className="icon-logout"></i>
            </div>
            <span>Logout</span>
          </button>
        </div>

        {/* Hamburger button for mobile */}
        <button
          ref={btnRef}
          className={`hamburger-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <div id="mobile-menu" ref={menuRef} className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <button
            className={`mobile-nav-btn ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={handleDashboardClick}
            aria-label="Dashboard"
          >
            <i className="icon-home"></i>
            <span>Dashboard</span>
          </button>

          <button
            onClick={handleAddTaskClick}
            className={`mobile-nav-btn mobile-nav-btn-add ${isActive('/add-task') ? 'active' : ''}`}
            aria-label="Tambah Task"
          >
            <i className="icon-plus"></i>
            <span>Tambah Task</span>
          </button>

          <button onClick={handleLogoutClick} className="mobile-nav-btn" aria-label="Logout">
            <i className="icon-logout"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
