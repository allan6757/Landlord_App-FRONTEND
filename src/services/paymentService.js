import { api } from '../api';

/**
 * Payment Service - Handles M-Pesa payments and receipts
 * 
 * Learning Goals Demonstrated:
 * - Third-party API integration (M-Pesa)
 * - Payment processing patterns
 * - Receipt generation
 */
export const paymentService = {
  async getPayments() {
    const response = await api.get('/api/payments');
    return response;
  },

  async getPayment(id) {
    const response = await api.get(`/api/payments/${id}`);
    return response;
  },

  async createPayment(paymentData) {
    const response = await api.post('/api/payments', paymentData);
    return response;
  },

  // M-Pesa STK Push for rent payment
  async initiateSTKPush(phoneNumber, amount, unitId, paymentType = 'full') {
    const response = await api.post('/api/payments/stk-push', {
      phone_number: phoneNumber,
      amount: amount,
      unit_id: unitId,
      payment_type: paymentType, // 'full' or 'partial'
      payment_method: 'mpesa'
    });
    return response;
  },

  // Get M-Pesa statements for landlord
  async getMpesaStatements(propertyId) {
    const response = await api.get(`/api/properties/${propertyId}/mpesa-statements`);
    return response;
  },

  // Get tenant receipts
  async getTenantReceipts(tenantId) {
    const response = await api.get(`/api/tenants/${tenantId}/receipts`);
    return response;
  },

  // Get pending balances
  async getPendingBalance(tenantId) {
    const response = await api.get(`/api/tenants/${tenantId}/balance`);
    return response;
  }
};