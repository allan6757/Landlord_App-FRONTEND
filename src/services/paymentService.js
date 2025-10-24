export const paymentService = {
  initiateSTKPush: async (phoneNumber, amount) => {
    // STK Push simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.3
        resolve({
          success,
          transactionId: success ? `MPX${Date.now()}` : null,
          message: success ? 'Payment successful' : 'Payment failed'
        })
      }, 3000)
    })
  },
  getPaymentHistory: async () => {
    // Payment history implementation
  }
}

export default paymentService