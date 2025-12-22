import React, { useState, useEffect } from 'react';
import { projectAPI } from '../../services/api';
import { toast } from 'react-toastify';

const ProjectModal = ({ project, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const isEditing = !!project;

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description || ''
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await projectAPI.update(project.id, formData);
        toast.success('Project updated successfully!');
      } else {
        await projectAPI.create(formData);
        toast.success('Project created successfully!');
      }
      setFormData({ title: '', description: '' });
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} project`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? 'Edit Project' : 'Create New Project'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
              minLength={3}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              {isEditing ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;