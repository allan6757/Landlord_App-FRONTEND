export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(amount)
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

export default {
  formatCurrency,
  formatDate
}