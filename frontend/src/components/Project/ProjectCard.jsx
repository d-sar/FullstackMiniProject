import React from 'react';
import { FaEye, FaTrash, FaEdit, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const ProjectCard = ({ project, onView, onDelete, onEdit }) => {
  // Determine status based on progress
  const getStatus = () => {
    const progress = project.progressPercentage;
    if (progress === 100) return { label: 'Completed', color: 'green', icon: FaCheckCircle };
    if (progress > 0) return { label: 'In Progress', color: 'orange', icon: FaClock };
    return { label: 'Incomplete', color: 'red', icon: FaExclamationCircle };
  };

  const status = getStatus();
  const StatusIcon = status.icon;

  // Color classes for different statuses
  const statusColors = {
    green: {
      badge: 'bg-green-100 text-green-800 border-green-300',
      progressBar: 'bg-green-500',
      card: 'border-l-4 border-green-500'
    },
    orange: {
      badge: 'bg-orange-100 text-orange-800 border-orange-300',
      progressBar: 'bg-orange-500',
      card: 'border-l-4 border-orange-500'
    },
    red: {
      badge: 'bg-red-100 text-red-800 border-red-300',
      progressBar: 'bg-red-500',
      card: 'border-l-4 border-red-500'
    }
  };

  const colors = statusColors[status.color];

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition ${colors.card}`}>
      {/* Status Badge */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${colors.badge}`}>
          <StatusIcon size={12} />
          {status.label}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{project.description || 'No description'}</p>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span className="font-semibold">{project.progressPercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${colors.progressBar}`}
            style={{ width: `${project.progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {project.completedTasks} / {project.totalTasks} tasks completed
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onView}
          className="flex-1 bg-primary text-white py-2 rounded hover:bg-blue-600 transition flex items-center justify-center gap-2"
        >
          <FaEye /> View
        </button>
        <button
          onClick={onEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          <FaEdit />
        </button>
        <button
          onClick={onDelete}
          className="bg-danger text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;