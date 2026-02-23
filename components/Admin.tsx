import React, { useState } from 'react';
import { PortfolioItem, ProjectCategory } from '../types';
import { Trash2, Plus, Edit2, Save, X, LogOut, Check } from 'lucide-react';
import Logo from './Logo';

interface AdminProps {
  portfolioData: PortfolioItem[];
  onUpdate: (newData: PortfolioItem[]) => void;
  onLogout: () => void;
}

const emptyItem: PortfolioItem = {
  id: '',
  title: '',
  client: '',
  year: new Date().getFullYear(),
  month: 1,
  location: '',
  description: '',
  category: ProjectCategory.EXHIBITION,
  tags: [],
  mainImageUrl: '',
  galleryImages: []
};

const Admin: React.FC<AdminProps> = ({ portfolioData, onUpdate, onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PortfolioItem>(emptyItem);
  const [isAdding, setIsAdding] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (password === 'arc1234') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password (Try: arc1234)');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const newData = portfolioData.filter(item => item.id !== id);
      onUpdate(newData);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setFormData({ ...item });
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      ...emptyItem,
      id: `new-${Date.now()}`,
      galleryImages: ['', '', '', '', '', ''] // 6 Placeholders
    });
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.title || !formData.year) {
      alert('Title and Year are required.');
      return;
    }

    let newData = [...portfolioData];
    
    if (isAdding) {
      newData = [formData, ...newData];
    } else {
      const index = newData.findIndex(item => item.id === formData.id);
      if (index !== -1) {
        newData[index] = formData;
      }
    }

    onUpdate(newData);
    setEditingId(null);
    setIsAdding(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'month' ? parseInt(value) : value
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      tags: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '')
    }));
  };

  const handleGalleryChange = (index: number, value: string) => {
    const newGallery = [...formData.galleryImages];
    newGallery[index] = value;
    setFormData(prev => ({ ...prev, galleryImages: newGallery }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center container mx-auto px-4 z-20 relative">
        <div className="bg-arc-gray p-8 rounded-2xl border border-white/10 w-full max-w-md shadow-2xl">
          {/* Logo added to login screen */}
          <div className="flex justify-center mb-8">
            <Logo className="h-24 w-auto mix-blend-screen opacity-90" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:border-arc-accent outline-none"
                placeholder="Enter password..."
              />
            </div>
            <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded hover:bg-arc-accent hover:text-white transition-colors">
              Login
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">Hint: arc1234</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 container mx-auto px-6 z-20 relative">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Project Manager</h1>
          <p className="text-gray-400 text-sm mt-1">Manage portfolio entries (2020-2026+)</p>
        </div>
        <div className="flex gap-4">
           <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 rounded border border-white/20 text-gray-400 hover:text-white hover:border-white transition-colors">
            <LogOut size={16} /> Exit
          </button>
          <button onClick={handleAddNew} className="flex items-center gap-2 bg-arc-accent text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors font-semibold">
            <Plus size={18} /> Add Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List View */}
        <div className="lg:col-span-1 space-y-4 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
          {portfolioData.map((item) => (
            <div 
              key={item.id} 
              onClick={() => handleEdit(item)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                editingId === item.id 
                ? 'bg-arc-accent/10 border-arc-accent' 
                : 'bg-arc-gray/30 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-bold">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">{item.year}</span>
                      <span className="text-xs text-gray-500 truncate max-w-[150px]">{item.client}</span>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                  className="text-gray-500 hover:text-red-500 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Editor View */}
        <div className="lg:col-span-2">
          {(editingId || isAdding) ? (
            <div className="bg-arc-gray/50 border border-white/10 rounded-xl p-6 md:p-8">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {isAdding ? <Plus size={20} /> : <Edit2 size={20} />}
                    {isAdding ? 'Create New Project' : 'Edit Project'}
                  </h3>
                  <button onClick={() => { setEditingId(null); setIsAdding(false); }} className="text-gray-400 hover:text-white">
                    <X size={24} />
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Title</label>
                    <input name="title" value={formData.title} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Client</label>
                    <input name="client" value={formData.client} onChange={handleInputChange} className="admin-input" />
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Year</label>
                    <input type="number" name="year" value={formData.year} onChange={handleInputChange} className="admin-input" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Month (1-12)</label>
                    <input type="number" name="month" value={formData.month} onChange={handleInputChange} min="1" max="12" className="admin-input" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="admin-input">
                        <option value={ProjectCategory.EXHIBITION}>Exhibition</option>
                        <option value={ProjectCategory.EVENT}>Event</option>
                        <option value={ProjectCategory.INSTALLATION}>Installation</option>
                    </select>
                  </div>
               </div>

               <div className="mb-4">
                  <label className="block text-xs text-gray-400 mb-1">Location</label>
                  <input name="location" value={formData.location} onChange={handleInputChange} className="admin-input" />
               </div>

               <div className="mb-4">
                  <label className="block text-xs text-gray-400 mb-1">Description</label>
                  <textarea name="description" rows={3} value={formData.description} onChange={handleInputChange} className="admin-input" />
               </div>

               <div className="mb-4">
                  <label className="block text-xs text-gray-400 mb-1">Tags (comma separated)</label>
                  <input name="tags" value={formData.tags.join(', ')} onChange={handleTagsChange} className="admin-input" />
               </div>

               <div className="mb-6">
                  <label className="block text-xs text-gray-400 mb-1">Main Image URL</label>
                  <input name="mainImageUrl" value={formData.mainImageUrl} onChange={handleInputChange} className="admin-input" />
                  {formData.mainImageUrl && (
                      <div className="mt-2 h-32 rounded overflow-hidden bg-black/40">
                          <img src={formData.mainImageUrl} className="h-full w-full object-cover opacity-60" alt="Preview" />
                      </div>
                  )}
               </div>

                <div className="mb-6">
                  <label className="block text-xs text-gray-400 mb-2">Gallery Images (URLs)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {formData.galleryImages.map((url, idx) => (
                        <input 
                            key={idx}
                            value={url} 
                            onChange={(e) => handleGalleryChange(idx, e.target.value)} 
                            className="admin-input text-xs" 
                            placeholder={`Image URL ${idx + 1}`}
                        />
                    ))}
                  </div>
               </div>

               <div className="flex justify-end pt-4 border-t border-white/10">
                  <button onClick={handleSave} className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded font-bold hover:bg-gray-200 transition-colors">
                    <Save size={18} /> Save Project
                  </button>
               </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-xl min-h-[400px]">
                <p>Select a project to edit or create a new one.</p>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .admin-input {
            width: 100%;
            background-color: rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.1);
            color: white;
            padding: 0.75rem;
            border-radius: 0.5rem;
            outline: none;
            transition: border-color 0.2s;
        }
        .admin-input:focus {
            border-color: #3b82f6;
        }
      `}</style>
    </div>
  );
};

export default Admin;