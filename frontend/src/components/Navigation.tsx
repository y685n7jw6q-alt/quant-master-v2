import React from 'react';

interface NavigationProps {
  user?: { name: string; avatar?: string };
  onLogout?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-blue-600">🎓 Quant Master</h1>
            <div className="hidden md:flex gap-6">
              <a href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition">
                لوحة التحكم
              </a>
              <a href="/skills" className="text-gray-600 hover:text-blue-600 font-medium transition">
                المهارات
              </a>
              <a href="/quiz" className="text-gray-600 hover:text-blue-600 font-medium transition">
                الاختبار
              </a>
              <a href="/analytics" className="text-gray-600 hover:text-blue-600 font-medium transition">
                الإحصائيات
              </a>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium">{user.name}</span>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                تسجيل الخروج
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
