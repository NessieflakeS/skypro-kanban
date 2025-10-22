import { createContext, useContext, useState, useEffect } from 'react';
import { tasksAPI } from '../api';
import { useAuth } from './AuthContext';

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
  const { currentUser, isAuthenticated } = useAuth();

  const loadTasks = async () => {
    if (!isAuthenticated || !currentUser) {
      setLoading(false);
      setTasks([]);
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await tasksAPI.getTasks();
      setTasks(response.tasks || []);
    } catch (err) {
      setError('Ошибка при загрузке задач: ' + err.message);
      console.error('Error loading tasks:', err);
      if (err.message.includes('Пользователь не найден') || err.message.includes('401')) {
        setTasks([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      setError('');
      const response = await tasksAPI.createTask(taskData);
      setTasks(prev => [...prev, response.task || { ...taskData, _id: Date.now().toString() }]);
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
      const originalTasks = [...tasks];
      
      setTasks(prev => prev.map(task => 
        task._id === taskId ? { ...task, ...taskData } : task
      ));
      
      const response = await tasksAPI.updateTask(taskId, taskData);
      
      setTasks(prev => prev.map(task => 
        task._id === taskId ? { ...task, ...response.task } : task
      ));
      
      return { success: true };
    } catch (err) {
      setTasks(originalTasks);
      const errorMessage = 'Ошибка при обновлении задачи: ' + err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setError('');
      const originalTasks = [...tasks];
      
      setTasks(prev => prev.filter(task => task._id !== taskId));
      
      await tasksAPI.deleteTask(taskId);
      return { success: true };
    } catch (err) {
      setTasks(originalTasks);
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

      setTasks(prev => prev.map(task => 
        task._id === taskId ? { ...task, status: newStatus } : task
      ));

      const updatedTask = {
        title: taskToUpdate.title,
        topic: taskToUpdate.topic,
        status: newStatus,
        description: taskToUpdate.description,
        date: taskToUpdate.date
      };

      tasksAPI.updateTask(taskId, updatedTask).catch(err => {
        console.error('Error updating task on server:', err);
        setTasks(prev => prev.map(task => 
          task._id === taskId ? { ...task, status: taskToUpdate.status } : task
        ));
        setError('Ошибка при перемещении задачи: ' + err.message);
      });

      return { success: true };
    } catch (err) {
      const errorMessage = 'Ошибка при перемещении задачи: ' + err.message;
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  useEffect(() => {
    loadTasks();
  }, [isAuthenticated, currentUser]);

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