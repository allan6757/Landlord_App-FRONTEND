import { useState } from 'react'

export const useProperties = () => {
  const [properties, setProperties] = useState([])
  
  return {
    properties,
    setProperties
  }
}

export default useProperties