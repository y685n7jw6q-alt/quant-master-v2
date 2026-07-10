'use client';

import { useState, useEffect } from 'react';

export default function Quiz() {
  const [question, setQuestion] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetchNextQuestion();
  }, []);

  const fetchNextQuestion = async () => {
    try {
      const response = await fetch('/api/questions/next', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setQuestion(data.question);
        setSelectedOption('');
        setResult(null);
      }
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!selectedOption) return;

    try {
      const response = await fetch('/api/questions/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          questionId: question._id,
          selectedOption,
          timeSpent: 60,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.result);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  if (loading) return <div className="p-8">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">اختبار</h1>
        
        {question && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{question.question?.arabic}</h2>
              <div className="bg-gray-100 p-4 rounded text-gray-700">
                {question.question?.latex}
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              {question.options?.map((option: any) => (
                <label key={option._id} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50" 
                  style={{ borderColor: selectedOption === option._id ? '#3B82F6' : '#E5E7EB' }}>
                  <input
                    type="radio"
                    name="answer"
                    value={option._id}
                    checked={selectedOption === option._id}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-4 text-gray-900 font-medium">{option.label}. {option.text}</span>
                </label>
              ))}
            </div>
            
            {!result ? (
              <button
                onClick={submitAnswer}
                disabled={!selectedOption}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
              >
                إرسال الإجابة
              </button>
            ) : (
              <div>
                <div className={`p-4 rounded-lg mb-4 ${result.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {result.feedback}
                </div>
                <button
                  onClick={fetchNextQuestion}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                >
                  السؤال التالي
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
