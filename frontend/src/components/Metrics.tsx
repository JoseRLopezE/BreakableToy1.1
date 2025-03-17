import { Metrics as MetricsType } from '../types';

interface MetricsProps {
  metrics: MetricsType;
}

export function Metrics({ metrics }: MetricsProps) {
  const categories = Object.keys(metrics).filter(key => key !== 'overall');

  return (
    <div className="bg-white rounded-lg shadow mt-6 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Products in Stock</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value in Stock</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Average Price in Stock</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {categories.map((category) => (
            <tr key={category}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{metrics[category].totalProducts}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                ${metrics[category].totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                ${metrics[category].averagePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
          <tr className="bg-gray-50 font-semibold">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Overall</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{metrics.overall.totalProducts}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
              ${metrics.overall.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
              ${metrics.overall.averagePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}