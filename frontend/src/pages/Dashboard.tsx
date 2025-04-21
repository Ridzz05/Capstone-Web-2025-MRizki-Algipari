import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';
import authService from '../services/authService';
import taskService, { Task, TaskInput } from '../services/taskService';
import '../styles/nihilism.css';
import '../styles/navbar.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Deteksi perangkat mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    checkIfMobile();

    // Check on window resize
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Load user info & tasks
  useEffect(() => {
    // Cek jika user sudah login atau belum
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Ambil data user
    const user = authService.getCurrentUser();
    if (user) {
      setUsername(user.username);
    }

    // Load tasks
    loadTasks();

    // Set loaded state after a short delay
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, [navigate]);

  const loadTasks = () => {
    const loadedTasks = taskService.getTasks();
    setTasks(loadedTasks);

    // Update stats
    const taskStats = taskService.getTaskStats();
    setStats(taskStats);
  };

  const handleAddTask = () => {
    // Navigate to Add Task page instead of showing form
    navigate('/add-task');
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  const handleDeleteTask = (taskId: string) => {
    const success = taskService.deleteTask(taskId);
    if (success) {
      loadTasks();
    }
  };

  const handleTaskSubmit = (taskData: TaskInput) => {
    if (currentTask) {
      // Edit existing task
      taskService.updateTask(currentTask.id, taskData);

      // Reset form & load updated tasks
      setShowForm(false);
      setCurrentTask(null);
      loadTasks();
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentTask(null);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div
      className={`auth-container dashboard-modern ${isMobile ? 'mobile-view' : ''} ${isLoaded ? 'is-loaded' : ''}`}
    >
      <div className="auth-grid-background"></div>
      <div className="auth-background-text top">NIHIL</div>
      <div className="auth-background-text bottom">TASKS</div>

      <Navbar onAddTask={handleAddTask} onLogout={handleLogout} />

      <div className="dashboard-content">
        <div className="dashboard-header card animate-item">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="dashboard-welcome">
            <p>
              Selamat datang, <strong>{username || 'User'}</strong>!
            </p>
            <p>Kelola task dan project Anda di sini.</p>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-card animate-item delay-1">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Task</div>
          </div>
          <div className="stat-card animate-item delay-2">
            <div className="stat-value">{stats.inProgress}</div>
            <div className="stat-label">Dalam Proses</div>
          </div>
          <div className="stat-card animate-item delay-3">
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">Selesai</div>
          </div>
        </div>

        <div className="dashboard-tasks card animate-item delay-4">
          <h2 className="dashboard-subtitle">Manajemen Task</h2>

          {showForm && (
            <div className="task-form-container animate-fade">
              <TaskForm
                task={currentTask}
                onSubmit={handleTaskSubmit}
                onCancel={handleCancelForm}
              />
            </div>
          )}

          <div className="task-list-container">
            <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
          </div>
        </div>

        <div className="dashboard-footer">
          {/* Bottom spacing to ensure content isn't hidden behind the nav */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
