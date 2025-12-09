import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import { sessionsService } from '../services/api';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ client: '', date: '', status: 'Agendada', notes: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchSessions();
  }, [navigate]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await sessionsService.getAll();
      setSessions(response.data);
    } catch (err) {
      setError('Erro ao carregar sessões');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    try {
      await sessionsService.create(formData);
      setFormData({ client: '', date: '', status: 'Agendada', notes: '' });
      setShowForm(false);
      fetchSessions();
    } catch (err) {
      setError('Erro ao criar sessão');
    }
  };

  const handleDeleteSession = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta sessão?')) {
      try {
        await sessionsService.delete(id);
        fetchSessions();
      } catch (err) {
        setError('Erro ao deletar sessão');
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-primary">Gerenciamento de Sessões</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center space-x-2"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Nova Sessão</span>
        </button>
      </header>

      {error && (
        <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-card rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Criar Nova Sessão</h2>
          <form onSubmit={handleCreateSession} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground">Cliente</label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-input rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground">Data</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-input rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-input rounded-md"
              >
                <option>Agendada</option>
                <option>Concluída</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground">Notas</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-input rounded-md"
                rows="3"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
              >
                Criar
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-card rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-4">Lista de Sessões</h2>
        {sessions.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma sessão encontrada.</p>
        ) : (
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-card-foreground">{session.client}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">{session.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${session.status === 'Concluída' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleDeleteSession(session.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Sessions;
