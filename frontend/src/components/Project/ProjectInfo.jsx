import React from 'react';

const ProjectInfo = ({ project }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
    <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
    <p className="text-gray-600 mb-4">{project.description || 'No description'}</p>

    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Overall Progress</span>
        <span>{project.progressPercentage.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-secondary h-3 rounded-full transition-all"
          style={{ width: `${project.progressPercentage}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        {project.completedTasks} of {project.totalTasks} tasks completed
      </p>
    </div>
  </div>
);

export default ProjectInfo;
