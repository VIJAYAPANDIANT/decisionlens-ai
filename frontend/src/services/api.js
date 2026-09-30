import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const uploadDataset = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  
  try {
    const response = await api.post('/api/analyze', formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      throw new Error(error.response.data.detail.message || "Failed to analyze dataset.");
    }
    throw new Error("Unable to connect to the analysis service. Please try again.");
  }
};

export const askAI = async (question) => {
  try {
    const response = await api.post('/api/ask', { question });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error.message || "Failed to get AI answer.");
    }
    throw new Error("Unable to connect to the analysis service. Please try again.");
  }
};

export const runScenario = async (params) => {
  // TODO: Implement actual backend call
  console.log('Mock run scenario:', params);
  return { success: true };
};
