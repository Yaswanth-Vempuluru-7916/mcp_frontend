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
      console.log('Fetched data:', data); // Debug log
      onResult({ result: data });
    } catch (err: any) {
      console.error('Submit error:', err);
      onError(err.message || 'Failed to fetch transaction status.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto mt-8 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Check Transaction Status</h2>
      <div className="mb-6">
        <label className="block mb-3 text-sm font-semibold text-gray-700">Input Type</label>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center p-3 border rounded-lg border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <input
              type="radio"
              value="initiator_source_address"
              checked={inputType === 'initiator_source_address'}
              onChange={() => setInputType('initiator_source_address')}
              className="mr-2 w-4 h-4 accent-indigo-600"
            />
            <span className="text-gray-800">Initiator Source Address</span>
          </label>
          <label className="flex items-center p-3 border rounded-lg border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <input
              type="radio"
              value="create_id"
              checked={inputType === 'create_id'}
              onChange={() => setInputType('create_id')}
              className="mr-2 w-4 h-4 accent-indigo-600"
            />
            <span className="text-gray-800">Create ID</span>
          </label>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="inputValue" className="block mb-2 text-sm font-semibold text-gray-700">
          {inputType === 'initiator_source_address' ? 'Initiator Source Address' : 'Create ID'}
        </label>
        <input
          id="inputValue"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition-all placeholder-gray-400"
          placeholder={`Enter ${inputType === 'initiator_source_address' ? 'initiator source address' : 'create ID'}`}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6.291-2.224-7.332-5.709z"></path>
            </svg>
            Loading...
          </>
        ) : (
          'Check Status'
        )}
      </button>
    </form>
  );
}

export default TransactionForm;