import api from './api';

export const carDatabaseService = {
  getBrands: async () => {
    const response = await api.get('/car-database/brands');
    return response.data;
  },

  getModels: async (brandId?: string) => {
    const path = brandId ? `/car-database/models?brand_id=${brandId}` : '/car-database/models';
    const response = await api.get(path);
    return response.data;
  },

  getGenerations: async (modelId?: string) => {
    const path = modelId ? `/car-database/generations?model_id=${modelId}` : '/car-database/generations';
    const response = await api.get(path);
    return response.data;
  },

  getVariations: async (generationId: string) => {
    const response = await api.get(`/car-database/variations/${generationId}`);
    return response.data;
  },

  getChallan: async (regNo: string) => {
    const response = await api.post('/car-database/challan', { reg_no: regNo });
    return response.data;
  }
};

export default carDatabaseService;
