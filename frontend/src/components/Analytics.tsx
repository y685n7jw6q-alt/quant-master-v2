import React from 'react';

interface AnalyticsChartProps {
  data: Array<{
    name: string;
    value: number;
    percentage?: number;
  }>;
  title: string;
  type?: 'bar' | 'pie';
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  data,
  title,
  type = 'bar',
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">{title}</h3>
      
      {type === 'bar' && (
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name}>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-900">{item.name}</span>
                <span className="text-gray-600">{item.percentage || item.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 bg-blue-600 rounded-full transition-all"
                  style={{ width: `${item.percentage || item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {type === 'pie' && (
        <div className="flex flex-wrap gap-4">
          {data.map((item) => (
            <div key={item.name} className="text-center">
              <div className="text-2xl font-bold text-blue-600">{item.value}</div>
              <div className="text-sm text-gray-600">{item.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
