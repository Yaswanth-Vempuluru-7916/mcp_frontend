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
          className="w-full text-left p-3 rounded-lg flex justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 hover:border-amber-300 transition-colors"
          onClick={() => toggleSection(container)}
        >
          <span className="font-medium text-amber-800">{container}</span>
          <span className="text-amber-700 transition-transform duration-200" style={{ transform: expandedSections[container] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </button>
        {expandedSections[container] && (
          <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            {logs[container].error ? (
              <p className="text-red-600 font-medium">{logs[container].error}</p>
            ) : (
              <>
                <p className="font-semibold text-gray-700 mb-2">Raw Logs:</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg max-h-64 overflow-auto text-sm font-mono scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900">
                  {logs[container].raw_logs.length > 0
                    ? logs[container].raw_logs.join('\n')
                    : 'No logs found'}
                </pre>
                <p className="font-semibold text-gray-700 mt-4 mb-2">Filtered Logs:</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg max-h-64 overflow-auto text-sm font-mono scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900">
                  {logs[container].filtered_logs && logs[container].filtered_logs.length > 0
                    ? logs[container].filtered_logs.join('\n')
                    : 'No filtered logs found'}
                </pre>
                <p className="font-semibold text-gray-700 mt-4 mb-2">Analysis:</p>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{logs[container].analysis || 'No analysis available'}</p>
                {logs[container].create_order_success !== undefined && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="flex items-center">
                      <strong className="text-gray-700 mr-2">Order Created:</strong>
                      <span className={logs[container].create_order_success ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {logs[container].create_order_success ? 'Yes' : 'No'}
                      </span>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-lg border-t-4 border-indigo-500">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Transaction Status Results
      </h2>
      
      {/* Database Results */}
      <div className="mb-4">
        <button
          className="w-full text-left p-3 rounded-lg flex justify-between items-center bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 hover:border-blue-300 transition-colors"
          onClick={() => toggleSection('database')}
        >
          <span className="font-medium text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
            Database Results
          </span>
          <span className="text-blue-700 transition-transform duration-200" style={{ transform: expandedSections['database'] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </button>
        {expandedSections['database'] && (
          <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            {Object.keys(data.result.database).length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {Object.entries(data.result.database).map(([key, value]) => (
                  <li key={key} className="py-3 flex flex-wrap">
                    <strong className="text-gray-700 min-w-32">{key}:</strong> 
                    <span className="text-gray-600 ml-2">{value}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No database results found</p>
            )}
          </div>
        )}
      </div>
      
      {/* Matched Orders */}
      <div className="mb-4">
        <button
          className="w-full text-left p-3 rounded-lg flex justify-between items-center bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 hover:border-green-300 transition-colors"
          onClick={() => toggleSection('matched_orders')}
        >
          <span className="font-medium text-green-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Matched Orders
          </span>
          <span className="text-green-700 transition-transform duration-200" style={{ transform: expandedSections['matched_orders'] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </button>
        {expandedSections['matched_orders'] && (
          <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            {data.result.matched_orders.ids?.error ? (
              <p className="text-red-600 font-medium">{data.result.matched_orders.ids.error}</p>
            ) : (
              <div className="space-y-3 mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong className="text-gray-800">Source Swap ID:</strong>{" "}
                    <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200">{data.result.matched_orders.ids?.source_swap_id || 'N/A'}</span>
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-gray-700">
                    <strong className="text-gray-800">Destination Swap ID:</strong>{" "}
                    <span className="font-mono bg-white px-2 py-1 rounded border border-gray-200">{data.result.matched_orders.ids?.destination_swap_id || 'N/A'}</span>
                  </p>
                </div>
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-700 mt-4 mb-2">API Response:</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg max-h-64 overflow-auto text-sm font-mono scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900">
                {JSON.stringify(data.result.matched_orders.api_response, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
      
      {/* Logs */}
      <div className="mb-4">
        <button
          className="w-full text-left p-3 rounded-lg flex justify-between items-center bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 hover:border-purple-300 transition-colors"
          onClick={() => toggleSection('logs')}
        >
          <span className="font-medium text-purple-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Logs
          </span>
          <span className="text-purple-700 transition-transform duration-200" style={{ transform: expandedSections['logs'] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </button>
        {expandedSections['logs'] && (
          <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            {Object.keys(data.result.logs).length > 0 ? (
              renderLogs(data.result.logs)
            ) : (
              <p className="text-gray-500 italic">No logs found</p>
            )}
          </div>
        )}
      </div>
      
      {/* Status Summary */}
      <div className="mb-4">
        <button
          className="w-full text-left p-3 rounded-lg flex justify-between items-center bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 hover:border-teal-300 transition-colors"
          onClick={() => toggleSection('status')}
        >
          <span className="font-medium text-teal-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Transaction Status
          </span>
          <span className="text-teal-700 transition-transform duration-200" style={{ transform: expandedSections['status'] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </button>
        {expandedSections['status'] && (
          <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <ul className="divide-y divide-gray-100">
              {Object.entries(data.result.status).map(([key, value]) => (
                <li key={key} className="py-3 flex items-center">
                  <strong className="text-gray-700 capitalize min-w-32">{key.replace('_', ' ')}:</strong>
                  {typeof value === 'boolean' ? (
                    <span className={`${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} ml-2 px-2 py-1 rounded-md font-medium text-sm`}>
                    {value ? 'Yes' : 'No'}
                  </span>
                  ) : (
                    <span className="text-gray-600 ml-2">{value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Errors */}
      {data.result.errors.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 flex items-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Errors
          </h3>
          <ul className="space-y-2">
            {data.result.errors.map((err, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span className="text-red-700">{err}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TransactionResult;