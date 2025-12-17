import React from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';

const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No tasks yet. Add your first task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition ${
            task.completed ? 'opacity-60' : ''
          }`}
        >
          <button
            onClick={() => onToggle(task.id)}
            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
              task.completed
                ? 'bg-secondary border-secondary text-white'
                : 'border-gray-300 hover:border-secondary'
            }`}
          >
            {task.completed && <FaCheck size={12} />}
          </button>

          <div className="flex-1">
            <h3 className={`font-semibold ${task.completed ? 'line-through' : ''}`}>
              {task.title}
            </h3>
            {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
            {task.dueDate && (
              <p className="text-xs text-gray-500 mt-1">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            )}
          </div>

          <button
            onClick={() => onDelete(task.id)}
            className="text-danger hover:bg-red-50 p-2 rounded transition"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
