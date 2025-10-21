import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreditCard, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const STKPushPayment = ({ amount, propertyName, unit }) => {
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, failed
  const [transactionId, setTransactionId] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setPaymentStatus('processing');
    
    // Simulate STK Push process
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      if (success) {
        setPaymentStatus('success');
        setTransactionId(`MPX${Date.now()}`);
      } else {
        setPaymentStatus('failed');
      }
    }, 3000);
  };

  const resetPayment = () => {
    setPaymentStatus('idle');
    setTransactionId('');
  };

  if (paymentStatus === 'processing') {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Loader className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment</h3>
          <p className="text-gray-600 mb-4">
            Please check your phone for the M-Pesa STK push notification and enter your PIN to complete the payment.
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Amount:</strong> KSh {amount.toLocaleString()}<br />
              <strong>Property:</strong> {propertyName}<br />
              <strong>Unit:</strong> {unit}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Successful!</h3>
          <p className="text-gray-600 mb-4">
            Your rent payment has been processed successfully.
          </p>
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <strong>Transaction ID:</strong> {transactionId}<br />
              <strong>Amount:</strong> KSh {amount.toLocaleString()}<br />
              <strong>Property:</strong> {propertyName}<br />
              <strong>Unit:</strong> {unit}<br />
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={resetPayment}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Make Another Payment
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Failed</h3>
          <p className="text-gray-600 mb-4">
            Your payment could not be processed. Please try again or contact support.
          </p>
          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800">
              Common reasons for failure:<br />
              • Insufficient balance<br />
              • Incorrect PIN<br />
              • Network timeout<br />
              • Transaction cancelled
            </p>
          </div>
          <button
            onClick={resetPayment}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <CreditCard className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">M-Pesa Payment</h3>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Payment Details</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Property:</span>
              <span className="font-medium">{propertyName}</span>
            </div>
            <div className="flex justify-between">
              <span>Unit:</span>
              <span className="font-medium">{unit}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount:</span>
              <span className="font-medium text-lg text-gray-900">KSh {amount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              {...register('phoneNumber', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^254[0-9]{9}$/,
                  message: 'Please enter a valid Kenyan phone number (254XXXXXXXXX)'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="254712345678"
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
            )}
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>How it works:</strong><br />
              1. Enter your M-Pesa registered phone number<br />
              2. Click "Pay with M-Pesa" below<br />
              3. Check your phone for STK push notification<br />
              4. Enter your M-Pesa PIN to complete payment
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Pay with M-Pesa
          </button>
        </form>
      </div>
    </div>
  );
};

export default STKPushPayment;