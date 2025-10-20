import { createContext, useContext, useState, useEffect } from 'react';
import { tasksAPI } from '../api';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await tasksAPI.getTasks();
      setTasks(response.tasks || []);
    } catch (err) {
      setError('Ошибка при загрузке задач: ' + err.message);
      console.error('Error loading tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      setError('');
      await tasksAPI.createTask(taskData);
      await loadTasks();
      return { success: true };
    } catch (err) {
      const errorMessage = 'Ошибка при создании задачи: ' + err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      setError('');
      await tasksAPI.updateTask(taskId, taskData);
      await loadTasks(); 
      return { success: true };
    } catch (err) {
      const errorMessage = 'Ошибка при обновлении задачи: ' + err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Удаление задачи
  const deleteTask = async (taskId) => {
    try {
      setError('');
      await tasksAPI.deleteTask(taskId);
      await loadTasks(); 
      return { success: true };
    } catch (err) {
      const errorMessage = 'Ошибка при удалении задачи: ' + err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const moveTask = async (taskId, newStatus) => {
    try {
      const taskToUpdate = tasks.find(task => task._id === taskId);
      if (!taskToUpdate || taskToUpdate.status === newStatus) {
        return { success: true }; 
      }

      const updatedTask = {
        title: taskToUpdate.title,
        topic: taskToUpdate.topic,
        status: newStatus,
        description: taskToUpdate.description,
        date: taskToUpdate.date
      };

      return await updateTask(taskId, updatedTask);
    } catch (err) {
      const errorMessage = 'Ошибка при перемещении задачи: ' + err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const value = {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    setError
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};