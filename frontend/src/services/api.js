import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const uploadDataset = async (file) => {
  // TODO: Implement actual backend call
  console.log('Mock upload dataset');
  return { success: true };
};

export const analyzeDataset = async () => {
  // TODO: Implement actual backend call
  console.log('Mock analyze dataset');
  return { success: true };
};

export const askAI = async (question) => {
  // TODO: Implement actual backend call
  console.log('Mock ask AI:', question);
  return { success: true };
};

export const runScenario = async (params) => {
  // TODO: Implement actual backend call
  console.log('Mock run scenario:', params);
  return { success: true };
};
