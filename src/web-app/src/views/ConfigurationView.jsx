import React, { useState, useEffect } from 'react';
import { Database, Plus, Edit2, Trash2, CheckCircle, XCircle, Loader2, Play } from 'lucide-react';
import { API_BASE } from '../config/appShellConfig';

export default function ConfigurationView() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConn, setEditingConn] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'oracle',
    host: '',
    port: '',
    database: '',
    username: '',
    password: '',
    ssl: false,
    description: '',
    is_active: true
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [isTesting, setIsTesting] = useState(null);
  
  const [aiConfig, setAiConfig] = useState({
    apiKey: '',
    model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
    enabled: true,
    discoverFree: true
  });
  const [isSavingAi, setIsSavingAi] = useState(false);

  useEffect(() => {
    fetchConnections();
    fetchAiConfig();
  }, []);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/database-connections/`);
      if (!res.ok) throw new Error('Error al carregar les connexions');
      const data = await res.json();
      setConnections(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (conn = null) => {
    if (conn) {
      setEditingConn(conn);
      setFormData({
        name: conn.name || '',
        type: conn.type || 'oracle',
        host: conn.host || '',
        port: conn.port || '',
        database: conn.database || '',
        username: conn.username || '',
        password: '', // Don't show masked password
        ssl: Boolean(conn.ssl),
        description: conn.description || '',
        is_active: Boolean(conn.is_active)
      });
    } else {
      setEditingConn(null);
      setFormData({
        name: '',
        type: 'oracle',
        host: '',
        port: '',
        database: '',
        username: '',
        password: '',
        ssl: false,
        description: '',
        is_active: true
      });
    }
    setError(null);
    setSuccessMsg(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingConn(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMsg(null);
      
      const payload = { ...formData };
      
      const url = editingConn 
        ? `${API_BASE}/database-connections/${editingConn.id}`
        : `${API_BASE}/database-connections/`;
        
      const method = editingConn ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "No s'ha pogut guardar la connexió");
      }
      
      setSuccessMsg("Connexió guardada correctament");
      await fetchConnections();
      handleCloseModal();
      
      // Clear success msg after 3s
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Segur que vols eliminar aquesta connexió?")) return;
    
    try {
      setIsDeleting(id);
      setError(null);
      const res = await fetch(`${API_BASE}/database-connections/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error("No s'ha pogut eliminar la connexió");
      
      await fetchConnections();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleTestConnection = async (id) => {
    try {
      setIsTesting(id);
      setError(null);
      setSuccessMsg(null);
      const res = await fetch(`${API_BASE}/database-connections/${id}/test`, {
        method: 'POST'
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Error al provar la connexió");
      }
      setSuccessMsg("Connexió establerta correctament: " + data.message);
      setTimeout(() => setSuccessMsg(null), 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsTesting(null);
    }
  };

  const fetchAiConfig = async () => {
    try {
      const res = await fetch(`${API_BASE}/config/ai`);
      if (res.ok) {
        const data = await res.json();
        setAiConfig({
          apiKey: data.api_key || '',
          model: data.model || 'google/gemini-2.0-flash-lite-preview-02-05:free',
          enabled: data.enabled ?? true,
          discoverFree: data.discover_free ?? true
        });
      }
    } catch (err) {
      console.error("Error carregant config IA:", err);
    }
  };

  const handleSaveAiConfig = async () => {
    try {
      setIsSavingAi(true);
      setError(null);
      const res = await fetch(`${API_BASE}/config/ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: aiConfig.apiKey,
          model: aiConfig.model,
          enabled: aiConfig.enabled,
          discover_free: aiConfig.discoverFree
        })
      });
      if (!res.ok) throw new Error("No s'ha pogut guardar la configuració d'IA");
      setSuccessMsg("Configuració d'IA guardada correctament");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSavingAi(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Database className="text-primary" />
            Connexions a BBDD
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Gestiona les credencials i rutes d'accés a les bases de dades per a l'auditoria.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
          Nova connexió
        </button>
      </div>

      {error && !isModalOpen && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md flex items-center gap-2">
          <XCircle size={18} />
          {error}
        </div>
      )}

      {successMsg && !isModalOpen && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md flex items-center gap-2">
          <CheckCircle size={18} />
          {successMsg}
        </div>
      )}

      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center items-center text-muted-foreground">
            <Loader2 className="animate-spin mr-2" /> Carregant connexions...
          </div>
        ) : connections.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No hi ha cap connexió configurada.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground uppercase">
                <tr>
                  <th className="px-6 py-3 font-medium">Nom de la connexió</th>
                  <th className="px-6 py-3 font-medium">Tipus</th>
                  <th className="px-6 py-3 font-medium">Servidor</th>
                  <th className="px-6 py-3 font-medium">Base de dades</th>
                  <th className="px-6 py-3 font-medium">Usuari</th>
                  <th className="px-6 py-3 font-medium text-center">Estat</th>
                  <th className="px-6 py-3 font-medium text-right">Accions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {connections.map((conn) => (
                  <tr key={conn.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">
                      {conn.name}
                      {conn.description && <p className="text-xs text-muted-foreground font-normal mt-1">{conn.description}</p>}
                    </td>
                    <td className="px-6 py-4 uppercase text-xs font-semibold">{conn.type}</td>
                    <td className="px-6 py-4">{conn.host}{conn.port ? `:${conn.port}` : ''}</td>
                    <td className="px-6 py-4 font-mono text-xs">{conn.database}</td>
                    <td className="px-6 py-4">{conn.username}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${conn.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {conn.is_active ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleTestConnection(conn.id)}
                        disabled={isTesting === conn.id}
                        className="text-blue-600 hover:text-blue-800 disabled:opacity-50 inline-flex items-center gap-1"
                        title="Provar connexió"
                      >
                        {isTesting === conn.id ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                      </button>
                      <button 
                        onClick={() => handleOpenModal(conn)}
                        className="text-amber-600 hover:text-amber-800 inline-flex items-center gap-1 ml-2"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(conn.id)}
                        disabled={isDeleting === conn.id}
                        className="text-destructive hover:text-destructive/80 disabled:opacity-50 inline-flex items-center gap-1 ml-2"
                        title="Eliminar"
                      >
                        {isDeleting === conn.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-background border border-border rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Database size={20} className="text-primary" />
                {editingConn ? 'Editar connexió' : 'Nova connexió'}
              </h3>
              <button onClick={handleCloseModal} className="text-muted-foreground hover:text-foreground">
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {error && (
                <div className="mb-6 bg-destructive/10 text-destructive p-3 rounded-md text-sm flex items-start gap-2">
                  <XCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              <form id="conn-form" onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Nom de la connexió *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      placeholder="Ex: Oracle Producció"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Tipus *</label>
                    <select 
                      required
                      value={formData.type}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="oracle">Oracle</option>
                      <option value="sqlite">SQLite</option>
                      <option value="postgresql">PostgreSQL</option>
                      <option value="mysql">MySQL</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-sm font-medium">Servidor (Host) *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.host}
                      onChange={e => setFormData({...formData, host: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      placeholder="Ex: 192.168.1.100 o localhost"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Port</label>
                    <input 
                      type="text" 
                      value={formData.port}
                      onChange={e => setFormData({...formData, port: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      placeholder="Ex: 1521"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Base de dades (SID/Service Name) *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.database}
                    onChange={e => setFormData({...formData, database: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Ex: ORCL"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Usuari</label>
                    <input 
                      type="text" 
                      value={formData.username}
                      onChange={e => setFormData({...formData, username: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium">
                      Contrasenya
                      {editingConn && <span className="text-xs text-muted-foreground font-normal ml-2">(deixar en blanc per no canviar)</span>}
                    </label>
                    <input 
                      type="password" 
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      placeholder={editingConn ? '********' : ''}
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="text-sm font-medium">Descripció</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background min-h-[80px]"
                    placeholder="Notes addicionals sobre aquesta connexió..."
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.is_active}
                      onChange={e => setFormData({...formData, is_active: e.target.checked})}
                      className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
                    />
                    <span className="text-sm font-medium">Activa</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={formData.ssl}
                      onChange={e => setFormData({...formData, ssl: e.target.checked})}
                      className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
                    />
                    <span className="text-sm font-medium">Utilitzar SSL</span>
                  </label>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-border bg-muted/30 flex justify-end gap-3">
              <button 
                type="button" 
                onClick={handleCloseModal}
                disabled={isSaving}
                className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-50"
              >
                Cancel·lar
              </button>
              <button 
                type="submit" 
                form="conn-form"
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden mt-6">
        <div className="p-6 border-b border-border bg-muted/20">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="p-1.5 bg-primary/10 text-primary rounded-md">
              <Play size={18} />
            </span>
            Configuració d'Intel·ligència Artificial
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Configura la connexió amb OpenRouter per habilitar l'anàlisi de codi i les recomanacions automàtiques.
          </p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                OpenRouter API Key
                <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase font-bold">Privat</span>
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  value={aiConfig.apiKey}
                  onChange={e => setAiConfig({...aiConfig, apiKey: e.target.value})}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background pr-10"
                  placeholder="sk-or-v1-..."
                />
              </div>
              <p className="text-[11px] text-muted-foreground">
                La clau es guarda localment a la teva base de dades i no es comparteix mai.
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Model d'IA per defecte</label>
              <select 
                value={aiConfig.model}
                onChange={e => setAiConfig({...aiConfig, model: e.target.value})}
                className="w-full px-3 py-2 border border-border rounded-md bg-background"
              >
                <option value="google/gemini-2.0-flash-lite-preview-02-05:free">Gemini 2.0 Flash Lite (Recomanat - Free)</option>
                <option value="google/gemini-2.0-pro-exp-02-05:free">Gemini 2.0 Pro (Free)</option>
                <option value="deepseek/deepseek-chat:free">DeepSeek V3 (Free)</option>
                <option value="openrouter/auto">Selecció automàtica OpenRouter</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={aiConfig.enabled}
                onChange={e => setAiConfig({...aiConfig, enabled: e.target.checked})}
                className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
              />
              <span className="text-sm font-medium">Habilitar funcions d'IA</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={aiConfig.discoverFree}
                onChange={e => setAiConfig({...aiConfig, discoverFree: e.target.checked})}
                className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
              />
              <span className="text-sm font-medium">Prioritzar sempre models gratuïts</span>
            </label>
          </div>
          
          <div className="flex justify-end border-t border-border pt-6">
            <button 
              onClick={handleSaveAiConfig}
              disabled={isSavingAi}
              className="flex items-center gap-2 px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors disabled:opacity-50 font-medium"
            >
              {isSavingAi ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
              Guardar Configuració IA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
