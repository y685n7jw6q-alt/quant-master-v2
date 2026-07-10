'use client';

import { useEffect, useState } from 'react';

export default function Analytics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await response.json();
      if (result.success) {
        setData(result.dashboard);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">الإحصائيات</h1>
      
      {data && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm text-gray-600 mb-2">إجمالي الأسئلة</div>
              <div className="text-3xl font-bold text-blue-600">{data.overview?.totalQuestions}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm text-gray-600 mb-2">الإجابات الصحيحة</div>
              <div className="text-3xl font-bold text-green-600">{data.overview?.correctAnswers}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm text-gray-600 mb-2">نسبة الدقة</div>
              <div className="text-3xl font-bold text-purple-600">{data.overview?.accuracy.toFixed(1)}%</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-sm text-gray-600 mb-2">تقدم المهارات</div>
              <div className="text-3xl font-bold text-orange-600">{data.skillsProgress?.length} مهارة</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">تقدم المهارات</h2>
            <div className="space-y-4">
              {data.skillsProgress?.map((skill: any) => (
                <div key={skill.skillId}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">{skill.skillName}</span>
                    <span className="text-sm text-gray-600">{skill.accuracy.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        skill.status === 'mastered' ? 'bg-green-600' :
                        skill.status === 'proficient' ? 'bg-blue-600' :
                        skill.status === 'learning' ? 'bg-yellow-600' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${skill.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
