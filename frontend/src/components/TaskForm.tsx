import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';
import Button, { ButtonProps } from './Button';
import { Task, TaskInput } from '../services/taskService';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (taskData: TaskInput) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<TaskInput>({
    title: '',
    description: '',
    status: 'pending',
  });

  // Mengisi form dengan data task yang ada jika dalam mode edit
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
      });
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="task-form">
      <h2 className="task-form-title">{task ? 'Edit Task' : 'Tambah Task Baru'}</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Judul Task"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Masukkan judul task"
          required
        />

        <div className="form-group">
          <label className="form-label">
            Deskripsi <span className="required-mark">*</span>
          </label>
          <textarea
            className="form-input form-textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Masukkan deskripsi task"
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Status <span className="required-mark">*</span>
          </label>
          <select
            className="form-input form-select"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">Dalam Proses</option>
            <option value="completed">Selesai</option>
          </select>
        </div>

        <div className="task-form-actions">
          <Button type="submit" className="task-form-submit">
            {task ? 'Update Task' : 'Tambah Task'}
          </Button>
          <Button type="button" onClick={onCancel} variant="outline" className="task-form-cancel">
            Batal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
