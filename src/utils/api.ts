import axios from 'axios';

const MCP_SERVER_URL = 'http://localhost:10000';

export const fetchTransactionStatus = async (payload: {
  initiator_source_address?: string;
  create_id?: string;
}): Promise<string> => {
  try {
    const response = await axios.post(`${MCP_SERVER_URL}/tools/check_transaction_status`, {
      arguments: payload,
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.detail || 'Failed to fetch transaction status');
  }
};