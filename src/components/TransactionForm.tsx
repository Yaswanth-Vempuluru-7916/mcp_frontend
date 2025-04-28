import { FormEvent, useState } from 'react';
import { fetchTransactionStatus } from '../utils/api';
import { TransactionResponse } from '../types';

interface TransactionFormProps {
  onResult: (data: TransactionResponse) => void;
  onError: (error: string) => void;
}

function TransactionForm({ onResult, onError }: TransactionFormProps) {
  const [inputType, setInputType] = useState<'initiator_source_address' | 'create_id'>('initiator_source_address');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      onError('Please enter a valid input.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchTransactionStatus({
        [inputType]: inputValue.trim(),
      });
      console.log('Fetched data:', data);
      onResult({ result: data });
    } catch (err: any) {
      console.error('Submit error:', err);
      onError(err.message || 'Failed to fetch transaction status.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Check Transaction Status</h2>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-4">
          <label className="flex items-center px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors">
            <input
              type="radio"
              value="initiator_source_address"
              checked={inputType === 'initiator_source_address'}
              onChange={() => setInputType('initiator_source_address')}
              className="mr-2 w-4 h-4 accent-blue-600"
            />
            <span className="text-gray-800">Initiator Source Address</span>
          </label>
          <label className="flex items-center px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors">
            <input
              type="radio"
              value="create_id"
              checked={inputType === 'create_id'}
              onChange={() => setInputType('create_id')}
              className="mr-2 w-4 h-4 accent-blue-600"
            />
            <span className="text-gray-800">Create ID</span>
          </label>
        </div>
        <input
          id="inputValue"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400"
          placeholder={`Enter ${inputType === 'initiator_source_address' ? 'initiator source address' : 'create ID'}`}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center cursor-pointer"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6.291-2.224-7.332-5.709z"></path>
              </svg>
              Loading...
            </>
          ) : (
            'Check Status'
          )}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;