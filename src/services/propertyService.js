import { api } from '../api';

/**
 * Property Service - Handles all property-related API calls
 * 
 * Learning Goals Demonstrated:
 * - RESTful API integration
 * - Async/await patterns
 * - Error handling
 * - Service layer architecture
 */
export const propertyService = {
  // Property Management
  async getProperties() {
    const response = await api.get('/api/properties');
    return response;
  },

  async getProperty(id) {
    const response = await api.get(`/api/properties/${id}`);
    return response;
  },

  async createProperty(propertyData) {
    const response = await api.post('/api/properties', propertyData);
    return response;
  },

  async updateProperty(id, propertyData) {
    const response = await api.put(`/api/properties/${id}`, propertyData);
    return response;
  },

  async deleteProperty(id) {
    const response = await api.delete(`/api/properties/${id}`);
    return response;
  },

  // Unit Management
  async getUnits(propertyId) {
    const response = await api.get(`/api/properties/${propertyId}/units`);
    return response;
  },

  async createUnit(propertyId, unitData) {
    const response = await api.post(`/api/properties/${propertyId}/units`, unitData);
    return response;
  },

  async updateUnit(propertyId, unitId, unitData) {
    const response = await api.put(`/api/properties/${propertyId}/units/${unitId}`, unitData);
    return response;
  },

  // Rent Management
  async setRent(unitId, rentData) {
    const response = await api.post(`/api/units/${unitId}/rent`, rentData);
    return response;
  },

  async uploadBill(unitId, billData) {
    const response = await api.post(`/api/units/${unitId}/bills`, billData);
    return response;
  },

  // Tenant Assignment
  async assignTenant(unitId, tenantId) {
    const response = await api.post(`/api/units/${unitId}/tenant`, { tenant_id: tenantId });
    return response;
  }
};

/**
 * Broadcast Service - Handles apartment-wide communications
 */
export const broadcastService = {
  async createBroadcast(propertyId, broadcastData) {
    const response = await api.post(`/api/properties/${propertyId}/broadcasts`, broadcastData);
    return response;
  },

  async getBroadcasts(propertyId) {
    const response = await api.get(`/api/properties/${propertyId}/broadcasts`);
    return response;
  },

  async sendEmergency(broadcastId, message) {
    const response = await api.post(`/api/broadcasts/${broadcastId}/emergency`, { message });
    return response;
  }
};

/**
 * Bill Service - Handles utility bills and rent calculations
 */
export const billService = {
  async getTenantBills(tenantId) {
    const response = await api.get(`/api/tenants/${tenantId}/bills`);
    return response;
  },

  async getBillBreakdown(unitId) {
    const response = await api.get(`/api/units/${unitId}/bills/breakdown`);
    return response;
  },

  async getPaymentHistory(tenantId) {
    const response = await api.get(`/api/tenants/${tenantId}/payments`);
    return response;
  }
};