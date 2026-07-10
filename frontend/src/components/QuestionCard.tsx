import React from 'react';

interface QuestionCardProps {
  question: {
    _id: string;
    question: {
      arabic: string;
      latex: string;
    };
    options: Array<{
      _id: string;
      label: string;
      text: string;
    }>;
  };
  selectedOption?: string;
  onSelectOption: (optionId: string) => void;
  onSubmit: () => void;
  loading?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOption,
  onSelectOption,
  onSubmit,
  loading = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {question.question.arabic}
        </h2>
        <div className="bg-gray-100 p-4 rounded text-gray-700">
          {question.question.latex}
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {question.options.map((option) => (
          <label
            key={option._id}
            className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-blue-50 transition"
            style={{
              borderColor: selectedOption === option._id ? '#3B82F6' : '#E5E7EB',
            }}
          >
            <input
              type="radio"
              name="answer"
              value={option._id}
              checked={selectedOption === option._id}
              onChange={(e) => onSelectOption(e.target.value)}
              className="w-4 h-4"
            />
            <span className="ml-4 text-gray-900 font-medium">
              {option.label}. {option.text}
            </span>
          </label>
        ))}
      </div>

      <button
        onClick={onSubmit}
        disabled={!selectedOption || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
      >
        {loading ? 'جاري الإرسال...' : 'إرسال الإجابة'}
      </button>
    </div>
  );
};
