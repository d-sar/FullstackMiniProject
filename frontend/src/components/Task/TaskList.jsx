import React, { useState, useEffect } from 'react';
import { FaCheck, FaTrash, FaEdit, FaSearch, FaTimes } from 'react-icons/fa';


const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    filterTasks();
  }, [tasks, searchTerm]);

  const filterTasks = () => {
    let filtered = [...tasks];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredTasks(filtered);
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No tasks yet. Add your first task!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
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
                placeholder="Search tasks..."
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
        </div>
      </div>
      {/* Task List */}
      {filteredTasks.length === 0 && searchTerm ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No tasks found matching "{searchTerm}"</p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id} className={`bg-white rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition ${task.completed ? 'opacity-60' : ''}`}>
            {/* Task content here */}
            <button
              onClick={() => onToggle(task.id)}
              className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition ${task.completed
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
              onClick={() => onEdit(task)}
              className="text-blue-500 hover:bg-blue-50 p-2 rounded transition"
            >
              <FaEdit />
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="text-danger hover:bg-red-50 p-2 rounded transition"
            >
              <FaTrash />
            </button>
          </div>
        ))
      )}
    </div>
  );
};
export default TaskList;