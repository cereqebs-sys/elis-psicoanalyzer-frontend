import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, LogOut, Zap } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Bem-vindo, {user.name}!</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-destructive hover:text-destructive/80 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/sessions" className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center">
          <Users className="w-10 h-10 text-primary mb-3" />
          <h2 className="text-xl font-semibold text-card-foreground">Sessões</h2>
          <p className="text-sm text-muted-foreground mt-1 text-center">Gerencie suas sessões de análise.</p>
        </Link>

        <Link to="/documents" className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center">
          <FileText className="w-10 h-10 text-primary mb-3" />
          <h2 className="text-xl font-semibold text-card-foreground">Documentos</h2>
          <p className="text-sm text-muted-foreground mt-1 text-center">Acesse e organize seus documentos.</p>
        </Link>

        <Link to="/summary" className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center">
          <Zap className="w-10 h-10 text-primary mb-3" />
          <h2 className="text-xl font-semibold text-card-foreground">Resumos</h2>
          <p className="text-sm text-muted-foreground mt-1 text-center">Gere resumos automáticos das sessões.</p>
        </Link>

        <div className="p-6 bg-card rounded-lg shadow-lg flex flex-col items-center">
          <LayoutDashboard className="w-10 h-10 text-primary mb-3" />
          <h2 className="text-xl font-semibold text-card-foreground">Estatísticas</h2>
          <p className="text-sm text-muted-foreground mt-1 text-center">Visualize o resumo das suas atividades.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
