import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Search, Filter, Plus, LayoutGrid, List } from 'lucide-react';
import  CreateProjectModal  from '../components/modals/CreateProjectModal';
import { useNavigate } from 'react-router-dom';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects/my-projects');
        setProjects(data);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };
    fetchProjects();
  }, []);

  // Simple filter logic
  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">All Projects</h1>
          <p className="text-gray-500">You have {projects.length} active workspaces.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
        >
          <Plus size={20} /> New Project
        </button>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text"
            placeholder="Search projects..."
            className="w-full bg-[#12141a] border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white focus:ring-2 focus:ring-blue-600 outline-none transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-[#12141a] border border-gray-800 p-3 rounded-xl text-gray-400 hover:text-white transition">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div 
            key={project.id}
            onClick={() => navigate(`/projects/${project.id}`)}
            className="group bg-[#12141a] border border-gray-800 p-6 rounded-2xl hover:border-blue-500/50 hover:bg-[#16181f] transition-all cursor-pointer relative overflow-hidden"
          >
            {/* Hover Accent */}
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-4">
              <div className="h-10 w-10 bg-blue-600/10 rounded-lg flex items-center justify-center text-blue-500 font-bold">
                {project.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded-md font-bold uppercase tracking-wider">
                Active
              </span>
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition mb-2">
              {project.name}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 h-10 mb-6">
              {project.description || "No description provided for this project."}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-600 font-medium">
              <span className="flex items-center gap-1.5">
                <LayoutGrid size={14} /> {project._count?.tasks || 0} Tasks
              </span>
              <span>Updated 2m ago</span>
            </div>
          </div>
        ))}
      </div>

      <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onProjectCreated={(newP) => setProjects([newP, ...projects])}
      />
    </div>
  );
};