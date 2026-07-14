import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { 
  FolderGit, 
  Award, 
  MessageSquare, 
  LogOut, 
  Plus, 
  Trash2, 
  Check, 
  Mail, 
  ShieldCheck,
  Code
} from 'lucide-react';
import axios from 'axios';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('messages'); // 'messages' | 'projects' | 'certs'
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certs, setCerts] = useState([]);

  // Forms states
  const [projectForm, setProjectForm] = useState({ title: '', description: '', techStack: '', githubLink: '', liveLink: '' });
  const [certForm, setCertForm] = useState({ title: '', issuer: '', issueDate: '', link: '' });

  const getHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const msgsRes = await axios.get('/api/messages', getHeaders());
      setMessages(msgsRes.data);
    } catch (err) { console.error('Error fetching messages', err); }

    try {
      const projRes = await axios.get('/api/projects');
      setProjects(projRes.data);
    } catch (err) { console.error('Error fetching projects', err); }

    try {
      const certRes = await axios.get('/api/certificates');
      setCerts(certRes.data);
    } catch (err) { console.error('Error fetching certificates', err); }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // Message actions
  const handleMarkRead = async (id) => {
    try {
      await axios.put(`/api/messages/${id}/read`, {}, getHeaders());
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleDeleteMsg = async (id) => {
    if (!window.confirm('Delete message?')) return;
    try {
      await axios.delete(`/api/messages/${id}`, getHeaders());
      fetchData();
    } catch (err) { console.error(err); }
  };

  // Project action
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) return;
    
    const body = {
      ...projectForm,
      techStack: projectForm.techStack.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      await axios.post('/api/projects', body, getHeaders());
      setProjectForm({ title: '', description: '', techStack: '', githubLink: '', liveLink: '' });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete project?')) return;
    try {
      await axios.delete(`/api/projects/${id}`, getHeaders());
      fetchData();
    } catch (err) { console.error(err); }
  };

  // Cert action
  const handleAddCert = async (e) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer) return;

    try {
      await axios.post('/api/certificates', certForm, getHeaders());
      setCertForm({ title: '', issuer: '', issueDate: '', link: '' });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const handleDeleteCert = async (id) => {
    if (!window.confirm('Delete certificate?')) return;
    try {
      await axios.delete(`/api/certificates/${id}`, getHeaders());
      fetchData();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col">
      {/* Top Header */}
      <header className="border-b border-white/5 py-4 px-8 bg-black/40 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="text-accent-blue" />
          <h1 className="text-lg font-bold tracking-wide">Kumaran Portfolio Control Room</h1>
        </div>
        <GlowingButton variant="secondary" onClick={handleLogout} className="py-1.5 px-4 text-xs">
          <LogOut size={14} />
          <span>Sign Out</span>
        </GlowingButton>
      </header>

      {/* Main View Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Navigation Sidebar Tabs */}
        <aside className="lg:col-span-3 space-y-3">
          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between p-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === 'messages'
                ? 'bg-accent-blue text-white shadow-[0_0_15px_rgba(0,102,204,0.3)]'
                : 'bg-white/5 text-white/60 border border-white/5 hover:bg-white/10'
            }`}
          >
            <span className="flex items-center space-x-2">
              <MessageSquare size={16} />
              <span>Inbox Messages</span>
            </span>
            <span className="bg-black/40 py-0.5 px-2 rounded-full text-[10px]">
              {messages.filter(m => !m.isRead).length} new
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center space-x-2 p-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-accent-purple text-white shadow-[0_0_15px_rgba(134,34,230,0.3)]'
                : 'bg-white/5 text-white/60 border border-white/5 hover:bg-white/10'
            }`}
          >
            <FolderGit size={16} />
            <span>Manage Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('certs')}
            className={`w-full flex items-center space-x-2 p-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === 'certs'
                ? 'bg-accent-cyan text-black shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                : 'bg-white/5 text-white/60 border border-white/5 hover:bg-white/10'
            }`}
          >
            <Award size={16} />
            <span>Certifications</span>
          </button>
        </aside>

        {/* Tab display viewport */}
        <section className="lg:col-span-9 space-y-6">
          
          {/* MESSAGES VIEW */}
          {activeTab === 'messages' && (
            <GlassCard className="space-y-6" glowColor="rgba(0, 102, 204, 0.1)">
              <h2 className="text-xl font-bold text-white tracking-wide">Contact Message Feed</h2>
              
              {messages.length === 0 ? (
                <p className="text-white/40 text-sm py-12 text-center">No messages received yet.</p>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg._id} 
                      className={`p-4 rounded-xl border transition-all ${
                        msg.isRead 
                          ? 'bg-white/2 border-white/5 opacity-60' 
                          : 'bg-white/5 border-accent-blue/20'
                      }`}
                    >
                      <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                        <div>
                          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                            <Mail size={14} className="text-accent-blue" />
                            <span>{msg.name}</span>
                            <span className="text-[10px] text-white/40 font-light">({msg.email})</span>
                          </h4>
                          <p className="text-xs text-accent-blue font-medium mt-1">Sub: {msg.subject}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          {!msg.isRead && (
                            <button
                              onClick={() => handleMarkRead(msg._id)}
                              className="p-1.5 bg-accent-blue/15 hover:bg-accent-blue text-accent-blue hover:text-white rounded-lg transition-all"
                              title="Mark as Read"
                            >
                              <Check size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteMsg(msg._id)}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-white/70 leading-relaxed font-light mt-2 bg-black/30 p-3 rounded-lg border border-white/5">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          )}

          {/* PROJECTS VIEW */}
          {activeTab === 'projects' && (
            <div className="space-y-8">
              {/* Add form */}
              <GlassCard className="p-6 space-y-4" glowColor="rgba(134, 34, 230, 0.15)">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus size={18} className="text-accent-purple" />
                  <span>Create Project Profile</span>
                </h3>
                
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Project Title (e.g. Gym Tracker)"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="glass-input p-3 rounded-xl text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Tech Stack (comma separated: React, Node, etc.)"
                      value={projectForm.techStack}
                      onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                      className="glass-input p-3 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="url"
                      placeholder="Github URL"
                      value={projectForm.githubLink}
                      onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                      className="glass-input p-3 rounded-xl text-xs text-white"
                    />
                    <input
                      type="url"
                      placeholder="Live Demo URL"
                      value={projectForm.liveLink}
                      onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
                      className="glass-input p-3 rounded-xl text-xs text-white"
                    />
                  </div>

                  <textarea
                    required
                    placeholder="Project details description..."
                    rows={4}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full glass-input p-3 rounded-xl text-xs text-white resize-none"
                  />

                  <GlowingButton type="submit" variant="accent" className="w-full text-xs py-2.5">
                    <span>Publish Project</span>
                  </GlowingButton>
                </form>
              </GlassCard>

              {/* List */}
              <GlassCard className="space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Code size={18} className="text-accent-blue" />
                  <span>Existing Projects ({projects.length})</span>
                </h3>

                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj._id || proj.id} className="flex justify-between items-center bg-white/3 p-4 rounded-xl border border-white/5">
                      <div>
                        <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {proj.techStack.map((tech, i) => (
                            <span key={i} className="text-[9px] uppercase tracking-wider text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(proj._id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

          {/* CERTIFICATIONS VIEW */}
          {activeTab === 'certs' && (
            <div className="space-y-8">
              {/* Add form */}
              <GlassCard className="p-6 space-y-4" glowColor="rgba(0, 242, 254, 0.15)">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus size={18} className="text-accent-cyan" />
                  <span>Register Certification</span>
                </h3>

                <form onSubmit={handleAddCert} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Certificate Title"
                      value={certForm.title}
                      onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                      className="glass-input p-3 rounded-xl text-xs text-white"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Issuer (e.g. Cisco, Coursera)"
                      value={certForm.issuer}
                      onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                      className="glass-input p-3 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Issue Date"
                      value={certForm.issueDate}
                      onChange={(e) => setCertForm({ ...certForm, issueDate: e.target.value })}
                      className="glass-input p-3 rounded-xl text-xs text-white"
                    />
                    <input
                      type="url"
                      placeholder="Credential Link"
                      value={certForm.link}
                      onChange={(e) => setCertForm({ ...certForm, link: e.target.value })}
                      className="glass-input p-3 rounded-xl text-xs text-white"
                    />
                  </div>

                  <GlowingButton type="submit" variant="accent" className="w-full text-xs py-2.5">
                    <span>Register Credential</span>
                  </GlowingButton>
                </form>
              </GlassCard>

              {/* List */}
              <GlassCard className="space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Award size={18} className="text-accent-cyan" />
                  <span>Registered Credentials ({certs.length})</span>
                </h3>

                <div className="space-y-3">
                  {certs.map((c) => (
                    <div key={c._id} className="flex justify-between items-center bg-white/3 p-4 rounded-xl border border-white/5">
                      <div>
                        <h4 className="text-sm font-bold text-white">{c.title}</h4>
                        <p className="text-xs text-white/40 mt-0.5">{c.issuer}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteCert(c._id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all"
                        title="Delete Certificate"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}
