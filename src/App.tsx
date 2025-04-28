import { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionResult from './components/TransactionResult';
import { TransactionResponse } from './types';

function App() {
  const [result, setResult] = useState<TransactionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResult = (data: TransactionResponse) => {
    setResult(data);
    setError(null);
  };

  const handleError = (error: string) => {
    setError(error);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Transaction Status Dashboard</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Monitor and analyze transaction statuses with detailed insights and logs</p>
        </header>
        
        <TransactionForm onResult={handleResult} onError={handleError} />
        
        {error && (
          <div className="max-w-md mx-auto mt-6 p-4 bg-red-50 rounded-lg border border-red-200 shadow-md animate-fadeIn">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}
        
        {result && <TransactionResult data={result} />}
      </div>
    </div>
  );
}

export default App;