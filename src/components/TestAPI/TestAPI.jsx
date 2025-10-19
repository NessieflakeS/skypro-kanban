import { useState } from 'react';
import { authAPI, testAPI } from '../../api';

const TestAPI = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    try {
      const response = await authAPI.login({
        login: 'test@example.com',
        password: 'password123'
      });
      setResult(`Login test: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setResult(`Login error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testRegister = async () => {
    setLoading(true);
    try {
      const response = await authAPI.register({
        login: `test${Date.now()}@example.com`,
        name: 'Test User',
        password: 'password123'
      });
      setResult(`Register test: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setResult(`Register error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>API Тестирование</h3>
      <button onClick={testLogin} disabled={loading}>
        Тест Логина
      </button>
      <button onClick={testRegister} disabled={loading}>
        Тест Регистрации
      </button>
      {loading && <p>Загрузка...</p>}
      {result && (
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
          {result}
        </pre>
      )}
    </div>
  );
};

export default TestAPI;