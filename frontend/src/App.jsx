import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [health, setHealth] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:8000/api/health')
      .then(res => setHealth(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">DecisionLens AI</h1>
      <p className="text-lg text-gray-700">AI-powered business decision engine.</p>
      
      <div className="mt-8 p-6 bg-white rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Backend Status</h2>
        {health ? (
          <pre className="bg-gray-50 p-4 rounded text-sm text-green-600 border border-gray-200">
            {JSON.stringify(health, null, 2)}
          </pre>
        ) : (
          <p className="text-gray-500">Connecting to backend at localhost:8000...</p>
        )}
      </div>
    </div>
  )
}

export default App
