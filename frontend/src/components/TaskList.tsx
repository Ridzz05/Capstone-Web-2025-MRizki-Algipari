import React, { useState } from 'react';
import { Task } from '../services/taskService';
import '../styles/nihilism.css';
import ConfirmModal from './ConfirmModal';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const getStatusBadge = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <span className="badge badge-completed">Selesai</span>;
      case 'in-progress':
        return <span className="badge badge-progress">Dalam Proses</span>;
      case 'pending':
      default:
        return <span className="badge badge-pending">Pending</span>;
    }
  };

  const handleDeleteClick = (id: string) => {
    setTaskToDelete(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      onDelete(taskToDelete);
      setModalOpen(false);
      setTaskToDelete(null);
    }
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setTaskToDelete(null);
  };

  if (tasks.length === 0) {
    return (
      <div className="task-empty-state">
        <p className="text-center">Belum ada task. Tambahkan task baru.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2 className="task-list-title">Daftar Task</h2>
      <div className="task-table-container">
        <table className="table task-table">
          <thead>
            <tr>
              <th className="task-title-col">Judul</th>
              <th className="task-desc-col">Deskripsi</th>
              <th className="task-status-col">Status</th>
              <th className="task-actions-col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="task-row">
                <td className="task-title-col">{task.title}</td>
                <td className="task-desc-col">
                  <div className="task-description">
                    {task.description.length > 30
                      ? `${task.description.substring(0, 30)}...`
                      : task.description}
                  </div>
                </td>
                <td className="task-status-col">{getStatusBadge(task.status)}</td>
                <td className="task-actions-col">
                  <div className="task-actions">
                    <button className="btn btn-outline task-btn-edit" onClick={() => onEdit(task)}>
                      Edit
                    </button>
                    <button
                      className="btn task-btn-delete"
                      onClick={() => handleDeleteClick(task.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={modalOpen}
        title="Konfirmasi Hapus"
        message="Apakah Anda yakin ingin menghapus task ini?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default TaskList;
