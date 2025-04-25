import { TransactionResponse } from '../types';

interface TransactionResultProps {
  result: TransactionResponse;
}

function TransactionResult({ result }: TransactionResultProps) {
  return (
    <div className="mt-8 bg-[#0E1426] p-6 rounded-lg shadow-md border border-[#2A314D] max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-[#00E6EE]">Transaction Status</h2>
      <pre className="whitespace-pre-wrap text-sm text-[#B8C4E9] max-h-96 overflow-y-auto">{result.result}</pre>
    </div>
  );
}

export default TransactionResult;