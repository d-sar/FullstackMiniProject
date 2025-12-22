import React from 'react';
import { FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const ProjectInfo = ({ project }) => {
  // Determine status based on progress
  const getStatus = () => {
    const progress = project.progressPercentage;
    if (progress === 100) return { 
      label: 'Completed', 
      color: 'green', 
      icon: FaCheckCircle,
      bgClass: 'bg-green-50',
      textClass: 'text-green-800',
      badgeClass: 'bg-green-100 text-green-800 border-green-300',
      progressBar: 'bg-green-500'
    };
    if (progress > 0) return { 
      label: 'In Progress', 
      color: 'orange', 
      icon: FaClock,
      bgClass: 'bg-orange-50',
      textClass: 'text-orange-800',
      badgeClass: 'bg-orange-100 text-orange-800 border-orange-300',
      progressBar: 'bg-orange-500'
    };
    return { 
      label: 'Incomplete', 
      color: 'red', 
      icon: FaExclamationCircle,
      bgClass: 'bg-red-50',
      textClass: 'text-red-800',
      badgeClass: 'bg-red-100 text-red-800 border-red-300',
      progressBar: 'bg-red-500'
    };
  };

  const status = getStatus();
  const StatusIcon = status.icon;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {/* Status Banner */}
      <div className={`${status.bgClass} px-6 py-4 border-b-4 border-${status.color}-500`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StatusIcon className={`text-2xl ${status.textClass}`} />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{project.title}</h1>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border mt-2 ${status.badgeClass}`}>
                {status.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6">
        <p className="text-gray-600 mb-4">{project.description || 'No description'}</p>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span className="font-semibold">Overall Progress</span>
            <span className="font-bold text-lg">{project.progressPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
            <div
              className={`h-4 rounded-full transition-all ${status.progressBar} shadow-sm`}
              style={{ width: `${project.progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{project.completedTasks}</span> of <span className="font-semibold">{project.totalTasks}</span> tasks completed
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{project.totalTasks - project.completedTasks}</span> remaining
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;