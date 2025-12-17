import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectAPI, taskAPI } from '../../services/api';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ProjectInfo from './ProjectInfo';
import TaskList from './../Task/TaskList';
import TaskModal from './../Task/TaskModal';


const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({ title: '', description: '', dueDate: '' });

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await projectAPI.getById(id);
      setProject(response.data);
    } catch {
      toast.error('Failed to fetch project');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskAPI.create({ ...taskForm, projectId: parseInt(id) });
      toast.success('Task created successfully!');
      setShowTaskModal(false);
      setTaskForm({ title: '', description: '', dueDate: '' });
      fetchProject();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      await taskAPI.toggle(taskId);
      fetchProject();
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.delete(taskId);
        toast.success('Task deleted successfully!');
        fetchProject();
      } catch {
        toast.error('Failed to delete task');
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-primary hover:text-blue-600 mb-6">
        <FaArrowLeft /> Back to Projects
      </button>

      <ProjectInfo project={project} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button onClick={() => setShowTaskModal(true)} className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition">
          <FaPlus /> Add Task
        </button>
      </div>

      <TaskList tasks={project.tasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />

      {showTaskModal && <TaskModal taskForm={taskForm} setTaskForm={setTaskForm} onSubmit={handleCreateTask} onClose={() => setShowTaskModal(false)} />}
    </div>
  );
};

export default ProjectDetail;
