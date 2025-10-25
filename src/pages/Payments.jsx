import React from 'react'
import PaymentForm from '../components/payments/PaymentForm.jsx'

const Payments = () => {
  return (
    <div>
      <h1>Payments</h1>
      <PaymentForm amount={50000} propertyName="Sample Property" unit="Unit 1A" />
    </div>
  )
}

export default Payments