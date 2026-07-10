'use client';

import { useState, useEffect } from 'react';

export default function Skills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const data = await response.json();
      if (data.success) {
        setSkills(data.skills);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">المهارات</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div key={skill._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{skill.name}</h3>
                <p className="text-sm text-gray-600">{skill.nameEn}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                skill.difficulty === 1 ? 'bg-green-100 text-green-800' :
                skill.difficulty === 2 ? 'bg-yellow-100 text-yellow-800' :
                skill.difficulty === 3 ? 'bg-orange-100 text-orange-800' :
                skill.difficulty === 4 ? 'bg-red-100 text-red-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                مستوى {skill.difficulty}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{skill.description}</p>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition">
                ابدأ
              </button>
              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-2 rounded-lg transition">
                التفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
