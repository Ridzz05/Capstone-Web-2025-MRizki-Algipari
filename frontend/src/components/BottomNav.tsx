import React from 'react';

interface BottomNavProps {
  onAddTask: () => void;
  onLogout: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onAddTask, onLogout }) => {
  return (
    <div className="bottom-nav">
      <div className="bottom-nav-content">
        <button className="nav-btn">
          <div className="nav-icon-container">
            <i className="icon-home"></i>
          </div>
          <span className="nav-label">Dashboard</span>
        </button>

        <button onClick={onAddTask} className="nav-btn nav-btn-add" aria-label="Tambah Task">
          <div className="add-circle">
            <i className="icon-plus"></i>
          </div>
          <span className="nav-label">Tambah</span>
        </button>

        <button onClick={onLogout} className="nav-btn" aria-label="Logout">
          <div className="nav-icon-container">
            <i className="icon-logout"></i>
          </div>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
