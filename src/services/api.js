import axios from 'axios';

const API_URL = 'http://localhost:8082/api/v1';

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/users/register', userData);
    return response.data;  
  } catch (error) {
    throw error;
  }
};

export const registerFreelancerDetails = async (freelancerData) => {
  try {
    const response = await api.post('/api/users/register/freelancers', freelancerData);
    return response.data;
  } catch (error) {
    if (error.response) {
      
      throw new Error(error.response.data.message || 'Already register');
    }
  }
};


export const registerClientDetails = async (userData) => {
  try {
    const response = await api.post('/api/users/register/client', userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      
      throw new Error(error.response.data.message || 'Already register');
    }
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/api/users/login', credentials);
    return response.data;  
  } catch (error) {
    if (error.response) {
      
      throw new Error(error.response.data.message || 'Invalid Email and password');
    } else if (error.request) {
      
      throw new Error('No response from server');
    } else {
      
      throw new Error('Error in making request');
    }
  }
};

export const getFreelancerDetails = async (freelancerId) => {
  try {
    const response = await api.get(`/api/users/freelancers/${freelancerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching freelancer details:', error);
    throw new Error('Failed to fetch freelancer details');
  }
};

export const getClientDetails = async (cllientId) => {
  try {
    console.log(cllientId);
    const response = await api.get(`/api/users/client/${cllientId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching client details:', error);
    throw new Error('Failed to fetch client details');
  }
};

// export const getProjectDetails = async (projectId) => {
//   try {
//   const response = await axios.get(`/projects/${projectId}`);
//   return response.data;
// } catch (error) {
//   console.error('Error fetching client details:', error);
//   throw new Error('Failed to fetch client details');
// }
// };

export const saveBidDetails = async (bidData) => {
  console.log(bidData);
  const response = await api.post('/bids', bidData);
  return response.data;
};
export const getFreelancers = () => api.get('/api/users/freelancers');
export const loginUser = (credentials) => api.post('/users/login', credentials);
export const getUserProfile = (userId) => api.get(`/api/users/${userId}`);
export const updateUserProfile = (userId, userData) => api.put(`/api/users/${userId}`, userData);
//export const getCompanyDetails=(cllientId)=>api.get(`/api/users/client/${cllientId}`)
export const getProjects = () => api.get('/projects');
export const getProject = (projectId) => api.get(`/api/projects/${projectId}`);
export const addSkill=(id, skillData)=>api.post(`/skills/${id}`,skillData);
export const addCertificate=(id, certificateData)=>api.post(`/certificate/${id}`,certificateData);
export const createProject = (projectData) => api.post('/projects', projectData);
export const updateProject = (projectId, projectData) => api.put(`/api/projects/${projectId}`, projectData);
export const deleteProject = (projectId) => api.delete(`/api/projects/${projectId}`);

export const getReviews = () => api.get('/api/reviews');
export const getReview = (reviewId) => api.get(`/api/reviews/${reviewId}`);
export const createReview = (reviewData) => api.post('/api/reviews', reviewData);
export const updateReview = (reviewId, reviewData) => api.put(`/api/reviews/${reviewId}`, reviewData);
export const deleteReview = (reviewId) => api.delete(`/api/reviews/${reviewId}`);

export default api;
