const API_BASE_URL = 'https://wedev-api.sky.pro/api';

async function makeRequest(url, options = {}) {
  const token = localStorage.getItem('token');
  
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch (e) {
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export const tasksAPI = {
  getTasks: () => makeRequest('/kanban'),
  
  getTaskById: (id) => makeRequest(`/kanban/${id}`),
  
  createTask: (taskData) => makeRequest('/kanban', {
    method: 'POST',
    body: JSON.stringify(taskData),
  }),
  
  updateTask: (id, taskData) => makeRequest(`/kanban/${id}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  }),
  
  deleteTask: (id) => makeRequest(`/kanban/${id}`, {
    method: 'DELETE',
  }),
};

export const authAPI = {
  getUsers: () => makeRequest('/user'),
  
  register: (userData) => makeRequest('/user', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => makeRequest('/user/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getMe: () => makeRequest('/user/me'),
};