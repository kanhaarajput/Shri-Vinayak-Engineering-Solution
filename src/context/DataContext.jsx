import { createContext, useContext, useState, useEffect } from 'react';
import { CATEGORIES as INITIAL_CATEGORIES } from '../data/galleryData';
import { INITIAL_SITE_CONTENT } from '../data/siteContentData';

const DataContext = createContext();
const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('shri_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [team, setTeam] = useState([]);
  const [siteContent, setSiteContent] = useState(INITIAL_SITE_CONTENT);
  const [futureVision, setFutureVision] = useState({});
  const [machines, setMachines] = useState([]);
  const [goals, setGoals] = useState([]);
  const [innovation, setInnovation] = useState({});
  const [beforeAfter, setBeforeAfter] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('shri_admin_auth') === 'true';
  });

  // Fetch initial data from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesRes, galleryRes, contentRes, messagesRes, teamRes, visionRes, machinesRes, goalsRes, innovationRes, beforeAfterRes, videosRes] = await Promise.all([
          fetch(`${API_URL}/services`),
          fetch(`${API_URL}/gallery`),
          fetch(`${API_URL}/site-content`),
          fetch(`${API_URL}/messages`),
          fetch(`${API_URL}/team`),
          fetch(`${API_URL}/future-vision`),
          fetch(`${API_URL}/machines`),
          fetch(`${API_URL}/goals`),
          fetch(`${API_URL}/innovation`),
          fetch(`${API_URL}/before-after`),
          fetch(`${API_URL}/videos`)
        ]);

        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData.map(s => ({ ...s, id: s._id })));
        }
        
        if (galleryRes.ok) {
          const galleryData = await galleryRes.json();
          setProjects(galleryData.map(p => ({ ...p, id: p._id })));
        }

        if (contentRes.ok) {
          const contentData = await contentRes.json();
          if (contentData) {
            setSiteContent(contentData);
          }
        }

        if (messagesRes.ok) {
          const messagesData = await messagesRes.json();
          setMessages(messagesData.map(m => ({ ...m, id: m._id })));
        }

        if (teamRes.ok) {
          const teamData = await teamRes.json();
          setTeam(teamData.map(t => ({ ...t, id: t._id })));
        }

        if (visionRes.ok) {
          setFutureVision(await visionRes.json());
        }

        if (machinesRes.ok) {
          const machinesData = await machinesRes.json();
          setMachines(machinesData.map(m => ({ ...m, id: m._id })));
        }

        if (goalsRes.ok) {
          const goalsData = await goalsRes.json();
          setGoals(goalsData.map(g => ({ ...g, id: g._id })));
        }

        if (innovationRes.ok) {
          setInnovation(await innovationRes.json());
        }

        if (beforeAfterRes.ok) {
          const baData = await beforeAfterRes.json();
          setBeforeAfter(baData.map(b => ({ ...b, id: b._id })));
        }

        if (videosRes.ok) {
          const vData = await videosRes.json();
          setVideos(vData.map(v => ({ ...v, id: v._id })));
        }
      } catch (err) {
        console.error("Error fetching data from MongoDB:", err);
        setError("Failed to connect to database. Please check if the server is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sync auth and categories to localStorage (not migrated to MongoDB yet)
  useEffect(() => {
    localStorage.setItem('shri_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('shri_admin_auth', isAuthenticated);
  }, [isAuthenticated]);

  // Auth Methods
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsAuthenticated(false);
  };

  // Gallery Methods
  const addProject = async (project) => {
    try {
      const isFormData = project instanceof FormData;
      const res = await fetch(`${API_URL}/gallery`, {
        method: 'POST',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? project : JSON.stringify(project)
      });
      if (res.ok) {
        const newProject = await res.json();
        setProjects((prev) => [...prev, { ...newProject, id: newProject._id }]);
      }
    } catch (err) { console.error(err); }
  };

  const updateProject = async (id, updatedProject) => {
    try {
      const isFormData = updatedProject instanceof FormData;
      const res = await fetch(`${API_URL}/gallery/${id}`, {
        method: 'PUT',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? updatedProject : JSON.stringify(updatedProject)
      });
      if (res.ok) {
        const newProject = await res.json();
        setProjects((prev) => prev.map((p) => (p.id === id ? { ...newProject, id: newProject._id } : p)));
      }
    } catch (err) { console.error(err); }
  };

  const deleteProject = async (id) => {
    try {
      const res = await fetch(`${API_URL}/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) { console.error(err); }
  };
  
  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };
  
  const deleteCategory = (category) => {
    setCategories(categories.filter(c => c !== category));
  };

  // Services Methods
  const addService = async (service) => {
    try {
      const isFormData = service instanceof FormData;
      const res = await fetch(`${API_URL}/services`, {
        method: 'POST',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? service : JSON.stringify(service)
      });
      if (res.ok) {
        const newService = await res.json();
        setServices((prev) => [...prev, { ...newService, id: newService._id }]);
      }
    } catch (err) { console.error(err); }
  };

  const updateService = async (id, updatedService) => {
    try {
      const isFormData = updatedService instanceof FormData;
      const res = await fetch(`${API_URL}/services/${id}`, {
        method: 'PUT',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? updatedService : JSON.stringify(updatedService)
      });
      if (res.ok) {
        const newService = await res.json();
        setServices((prev) => prev.map((s) => (s.id === id ? { ...newService, id: newService._id } : s)));
      }
    } catch (err) { console.error(err); }
  };

  const deleteService = async (id) => {
    try {
      const res = await fetch(`${API_URL}/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) { console.error(err); }
  };
  
  // Site Content Methods
  const updateSiteContent = async (section, newContent) => {
    const updatedState = {
      ...siteContent,
      [section]: {
        ...siteContent[section],
        ...newContent
      }
    };
    
    // Optimistic update
    setSiteContent(updatedState);

    try {
      await fetch(`${API_URL}/site-content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedState)
      });
    } catch (err) { console.error(err); }
  };

  // Messages Methods (Admin Inbox)
  const deleteMessage = async (id) => {
    try {
      const res = await fetch(`${API_URL}/messages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) { console.error(err); }
  };

  // Team Methods
  const addTeamMember = async (member) => {
    try {
      const isFormData = member instanceof FormData;
      const res = await fetch(`${API_URL}/team`, {
        method: 'POST',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? member : JSON.stringify(member)
      });
      if (res.ok) {
        const newMember = await res.json();
        setTeam((prev) => [...prev, { ...newMember, id: newMember._id }]);
      }
    } catch (err) { console.error(err); }
  };

  const updateTeamMember = async (id, updatedMember) => {
    try {
      const isFormData = updatedMember instanceof FormData;
      const res = await fetch(`${API_URL}/team/${id}`, {
        method: 'PUT',
        headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
        body: isFormData ? updatedMember : JSON.stringify(updatedMember)
      });
      if (res.ok) {
        const newMember = await res.json();
        setTeam((prev) => prev.map((t) => (t.id === id ? { ...newMember, id: newMember._id } : t)));
      }
    } catch (err) { console.error(err); }
  };

  const deleteTeamMember = async (id) => {
    try {
      const res = await fetch(`${API_URL}/team/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTeam((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) { console.error(err); }
  };

  // Before/After Methods
  const addBeforeAfter = async (item) => {
    try {
      const res = await fetch(`${API_URL}/before-after`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        const newItem = await res.json();
        setBeforeAfter((prev) => [newItem, ...prev]);
      }
    } catch (err) { console.error(err); }
  };

  const deleteBeforeAfter = async (id) => {
    try {
      const res = await fetch(`${API_URL}/before-after/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBeforeAfter((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) { console.error(err); }
  };

  // Video Methods
  const addVideo = async (video) => {
    try {
      const res = await fetch(`${API_URL}/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video)
      });
      if (res.ok) {
        const newVideo = await res.json();
        setVideos((prev) => [newVideo, ...prev]);
      }
    } catch (err) { console.error(err); }
  };

  const deleteVideo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/videos/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setVideos((prev) => prev.filter((v) => v.id !== id));
      }
    } catch (err) { console.error(err); }
  };

  const value = {
    categories,
    projects,
    services,
    siteContent,
    messages,
    team,
    futureVision,
    machines,
    goals,
    innovation,
    beforeAfter,
    videos,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    addProject,
    updateProject,
    deleteProject,
    addCategory,
    deleteCategory,
    addService,
    updateService,
    deleteService,
    updateSiteContent,
    deleteMessage,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    addBeforeAfter,
    deleteBeforeAfter,
    addVideo,
    deleteVideo
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
