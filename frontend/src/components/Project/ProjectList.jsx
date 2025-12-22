import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectAPI } from '../../services/api';
import { toast } from 'react-toastify';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { FaPlus, FaSearch, FaTimes } from 'react-icons/fa';
import '../../styles/project.css'

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [progressFilter, setProgressFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm, progressFilter]);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getAll();
      setProjects(response.data);
    } catch {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const sortProjectsByStatus = (projectsToSort) => {
    return [...projectsToSort].sort((a, b) => {
      // Priority: Incomplete (0%) > In Progress (1-99%) > Completed (100%)
      const getStatusPriority = (progress) => {
        if (progress === 100) return 3; // Completed - lowest priority (bottom)
        if (progress > 0) return 2; // In Progress - medium priority
        return 1; // Incomplete - highest priority (top)
      };

      const priorityA = getStatusPriority(a.progressPercentage);
      const priorityB = getStatusPriority(b.progressPercentage);

      // Sort by priority first
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // If same priority, sort by title alphabetically
      return a.title.localeCompare(b.title);
    });
  };

  const filterProjects = () => {
    let filtered = [...projects];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by progress
    if (progressFilter !== 'all') {
      filtered = filtered.filter(project => {
        const progress = project.progressPercentage;
        switch (progressFilter) {
          case 'not-started':
            return progress === 0;
          case 'in-progress':
            return progress > 0 && progress < 100;
          case 'completed':
            return progress === 100;
          default:
            return true;
        }
      });
    }

    // Sort projects: Incomplete and In Progress first, Completed last
    filtered = sortProjectsByStatus(filtered);

    setFilteredProjects(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.delete(id);
        toast.success('Project deleted successfully!');
        fetchProjects();
      } catch {
        toast.error('Failed to delete project');
      }
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  const handleSuccess = () => {
    setShowModal(false);
    setEditingProject(null);
    fetchProjects();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setProgressFilter('all');
  };

  // Get status counts for display
  const getStatusCounts = () => {
    const incomplete = projects.filter(p => p.progressPercentage === 0).length;
    const inProgress = projects.filter(p => p.progressPercentage > 0 && p.progressPercentage < 100).length;
    const completed = projects.filter(p => p.progressPercentage === 100).length;
    return { incomplete, inProgress, completed };
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Projects</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
        >
          <FaPlus /> New Project
        </button>
      </div>

      {/* Status Summary Cards */}
    {/* Status Overview */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

  {/* Incomplete */}
  <div className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-md border border-red-100">
    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100">
      <span className="text-red-600 text-2xl font-bold">
        {statusCounts.incomplete}
      </span>
    </div>
    <div>
      <h3 className="text-red-700 font-semibold">Incomplete</h3>
      <p className="text-sm text-gray-500">Not started yet</p>
    </div>
  </div>

  {/* In Progress */}
  <div className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-md border border-orange-100">
    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-100">
      <span className="text-orange-600 text-2xl font-bold">
        {statusCounts.inProgress}
      </span>
    </div>
    <div>
      <h3 className="text-orange-700 font-semibold">In Progress</h3>
      <p className="text-sm text-gray-500">Currently active</p>
    </div>
  </div>

  {/* Completed */}
  <div className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-md border border-green-100">
    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100">
      <span className="text-green-600 text-2xl font-bold">
        {statusCounts.completed}
      </span>
    </div>
    <div>
      <h3 className="text-green-700 font-semibold">Completed</h3>
      <p className="text-sm text-gray-500">Finished projects</p>
    </div>
  </div>

</div>


      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search by name */}
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              <FaSearch className="inline mr-2" />
              Search by name
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Filter by progress */}
          <div>
            <label className="block text-gray-700 mb-2 font-semibold">
              Filter by status
            </label>
            <select
              value={progressFilter}
              onChange={(e) => setProgressFilter(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Projects</option>
              <option value="not-started"> Incomplete (0%)</option>
              <option value="in-progress"> In Progress (1-99%)</option>
              <option value="completed"> Completed (100%)</option>
            </select>
          </div>
        </div>

        {/* Clear filters button */}
        {(searchTerm || progressFilter !== 'all') && (
          <div className="mt-4">
            <button
              onClick={clearFilters}
              className="text-primary hover:text-blue-600 flex items-center gap-2"
            >
              <FaTimes /> Clear all filters
            </button>
          </div>
        )}

        {/* Results count and sorting info */}
        <div className="mt-4 text-sm text-gray-600 flex items-center justify-between">
          <span>Showing {filteredProjects.length} of {projects.length} projects</span>
          <span className="text-xs italic">📌 Completed projects are automatically moved to the bottom</span>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {projects.length === 0 
              ? 'No projects yet. Create your first project!' 
              : 'No projects match your filters.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={() => handleDelete(project.id)}
              onEdit={() => handleEdit(project)}
              onView={() => navigate(`/projects/${project.id}`)}
            />
          ))}
        </div>
      )}

      {showModal && (
        <ProjectModal
          project={editingProject}
          onClose={handleCloseModal}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default ProjectList;