import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash, FaCheck, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Todos = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({ title: '', description: '', status: 'uncompleted' });
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    const API_BASE_URL = 'http://localhost:8080/api/v1/todo';

    const getUser = () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user?.token) {
                navigate('/login');
                return null;
            }
            return user;
        } catch (error) {
            navigate('/login');
            return null;
        }
    };

    const fetchTodos = async () => {
        const user = getUser();
        if (!user) return;

        try {
            const response = await fetch(`${API_BASE_URL}/activities`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            
            if (data.success) {
                setTodos(data.data.activities || []);
            }
        } catch (error) {
            handleAuthError(error);
        }
    };

    useEffect(() => {
        const user = getUser();
        if (user) {
            fetchTodos();
        }
    }, []);

    const handleAuthError = (error) => {
        if (error.status === 403 || error.status === 401) {
            localStorage.removeItem('user');
            navigate('/login');
        } else {
            toast.error('Operation failed. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            fetchTodos();
            return;
        }

        const user = getUser();
        if (!user) return;

        try {
            const response = await fetch(`${API_BASE_URL}/activity/search?query=${searchTerm.trim()}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();
            
            if (data.success) {
                setTodos(data.data.activities || []);
            }
        } catch (error) {
            handleAuthError(error);
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        const user = getUser();
        if (!user) return;

        if (!newTodo.title.trim() || !newTodo.description.trim()) {
            toast.error('Title and description are required');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/add/activity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    title: newTodo.title.trim(),
                    description: newTodo.description.trim(),
                    status: 'uncompleted'
                })
            });
            const data = await response.json();

            if (data.success) {
                toast.success('Todo added successfully!');
                setNewTodo({ title: '', description: '', status: 'uncompleted' });
                setShowAddForm(false);
                fetchTodos();
            }
        } catch (error) {
            handleAuthError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const user = getUser();
        if (!user) return;

        try {
            const response = await fetch(`${API_BASE_URL}/activity/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const data = await response.json();

            if (data.success) {
                toast.success('Todo deleted successfully!');
                fetchTodos();
            }
        } catch (error) {
            handleAuthError(error);
        }
    };

    const handleToggleStatus = async (todo) => {
        const user = getUser();
        if (!user) return;

        try {
            const newStatus = todo.status === 'completed' ? 'uncompleted' : 'completed';
            const response = await fetch(`${API_BASE_URL}/activity/${todo.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });
            const data = await response.json();

            if (data.success) {
                fetchTodos();
                toast.success('Status updated successfully');
            }
        } catch (error) {
            handleAuthError(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Todo List</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex gap-4 mb-6">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search todos..."
                            className="flex-1 p-2 border rounded"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            <FaSearch />
                        </button>
                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            <FaPlus />
                        </button>
                    </div>

                    {showAddForm && (
                        <form onSubmit={handleAddTodo} className="mb-6">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={newTodo.title}
                                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                                    placeholder="Todo title"
                                    className="w-full p-2 border rounded mb-2"
                                />
                                <textarea
                                    value={newTodo.description}
                                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                                    placeholder="Todo description"
                                    className="w-full p-2 border rounded"
                                    rows="3"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                            >
                                {loading ? 'Adding...' : 'Add Todo'}
                            </button>
                        </form>
                    )}

                    <div className="space-y-4">
                        {todos.map((todo) => (
                            <div
                                key={todo.id}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded"
                            >
                                <div className="flex-1">
                                    <h3 className="font-semibold">{todo.title}</h3>
                                    <p className="text-gray-600">{todo.description}</p>
                                    <span className={`text-sm ${
                                        todo.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                                    }`}>
                                        {todo.status}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleToggleStatus(todo)}
                                        className="text-green-500 hover:text-green-600"
                                    >
                                        <FaCheck />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(todo.id)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todos;
