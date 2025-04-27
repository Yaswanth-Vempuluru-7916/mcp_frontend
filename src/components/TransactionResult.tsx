import { TransactionResponse } from '../types';

interface TransactionResultProps {
  result: TransactionResponse;
}

function TransactionResult({ result }: TransactionResultProps) {
  return (
    <div className="mt-8 bg-surface p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-primary">Transaction Status</h2>
      <pre className="whitespace-pre-wrap text-sm text-secondary max-h-96 overflow-y-auto">{result.result}</pre>
    </div>
  );
}

export default TransactionResult;