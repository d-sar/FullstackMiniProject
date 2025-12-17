import React from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';

const ProjectCard = ({ project, onView, onDelete }) => (
  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
    <p className="text-gray-600 mb-4 line-clamp-2">{project.description || 'No description'}</p>

    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Progress</span>
        <span>{project.progressPercentage.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-secondary h-2 rounded-full transition-all"
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
        onClick={onDelete}
        className="bg-danger text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        <FaTrash />
      </button>
    </div>
  </div>
);

export default ProjectCard;
