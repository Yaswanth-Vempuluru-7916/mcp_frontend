import { useState } from 'react';
import Header from './components/Header';
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

  const handleError = (err: string) => {
    setError(err);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient">
      <Header />
      <main className="container mx-auto p-4 max-w-4xl">
        <TransactionForm onResult={handleResult} onError={handleError} />
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        {result && <TransactionResult result={result} />}
      </main>
    </div>
  );
}

export default App;