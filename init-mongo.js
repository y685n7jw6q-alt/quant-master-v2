db = db.getSiblingDB('quant-master');

db.createCollection('users');
db.createCollection('questions');
db.createCollection('answers');
db.createCollection('analytics');
db.createCollection('learningPlans');
db.createCollection('remediations');
db.createCollection('skills');
db.createCollection('topics');

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: 1 });

db.questions.createIndex({ topic: 1 });
db.questions.createIndex({ difficulty: 1 });
db.questions.createIndex({ skillId: 1 });
db.questions.createIndex({ createdAt: 1 });

db.answers.createIndex({ userId: 1, questionId: 1 });
db.answers.createIndex({ userId: 1, createdAt: -1 });
db.answers.createIndex({ createdAt: 1 });

db.analytics.createIndex({ userId: 1 });
db.analytics.createIndex({ skillId: 1 });
db.analytics.createIndex({ updatedAt: -1 });

db.learningPlans.createIndex({ userId: 1 });
db.learningPlans.createIndex({ status: 1 });
db.learningPlans.createIndex({ createdAt: -1 });

db.remediations.createIndex({ userId: 1 });
db.remediations.createIndex({ skillId: 1 });
db.remediations.createIndex({ status: 1 });

db.skills.createIndex({ name: 1 }, { unique: true });
db.topics.createIndex({ name: 1 }, { unique: true });

print('✅ MongoDB initialization completed successfully!');
