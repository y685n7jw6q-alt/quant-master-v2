'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    totalTime: 0,
  });

  useEffect(() => {
    // جلب البيانات من API
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/analytics/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setStats(data.dashboard.overview);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">لوحة التحكم</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">إجمالي الأسئلة</div>
          <div className="text-3xl font-bold text-blue-600">{stats.totalQuestions}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">الإجابات الصحيحة</div>
          <div className="text-3xl font-bold text-green-600">{stats.correctAnswers}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">نسبة الدقة</div>
          <div className="text-3xl font-bold text-purple-600">{stats.accuracy.toFixed(1)}%</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">الوقت الإجمالي</div>
          <div className="text-3xl font-bold text-orange-600">{(stats.totalTime / 60).toFixed(0)} دقيقة</div>
        </div>
      </div>
    </div>
  );
}
