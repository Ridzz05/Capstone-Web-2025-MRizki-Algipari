import React, { useState } from 'react';
import '../styles/neobrutalism.css';

const ComponentDemo: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="neo-container">
      <h1 className="neo-title">Neo-Brutalism Components</h1>
      <p className="neo-mb-3">
        Halaman ini memperlihatkan komponen-komponen UI dengan gaya Neo-Brutalism.
      </p>

      {/* Typography Section */}
      <div className="neo-card neo-mb-3">
        <h2 className="neo-subtitle">Typography</h2>
        <div className="neo-mt-2">
          <h1 className="neo-title">Headline Text</h1>
          <h2 className="neo-subtitle">Subheading Text</h2>
          <p className="neo-text-large">Large text paragraph</p>
          <p>Normal text paragraph</p>
          <p className="neo-text-small">Small text paragraph</p>
          <p>
            Text with <span className="neo-text-primary">primary</span> and{' '}
            <span className="neo-text-accent">accent</span> colors.
          </p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="neo-card neo-mb-3">
        <h2 className="neo-subtitle">Buttons</h2>
        <div className="neo-d-flex neo-flex-wrap neo-gap-2 neo-mt-2">
          <button className="neo-btn">Primary Button</button>
          <button className="neo-btn neo-btn-secondary">Secondary Button</button>
          <button className="neo-btn neo-btn-accent">Accent Button</button>
          <button className="neo-btn neo-btn-alt">Alternative Button</button>
          <button className="neo-btn neo-btn-small">Small Button</button>
          <button className="neo-btn neo-btn-large">Large Button</button>
          <button className="neo-btn" disabled>
            Disabled Button
          </button>
          <button className="neo-btn neo-btn-icon">
            <span>Icon Button</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Form Elements */}
      <div className="neo-card neo-mb-3">
        <h2 className="neo-subtitle">Form Elements</h2>
        <div className="neo-mt-2">
          <div className="form-group">
            <label className="neo-label">Normal Input</label>
            <input
              type="text"
              className="neo-input"
              placeholder="Enter text here"
            />
          </div>

          <div className="form-group">
            <label className="neo-label">Error Input</label>
            <input
              type="text"
              className="neo-input neo-input-error"
              placeholder="This input has an error"
            />
          </div>

          <div className="form-group">
            <label className="neo-label">Disabled Input</label>
            <input
              type="text"
              className="neo-input"
              placeholder="This input is disabled"
              disabled
            />
          </div>

          <div className="form-group">
            <label className="neo-label">Toggle Switch</label>
            <label className="neo-switch">
              <input type="checkbox" checked={isToggled} onChange={handleToggle} />
              <span className="neo-switch-slider"></span>
            </label>
            <span className="neo-ml-2">
              {isToggled ? 'Toggle is ON' : 'Toggle is OFF'}
            </span>
          </div>
        </div>
      </div>

      {/* Alert & Notifications */}
      <div className="neo-card neo-mb-3">
        <h2 className="neo-subtitle">Alerts & Notifications</h2>
        <div className="neo-mt-2">
          <div className="neo-error">
            This is an error message. Something went wrong!
          </div>
          <div className="neo-success">
            This is a success message. Operation completed successfully!
          </div>
          <div className="neo-warning">
            This is a warning message. Pay attention to this!
          </div>
          <div className="neo-info">
            This is an information message. Just letting you know!
          </div>
        </div>
      </div>

      {/* Badges & Tooltips */}
      <div className="neo-card neo-mb-3">
        <h2 className="neo-subtitle">Badges & Tooltips</h2>
        <div className="neo-mt-2">
          <span className="neo-badge neo-mr-2">New</span>
          <span className="neo-badge neo-badge-secondary neo-mr-2">Secondary</span>
          <span className="neo-badge neo-badge-accent neo-mr-2">Accent</span>

          <div className="neo-mt-3">
            <div className="neo-tooltip">
              Hover over me
              <span className="neo-tooltip-text">This is a tooltip with additional information!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Spinner */}
      <div className="neo-card neo-mb-3">
        <h2 className="neo-subtitle">Loading Spinners</h2>
        <div className="neo-mt-2 neo-d-flex neo-align-center neo-gap-2">
          <div className="neo-spinner"></div>
          <button className="neo-btn neo-btn-secondary" onClick={simulateLoading} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Click to Load'}
          </button>
        </div>
      </div>

      {/* Table Example */}
      <div className="neo-card neo-mb-3">
        <h2 className="neo-subtitle">Tables</h2>
        <div className="neo-mt-2">
          <table className="neo-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>john@example.com</td>
                <td>
                  <span className="neo-badge">Active</span>
                </td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>jane@example.com</td>
                <td>
                  <span className="neo-badge neo-badge-secondary">Inactive</span>
                </td>
              </tr>
              <tr>
                <td>Bob Johnson</td>
                <td>bob@example.com</td>
                <td>
                  <span className="neo-badge neo-badge-accent">Pending</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards */}
      <div className="neo-mb-3">
        <h2 className="neo-subtitle">Cards</h2>
        <div className="neo-d-flex neo-flex-wrap neo-gap-2 neo-mt-2">
          <div className="neo-card neo-card-hover" style={{ width: '200px' }}>
            <h3>Standard Card</h3>
            <p>This is a basic card with hover effect.</p>
          </div>
          <div className="neo-card" style={{ width: '200px', backgroundColor: 'var(--alt-primary)', color: 'white' }}>
            <h3>Colored Card</h3>
            <p>Cards can have different background colors.</p>
          </div>
          <div className="neo-card" style={{ width: '200px', backgroundColor: 'var(--accent-color)' }}>
            <h3>Accent Card</h3>
            <p>Using accent colors for emphasis.</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="neo-mb-3">
        <h2 className="neo-subtitle">Stat Cards</h2>
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-value">125</div>
            <div className="stat-label">New Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">348</div>
            <div className="stat-label">Total Posts</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">89%</div>
            <div className="stat-label">Engagement</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentDemo; 