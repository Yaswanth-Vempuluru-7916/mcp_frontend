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
      onResult({ result: data });
    } catch (err: any) {
      onError(err.message || 'Failed to fetch transaction status.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0E1426] p-6 rounded-lg shadow-md border border-[#2A314D] max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-[#00E6EE]">Check Transaction Status</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-[#B8C4E9]">Input Type</label>
        <div className="flex space-x-4">
          <label className="flex items-center text-[#B8C4E9]">
            <input
              type="radio"
              value="initiator_source_address"
              checked={inputType === 'initiator_source_address'}
              onChange={() => setInputType('initiator_source_address')}
              className="mr-2 text-[#00F6FF] focus:ring-[#00F6FF]"
            />
            Initiator Source Address
          </label>
          <label className="flex items-center text-[#B8C4E9]">
            <input
              type="radio"
              value="create_id"
              checked={inputType === 'create_id'}
              onChange={() => setInputType('create_id')}
              className="mr-2 text-[#00F6FF] focus:ring-[#00F6FF]"
            />
            Create ID
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="inputValue" className="block mb-2 text-sm font-medium text-[#B8C4E9]">
          {inputType === 'initiator_source_address' ? 'Initiator Source Address' : 'Create ID'}
        </label>
        <input
          id="inputValue"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 rounded bg-[#171E34] text-white border border-[#4B567D] focus:outline-none focus:ring-2 focus:ring-[#00F6FF] transition-colors"
          placeholder={`Enter ${inputType === 'initiator_source_address' ? 'initiator source address' : 'create ID'}`}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#00F6FF] text-[#0E1426] py-2 rounded-lg font-semibold hover:bg-[#00E6EE] disabled:bg-[#0097A0] transition-colors"
      >
        {isLoading ? 'Loading...' : 'Check Status'}
      </button>
    </form>
  );
}

export default TransactionForm;