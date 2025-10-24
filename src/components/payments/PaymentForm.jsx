import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreditCard, CheckCircle, AlertCircle, Loader } from 'lucide-react'

const PaymentForm = ({ amount, propertyName, unit }) => {
  const [paymentStatus, setPaymentStatus] = useState('idle')
  const [transactionId, setTransactionId] = useState('')
  
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setPaymentStatus('processing')
    
    setTimeout(() => {
      const success = Math.random() > 0.3
      if (success) {
        setPaymentStatus('success')
        setTransactionId(`MPX${Date.now()}`)
      } else {
        setPaymentStatus('failed')
      }
    }, 3000)
  }

  const resetPayment = () => {
    setPaymentStatus('idle')
    setTransactionId('')
  }

  if (paymentStatus === 'processing') {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Loader className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment</h3>
          <p className="text-gray-600 mb-4">
            Please check your phone for the M-Pesa STK push notification and enter your PIN to complete the payment.
          </p>
        </div>
      </div>
    )
  }

  if (paymentStatus === 'success') {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-4">Transaction ID: {transactionId}</p>
          <button onClick={resetPayment} className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg">
            Make Another Payment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <CreditCard className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">M-Pesa Payment</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              {...register('phoneNumber', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^254[0-9]{9}$/,
                  message: 'Please enter a valid Kenyan phone number (254XXXXXXXXX)'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="254712345678"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
            )}
          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700">
            Pay with M-Pesa
          </button>
        </form>
      </div>
    </div>
  )
}

export default PaymentForm