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
    <form onSubmit={handleSubmit} className="bg-surface p-6 rounded-lg shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-primary">Check Transaction Status</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-primary">Input Type</label>
        <div className="flex space-x-4">
          <label className="flex items-center text-primary">
            <input
              type="radio"
              value="initiator_source_address"
              checked={inputType === 'initiator_source_address'}
              onChange={() => setInputType('initiator_source_address')}
              className="mr-2 radio-accent focus-ring-accent focus:ring-2 focus:ring-offset-2"
            />
            Initiator Source Address
          </label>
          <label className="flex items-center text-primary">
            <input
              type="radio"
              value="create_id"
              checked={inputType === 'create_id'}
              onChange={() => setInputType('create_id')}
              className="mr-2 radio-accent focus-ring-accent focus:ring-2 focus:ring-offset-2"
            />
            Create ID
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="inputValue" className="block mb-2 text-sm font-medium text-primary">
          {inputType === 'initiator_source_address' ? 'Initiator Source Address' : 'Create ID'}
        </label>
        <input
          id="inputValue"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 rounded bg-surface text-primary border border-secondary focus:outline-none focus:ring-2 focus:ring-accent placeholder-secondary"
          placeholder={`Enter ${inputType === 'initiator_source_address' ? 'initiator source address' : 'create ID'}`}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-button-teal text-primary py-2 rounded-lg font-semibold hover:bg-lavender disabled:opacity-50"
      >
        {isLoading ? 'Loading...' : 'Check Status'}
      </button>
    </form>
  );
}

export default TransactionForm;
