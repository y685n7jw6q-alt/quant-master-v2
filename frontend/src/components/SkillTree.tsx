import React from 'react';

interface SkillNode {
  _id: string;
  name: string;
  status: 'locked' | 'available' | 'learning' | 'mastered';
  prerequisitesCount: number;
  dependenciesCount: number;
}

interface SkillTreeProps {
  skills: SkillNode[];
  onSelectSkill: (skillId: string) => void;
}

export const SkillTree: React.FC<SkillTreeProps> = ({ skills, onSelectSkill }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'locked':
        return 'bg-gray-400';
      case 'available':
        return 'bg-yellow-400';
      case 'learning':
        return 'bg-blue-400';
      case 'mastered':
        return 'bg-green-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">شجرة المهارات</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <button
            key={skill._id}
            onClick={() => onSelectSkill(skill._id)}
            className={`p-4 rounded-lg text-white font-semibold transition hover:opacity-80 ${getStatusColor(skill.status)}`}
          >
            <div className="font-bold mb-2">{skill.name}</div>
            <div className="text-sm opacity-75">
              {skill.status === 'locked' && '🔒 مقفول'}
              {skill.status === 'available' && '✨ متاح'}
              {skill.status === 'learning' && '📚 قيد التعلم'}
              {skill.status === 'mastered' && '⭐ متقن'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
