const API_BASE_URL = 'https://webdev-hw-api.vercel.app/api';

const makeRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const authAPI = {
  login: (credentials) => 
    makeRequest('/user/login', {
      method: 'POST',
      body: credentials,
    }),

  register: (userData) => 
    makeRequest('/user/register', {
      method: 'POST',
      body: userData,
    }),
};

export const tasksAPI = {
  getTasks: () => 
    makeRequest('/kanban'),

  createTask: (taskData) => 
    makeRequest('/kanban', {
      method: 'POST',
      body: taskData,
    }),

  updateTask: (taskId, taskData) => 
    makeRequest(`/kanban/${taskId}`, {
      method: 'PUT',
      body: taskData,
    }),

  deleteTask: (taskId) => 
    makeRequest(`/kanban/${taskId}`, {
      method: 'DELETE',
    }),
};