export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🎓 Quant Master V2
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            منصة احترافية لتدريب القسم الكمي من اختبار القدرات
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">1700+ أسئلة</h3>
              <p className="text-gray-600">أسئلة احترافية من اختبارات حقيقية</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">محرك تكيف ذكي</h3>
              <p className="text-gray-600">يختار الأسئلة بناءً على مستواك</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">تحليل متقدم</h3>
              <p className="text-gray-600">تتبع تقدمك وحلل أخطاؤك</p>
            </div>
          </div>
          
          <button className="mt-16 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition">
            ابدأ الآن
          </button>
        </div>
      </div>
    </div>
  );
}
