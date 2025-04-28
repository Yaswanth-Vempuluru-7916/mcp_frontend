import { useState } from 'react';
import { TransactionResponse } from '../types';

interface TransactionResultProps {
  data: TransactionResponse;
}

function TransactionResult({ data }: TransactionResultProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderLogs = (logs: TransactionResponse['result']['logs']) => {
    return Object.keys(logs).map((container) => (
      <div key={container} className="mt-4">
        <button
          className="w-full text-left bg-button-secondary p-2 rounded flex justify-between items-center text-primary logs"
          onClick={() => toggleSection(container)}
        >
          <span>{container}</span>
          <span>{expandedSections[container] ? '▼' : '▶'}</span>
        </button>
        {expandedSections[container] && (
          <div className="mt-2 p-4 bg-surface rounded shadow-sm">
            {logs[container].error ? (
              <p className="text-red-500">{logs[container].error}</p>
            ) : (
              <>
                <p className="font-semibold text-primary">Raw Logs:</p>
                <pre className="bg-gray-800 text-white p-2 rounded max-h-64 overflow-auto text-sm">
                  {logs[container].raw_logs.length > 0
                    ? logs[container].raw_logs.join('\n')
                    : 'No logs found'}
                </pre>
                <p className="font-semibold text-primary mt-2">Filtered Logs:</p>
                <pre className="bg-gray-800 text-white p-2 rounded max-h-64 overflow-auto text-sm">
                  {logs[container].filtered_logs && logs[container].filtered_logs.length > 0
                    ? logs[container].filtered_logs.join('\n')
                    : 'No filtered logs found'}
                </pre>
                <p className="font-semibold text-primary mt-2">Analysis:</p>
                <p className="text-secondary">{logs[container].analysis || 'No analysis available'}</p>
                {logs[container].create_order_success !== undefined && (
                  <p className="mt-2">
                    <strong className="text-primary">Order Created:</strong>{' '}
                    {logs[container].create_order_success ? 'Yes' : 'No'}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-surface rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-primary">Transaction Status Results</h2>
      {/* Database Results */}
      <div className="mb-4">
        <button
          className="w-full text-left bg-button-secondary p-2 rounded flex justify-between items-center text-primary database-results"
          onClick={() => toggleSection('database')}
        >
          <span>Database Results</span>
          <span>{expandedSections['database'] ? '▼' : '▶'}</span>
        </button>
        {expandedSections['database'] && (
          <div className="mt-2 p-4 bg-surface rounded shadow-sm">
            {Object.keys(data.result.database).length > 0 ? (
              <ul className="text-secondary">
                {Object.entries(data.result.database).map(([key, value]) => (
                  <li key={key} className="mb-1">
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-secondary">No database results found</p>
            )}
          </div>
        )}
      </div>
      {/* Matched Orders */}
      <div className="mb-4">
        <button
          className="w-full text-left bg-button-secondary p-2 rounded flex justify-between items-center text-primary matched-order-ids"
          onClick={() => toggleSection('matched_orders')}
        >
          <span>Matched Orders</span>
          <span>{expandedSections['matched_orders'] ? '▼' : '▶'}</span>
        </button>
        {expandedSections['matched_orders'] && (
          <div className="mt-2 p-4 bg-surface rounded shadow-sm">
            {data.result.matched_orders.ids?.error ? (
              <p className="text-secondary">{data.result.matched_orders.ids.error}</p>
            ) : (
              <>
                <p className="text-secondary">
                  <strong>Source Swap ID:</strong> {data.result.matched_orders.ids?.source_swap_id}
                </p>
                <p className="text-secondary">
                  <strong>Destination Swap ID:</strong> {data.result.matched_orders.ids?.destination_swap_id}
                </p>
              </>
            )}
            <p className="font-semibold text-primary mt-2">API Response:</p>
            <pre className="bg-gray-800 text-white p-2 rounded max-h-64 overflow-auto text-sm matched-order-api">
              {JSON.stringify(data.result.matched_orders.api_response, null, 2)}
            </pre>
          </div>
        )}
      </div>
      {/* Logs */}
      <div className="mb-4">
        <button
          className="w-full text-left bg-button-secondary p-2 rounded flex justify-between items-center text-primary logs"
          onClick={() => toggleSection('logs')}
        >
          <span>Logs</span>
          <span>{expandedSections['logs'] ? '▼' : '▶'}</span>
        </button>
        {expandedSections['logs'] && (
          <div className="mt-2 p-4 bg-surface rounded shadow-sm">
            {Object.keys(data.result.logs).length > 0 ? (
              renderLogs(data.result.logs)
            ) : (
              <p className="text-secondary">No logs found</p>
            )}
          </div>
        )}
      </div>
      {/* Status Summary */}
      <div className="mb-4">
        <button
          className="w-full text-left bg-button-secondary p-2 rounded flex justify-between items-center text-primary status-summary"
          onClick={() => toggleSection('status')}
        >
          <span>Transaction Status</span>
          <span>{expandedSections['status'] ? '▼' : '▶'}</span>
        </button>
        {expandedSections['status'] && (
          <div className="mt-2 p-4 bg-surface rounded shadow-sm">
            <ul className="text-secondary">
              {Object.entries(data.result.status).map(([key, value]) => (
                <li key={key} className="mb-1">
                  <strong>{key.replace('_', ' ')}:</strong>{' '}
                  {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Errors */}
      {data.result.errors.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-primary">Errors</h3>
          <ul className="list-disc pl-5 text-red-500">
            {data.result.errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TransactionResult;
