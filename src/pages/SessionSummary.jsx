import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Loader } from 'lucide-react';
import { summaryService, sessionsService } from '../services/api';

const SessionSummary = () => {
  const [sessions, setSessions] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [manualTranscript, setManualTranscript] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sessionsRes, summariesRes] = await Promise.all([
        sessionsService.getAll(),
        summaryService.getAll(),
      ]);
      setSessions(sessionsRes.data);
      setSummaries(summariesRes.data);
    } catch (err) {
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSummary = async (e) => {
    e.preventDefault();
    
    if (!selectedSession) {
      setError('Selecione uma sessão');
      return;
    }

    if (!audioFile && !manualTranscript) {
      setError('Forneça um arquivo de áudio ou uma transcrição manual');
      return;
    }

    setGenerating(true);
    setError('');

    try {
      let audioPath = null;

      // Se um arquivo foi selecionado, salvar o caminho
      if (audioFile) {
        // Em produção, você faria upload do arquivo para um servidor
        // Por enquanto, vamos simular usando o caminho do arquivo
        audioPath = audioFile.name;
      }

      const response = await summaryService.generate({
        sessionId: parseInt(selectedSession),
        audioPath,
        transcript: manualTranscript || null,
      });

      setGeneratedSummary(response.data);
      setAudioFile(null);
      setManualTranscript('');
      setSelectedSession('');
      
      // Recarregar resumos
      fetchData();
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao gerar resumo');
    } finally {
      setGenerating(false);
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
          <h1 className="text-3xl font-bold text-primary">Resumo de Sessões</h1>
        </div>
      </header>

      {error && (
        <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      {generatedSummary && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4">
          <p className="font-bold">Resumo gerado com sucesso!</p>
          <p className="text-sm mt-1">O resumo foi salvo e pode ser visualizado abaixo.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Geração de Resumo */}
        <div className="lg:col-span-1 bg-card rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Gerar Resumo</h2>
          <form onSubmit={handleGenerateSummary} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground">Sessão</label>
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-input rounded-md"
                required
              >
                <option value="">Selecione uma sessão</option>
                {sessions.map((session) => (
                  <option key={session.id} value={session.id}>
                    {session.client} - {session.date}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground">Arquivo de Áudio (Opcional)</label>
              <input
                type="file"
                accept="audio/*,video/*"
                onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                className="mt-1 block w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Formatos suportados: MP3, WAV, MP4, WebM
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground">Ou Transcrição Manual</label>
              <textarea
                value={manualTranscript}
                onChange={(e) => setManualTranscript(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-input rounded-md"
                rows="4"
                placeholder="Cole a transcrição da sessão aqui..."
              />
            </div>

            <button
              type="submit"
              disabled={generating}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {generating ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Gerando...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Gerar Resumo</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Lista de Resumos */}
        <div className="lg:col-span-2 bg-card rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Resumos Gerados</h2>
          
          {summaries.length === 0 ? (
            <p className="text-muted-foreground">Nenhum resumo gerado ainda.</p>
          ) : (
            <div className="space-y-4">
              {summaries.map((summary) => (
                <div key={summary.id} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-card-foreground">
                        Sessão #{summary.sessionId}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(summary.generatedAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                      {summary.status}
                    </span>
                  </div>

                  <div className="mt-3">
                    <p className="text-sm font-medium text-card-foreground mb-1">Resumo:</p>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {summary.summary}
                    </p>
                  </div>

                  {summary.transcript && (
                    <details className="mt-3">
                      <summary className="text-sm text-primary hover:underline cursor-pointer">
                        Ver transcrição completa
                      </summary>
                      <p className="text-xs text-muted-foreground mt-2 p-2 bg-muted rounded">
                        {summary.transcript.substring(0, 300)}...
                      </p>
                    </details>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionSummary;
