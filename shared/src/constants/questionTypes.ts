export const QUESTION_TYPES = {
  MCQ: 'mcq',
  NUMERICAL: 'numerical',
  ORDERING: 'ordering',
} as const;

export const QUESTION_STATUS = {
  DRAFT: 'draft',
  REVIEW: 'review',
  APPROVED: 'approved',
  ARCHIVED: 'archived',
} as const;

export const SOLUTION_METHODS = {
  STANDARD: 'standard',
  CLEVER: 'clever',
  ESTIMATION: 'estimation',
  SUBSTITUTION: 'substitution',
} as const;

export const QUESTION_DIFFICULTY = {
  VERY_EASY: 1,
  EASY: 2,
  MEDIUM: 3,
  HARD: 4,
  VERY_HARD: 5,
} as const;
