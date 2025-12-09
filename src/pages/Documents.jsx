import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Trash2 } from 'lucide-react';
import { documentsService } from '../services/api';

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: '', size: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchDocuments();
  }, [navigate]);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await documentsService.getAll();
      setDocuments(response.data);
    } catch (err) {
      setError('Erro ao carregar documentos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    try {
      await documentsService.create(formData);
      setFormData({ name: '', type: '', size: '' });
      setShowForm(false);
      fetchDocuments();
    } catch (err) {
      setError('Erro ao criar documento');
    }
  };

  const handleDeleteDocument = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este documento?')) {
      try {
        await documentsService.delete(id);
        fetchDocuments();
      } catch (err) {
        setError('Erro ao deletar documento');
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
          <h1 className="text-3xl font-bold text-primary">Sistema de Documentos</h1>
        </div>
      </header>

      {error && (
        <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-card rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Adicionar Novo Documento</h2>
          <form onSubmit={handleCreateDocument} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground">Nome do Documento</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-input rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground">Tipo</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-input rounded-md"
                placeholder="ex: PDF, DOCX, TXT"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground">Tamanho</label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-input rounded-md"
                placeholder="ex: 1.2MB"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
              >
                Adicionar
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-card-foreground">Arquivos</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            + Novo Documento
          </button>
        </div>

        {documents.length === 0 ? (
          <p className="text-muted-foreground">Nenhum documento encontrado.</p>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-card-foreground">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.type} - {doc.size}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-primary hover:text-primary/80 transition-colors flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>Baixar</span>
                  </button>
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;
