import { TransactionResponse } from '../types';

interface FetchParams {
  create_id?: string;
  initiator_source_address?: string;
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchTransactionStatus = async (params: FetchParams): Promise<TransactionResponse['result']> => {
  const query = new URLSearchParams();
  if (params.create_id) {
    query.append('create_id', params.create_id);
  }
  if (params.initiator_source_address) {
    query.append('initiator_source_address', params.initiator_source_address);
  }

  const response = await fetch(`${baseUrl}/api/transaction_status?${query.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch transaction status');
  }
  return response.json();
};
