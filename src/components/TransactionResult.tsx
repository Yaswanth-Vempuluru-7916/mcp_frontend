import { useState } from 'react';
import { TransactionResponse } from '../types';

interface TransactionResultProps {
  data: TransactionResponse;
}

function TransactionResult({ data }: TransactionResultProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [showRawLogs, setShowRawLogs] = useState<{ [key: string]: boolean }>({});
  const [showFilteredLogs, setShowFilteredLogs] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleRawLogs = (container: string) => {
    setShowRawLogs((prev) => ({
      ...prev,
      [container]: !prev[container],
    }));
  };

  const toggleFilteredLogs = (container: string) => {
    setShowFilteredLogs((prev) => ({
      ...prev,
      [container]: !prev[container],
    }));
  };

  const renderLogs = (logs: TransactionResponse['result']['logs']) => {
    return Object.keys(logs).map((container) => (
      <div key={container} className="mt-2">
        <button
          className="w-full text-left px-4 py-2 rounded-lg flex justify-between items-center bg-amber-50 hover:bg-amber-100 transition-colors"
          onClick={() => toggleSection(container)}
        >
          <span className="font-medium text-amber-900">{container}</span>
          <span className="text-amber-700 transition-transform duration-200" style={{ transform: expandedSections[container] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </button>
        {expandedSections[container] && (
          <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200">
            {logs[container].error ? (
              <p className="text-red-600 font-medium">{logs[container].error}</p>
            ) : (
              <>
                {/* Analysis Section */}
                <p className="font-semibold text-gray-900 mb-2 text-lg">Analysis:</p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 shadow-md">
                  {logs[container].analysis ? 
                    logs[container].analysis.split(/\.\s+/).map((sentence, idx) => (
                      sentence.trim() && (
                        <p key={idx} className="mb-2 text-gray-800 flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {sentence.trim()}{sentence.trim().endsWith('.') ? '' : '.'}
                        </p>
                      )
                    )) : 
                    <p className="text-gray-500 italic">No analysis available</p>
                  }
                </div>

                {/* Raw Logs Section with Toggle */}
                <div className="mt-4">
                  <button
                    className="w-full text-left px-4 py-2 rounded-lg flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => toggleRawLogs(container)}
                  >
                    <span className="font-semibold text-gray-700">Raw Logs</span>
                    <span className="text-gray-600 transition-transform duration-200" style={{ transform: showRawLogs[container] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ▼
                    </span>
                  </button>
                  {showRawLogs[container] && (
                    <pre className="mt-2 bg-gray-800 text-gray-100 p-3 rounded-lg max-h-64 overflow-auto text-sm font-mono">
                      {logs[container].raw_logs.length > 0
                        ? logs[container].raw_logs.join('\n')
                        : 'No logs found'}
                    </pre>
                  )}
                </div>

                {/* Filtered Logs Section with Toggle */}
                <div className="mt-4">
                  <button
                    className="w-full text-left px-4 py-2 rounded-lg flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition-colors"
                    onClick={() => toggleFilteredLogs(container)}
                  >
                    <span className="font-semibold text-gray-700">Filtered Logs</span>
                    <span className="text-gray-600 transition-transform duration-200" style={{ transform: showFilteredLogs[container] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ▼
                    </span>
                  </button>
                  {showFilteredLogs[container] && (
                    <pre className="mt-2 bg-gray-800 text-gray-100 p-3 rounded-lg max-h-64 overflow-auto text-sm font-mono">
                      {logs[container].filtered_logs && logs[container].filtered_logs.length > 0
                        ? logs[container].filtered_logs.join('\n')
                        : 'No filtered logs found'}
                    </pre>
                  )}
                </div>

                {/* Order Created Section */}
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
    <div className="w-full max-w-6xl mx-auto mt-4 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Transaction Status Results
      </h2>

      {/* Transaction Status Table */}
      <div className="mb-6">
        <button
          className="w-full text-left px-4 py-2 rounded-lg flex justify-between items-center bg-teal-50 hover:bg-teal-100 transition-colors"
          onClick={() => toggleSection('status')}
        >
          <span className="font-medium text-teal-900 flex items-center">
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
          <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200">
            <table className="w-full">
              <tbody>
                {Object.entries(data.result.status).map(([key, value]) => (
                  <tr key={key} className="border-b border-gray-100">
                    <td className="py-2 text-gray-700 font-medium capitalize">{key.replace('_', ' ')}</td>
                    <td className="py-2">
                      {typeof value === 'boolean' ? (
                        <span className={`${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} px-2 py-1 rounded-md font-medium text-sm`}>
                          {value ? 'Yes' : 'No'}
                        </span>
                      ) : (
                        <span className="text-gray-600">{value}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Logs */}
      <div className="mb-6">
        <button
          className="w-full text-left px-4 py-2 rounded-lg flex justify-between items-center bg-purple-50 hover:bg-purple-100 transition-colors"
          onClick={() => toggleSection('logs')}
        >
          <span className="font-medium text-purple-900 flex items-center">
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
          <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200">
            {Object.keys(data.result.logs).length > 0 ? (
              renderLogs(data.result.logs)
            ) : (
              <p className="text-gray-500 italic">No logs found</p>
            )}
          </div>
        )}
      </div>
      {/* Database Results */}
      <div className="mb-6">
        <button
          className="w-full text-left px-4 py-2 rounded-lg flex justify-between items-center bg-blue-50 hover:bg-blue-100 transition-colors"
          onClick={() => toggleSection('database')}
        >
          <span className="font-medium text-blue-900 flex items-center">
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
          <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200">
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
      <div className="mb-6">
        <button
          className="w-full text-left px-4 py-2 rounded-lg flex justify-between items-center bg-green-50 hover:bg-green-100 transition-colors"
          onClick={() => toggleSection('matched_orders')}
        >
          <span className="font-medium text-green-900 flex items-center">
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
          <div className="mt-2 p-4 bg-white rounded-lg border border-gray-200">
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
              <pre className="bg-gray-800 text-gray-100 p-3 rounded-lg max-h-64 overflow-auto text-sm font-mono">
                {JSON.stringify(data.result.matched_orders.api_response, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>



      {/* Errors */}
      {data.result.errors.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-900 flex items-center mb-3">
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