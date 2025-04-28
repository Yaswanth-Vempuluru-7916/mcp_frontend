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
    <div className="bg-gradient min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-8">Transaction Status Dashboard</h1>
      <TransactionForm onResult={handleResult} onError={handleError} />
      {error && (
        <div className="max-w-md mx-auto mt-4 p-4 bg-surface rounded-lg shadow-md">
          <p className="text-red-500">{error}</p>
        </div>
      )}
      {result && <TransactionResult data={result} />}
    </div>
  );
}

export default App;
