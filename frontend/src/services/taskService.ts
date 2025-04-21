import axios from 'axios';

// Interface untuk model Task
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

// Interface untuk form input Task
export interface TaskInput {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

// Dalam pengembangan awal, kita akan menggunakan local storage
// untuk menyimpan data task sebelum integrasi dengan backend
const TASKS_STORAGE_KEY = 'dashboard_tasks';

const taskService = {
  // Mendapatkan semua task
  getTasks: (): Task[] => {
    const tasksJson = localStorage.getItem(TASKS_STORAGE_KEY);
    if (tasksJson) {
      return JSON.parse(tasksJson);
    }
    return [];
  },

  // Mendapatkan task berdasarkan ID
  getTaskById: (id: string): Task | null => {
    const tasks = taskService.getTasks();
    return tasks.find(task => task.id === id) || null;
  },

  // Menambahkan task baru
  createTask: (taskInput: TaskInput): Task => {
    const tasks = taskService.getTasks();

    const newTask: Task = {
      id: `task-${Date.now()}`,
      ...taskInput,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, newTask];
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));

    return newTask;
  },

  // Mengupdate task
  updateTask: (id: string, taskInput: Partial<TaskInput>): Task | null => {
    const tasks = taskService.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
      return null;
    }

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...taskInput,
      updatedAt: new Date().toISOString(),
    };

    tasks[taskIndex] = updatedTask;
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));

    return updatedTask;
  },

  // Menghapus task
  deleteTask: (id: string): boolean => {
    const tasks = taskService.getTasks();
    const filteredTasks = tasks.filter(task => task.id !== id);

    if (filteredTasks.length === tasks.length) {
      return false; // Task tidak ditemukan
    }

    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(filteredTasks));
    return true;
  },

  // Mendapatkan statistik task
  getTaskStats: () => {
    const tasks = taskService.getTasks();

    return {
      total: tasks.length,
      completed: tasks.filter(task => task.status === 'completed').length,
      pending: tasks.filter(task => task.status === 'pending').length,
      inProgress: tasks.filter(task => task.status === 'in-progress').length,
    };
  },
};

export default taskService;
