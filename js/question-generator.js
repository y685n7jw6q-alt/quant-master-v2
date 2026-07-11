/**
 * Question Generator Engine - محرك توليد الأسئلة الذكي
 * يوليد أسئلة القدرات الكمي تلقائياً من القوالب
 */

// ===== 1. دالة توليد متغيرات عشوائية =====
function generateRandomVariable(min, max, step = 1) {
  const range = (max - min) / step;
  const randomStep = Math.floor(Math.random() * (range + 1));
  return min + (randomStep * step);
}

// ===== 2. دالة توليد خيارات خاطئة ذكية =====
function generateSmartDistracters(correctAnswer, strategy, variables = {}) {
  const distracters = [];
  
  switch(strategy) {
    case 'wrongFormula':
      // جمع بدلاً من الضرب
      distracters.push(Math.round((variables.a || 0) + (variables.b || 0)));
      break;
      
    case 'partialSolution':
      // حل جزئي - الخطوة الأولى فقط
      distracters.push(Math.round(variables.intermediate || 0));
      break;
      
    case 'doubleValue':
      // ضرب في 2
      distracters.push(Math.round(correctAnswer * 2));
      break;
      
    case 'halfValue':
      // قسمة على 2
      distracters.push(Math.round(correctAnswer / 2));
      break;
      
    case 'oppositeOperation':
      // العملية المعاكسة
      distracters.push(Math.round(-correctAnswer));
      break;
      
    case 'similarNumber':
      // رقم قريب (±10%)
      const variation = Math.round(correctAnswer * 0.1);
      distracters.push(correctAnswer + variation);
      distracters.push(correctAnswer - variation);
      break;
      
    case 'commonMistake':
      // خطأ شائع محدد
      distracters.push(Math.round(variables.commonMistake || correctAnswer + 5));
      break;
  }
  
  return distracters.filter(d => d !== correctAnswer && d > 0);
}

// ===== 3. دالة توليد سؤال واحد =====
function generateSingleQuestion(template, scenario, difficulty) {
  // اختر صيغة لغوية عشوائية
  const linguisticVariation = template.linguisticVariations[
    Math.floor(Math.random() * template.linguisticVariations.length)
  ];
  
  // وليد متغيرات عشوائية
  const variables = {};
  for (const [varName, varConfig] of Object.entries(template.variables)) {
    variables[varName] = generateRandomVariable(
      varConfig.min,
      varConfig.max,
      varConfig.step
    );
  }
  
  // استبدل المتغيرات في الصيغة اللغوية
  let questionText = linguisticVariation;
  for (const [varName, value] of Object.entries(variables)) {
    questionText = questionText.replace(`{${varName}}`, value);
  }
  
  // احسب الإجابة الصحيحة
  // (هنا نفترض أن الصيغة موجودة في template.correctAnswerFormula)
  // في الواقع سنستخدم Function لتنفيذ الصيغة
  let correctAnswer = 0;
  try {
    // إنشة دالة من الصيغة
    const formula = template.correctAnswerFormula;
    const func = new Function(...Object.keys(variables), `return ${formula}`);
    correctAnswer = Math.round(func(...Object.values(variables)));
  } catch (e) {
    console.error('Error calculating answer:', e);
    return null;
  }
  
  // وليد خيارات خاطئة ذكية
  const distractors = [];
  
  // استراتيجية 1: صيغة خاطئة
  if (template.distractors.wrongCalculation) {
    let wrongCalc = template.distractors.wrongCalculation;
    for (const [varName, value] of Object.entries(variables)) {
      wrongCalc = wrongCalc.replace(`{${varName}}`, value);
    }
    try {
      const result = eval(wrongCalc);
      if (result !== correctAnswer) distractors.push(Math.round(result));
    } catch (e) {}
  }
  
  // استراتيجية 2: حل جزئي
  if (template.distractors.wrongOperation) {
    let wrongOp = template.distractors.wrongOperation;
    for (const [varName, value] of Object.entries(variables)) {
      wrongOp = wrongOp.replace(`{${varName}}`, value);
    }
    try {
      const result = eval(wrongOp);
      if (result !== correctAnswer) distractors.push(Math.round(result));
    } catch (e) {}
  }
  
  // استراتيجية 3: قيمة مشابهة
  if (template.distractors.halfValue) {
    let halfCalc = template.distractors.halfValue;
    for (const [varName, value] of Object.entries(variables)) {
      halfCalc = halfCalc.replace(`{${varName}}`, value);
    }
    try {
      const result = eval(halfCalc);
      if (result !== correctAnswer) distractors.push(Math.round(result));
    } catch (e) {}
  }
  
  // أضف قيمة عشوائية قريبة
  const variation = Math.max(1, Math.round(correctAnswer * 0.1));
  const randomDistractor = correctAnswer + (Math.random() > 0.5 ? variation : -variation);
  distractors.push(Math.round(randomDistractor));
  
  // اخلط الخيارات
  const options = [
    { text: correctAnswer.toString(), isCorrect: true },
    ...distractors.slice(0, 3).map((d, idx) => ({
      text: d.toString(),
      isCorrect: false,
      id: String.fromCharCode(66 + idx) // B, C, D
    }))
  ];
  
  // اخلط الخيارات عشوائياً
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  shuffledOptions.forEach((opt, idx) => {
    opt.id = String.fromCharCode(65 + idx); // A, B, C, D
  });
  
  // وليد الحل المفصل
  const solution = {
    summary: `${template.description}`,
    given: [
      ...Object.entries(variables).map(([k, v]) => `${k}: ${v}`)
    ],
    required: "الإجابة",
    formula: template.formula,
    steps: [
      {
        step: 1,
        description: "استبدل المتغيرات في الصيغة",
        calculation: questionText
      },
      {
        step: 2,
        description: "احسب النتيجة",
        calculation: `الإجابة = ${correctAnswer}`
      }
    ],
    answer: correctAnswer.toString(),
    verification: `✓ تحقق: ${correctAnswer} هي الإجابة الصحيحة`,
    commonMistakes: template.commonMistakes || [],
    tips: [
      "اقرأ السؤال بعناية",
      "تأكد من فهم المطلوب",
      "استخدم الصيغة الصحيحة"
    ]
  };
  
  // إنشاء السؤال النهائي
  const question = {
    questionId: `Q_${template.id}_${Date.now()}`,
    skillId: template.skillId,
    templateId: template.id,
    difficulty: difficulty,
    scenario: scenario.id,
    question: {
      text: questionText,
      languageLevel: "simple",
      estimatedTime: template.estimatedTime || 2
    },
    options: shuffledOptions,
    solution: solution,
    variables: variables,
    metadata: {
      createdAt: new Date().toISOString(),
      status: "published",
      performanceData: {
        timesUsed: 0,
        successRate: 0,
        averageTime: 0
      }
    }
  };
  
  return question;
}

// ===== 4. دالة توليد 50 سؤال =====
function generateBatch50Questions(skillId, templatesData, scenariosData) {
  const questions = [];
  
  // توزيع الأسئلة على مستويات الصعوبة
  const distribution = {
    foundation: 10,
    basic: 10,
    intermediate: 15,
    advanced: 10,
    qudrat: 5
  };
  
  // الحصول على قوالب المهارة
  const skillTemplates = templatesData[skillId]?.templates || [];
  
  if (skillTemplates.length === 0) {
    console.error(`لا توجد قوالب للمهارة: ${skillId}`);
    return [];
  }
  
  // لكل مستوى صعوبة
  for (const [difficulty, count] of Object.entries(distribution)) {
    for (let i = 0; i < count; i++) {
      // اختر قالب عشوائي بنفس مستوى الصعوبة
      const matchingTemplates = skillTemplates.filter(
        t => t.difficulty === difficulty
      );
      
      if (matchingTemplates.length === 0) {
        console.warn(`لا توجد قوالب للصعوبة: ${difficulty}`);
        continue;
      }
      
      const template = matchingTemplates[
        Math.floor(Math.random() * matchingTemplates.length)
      ];
      
      // اختر سيناريو عشوائي
      const scenarioKey = template.scenario;
      const scenario = scenariosData[scenarioKey] || { id: scenarioKey };
      
      // وليد السؤال
      const question = generateSingleQuestion(template, scenario, difficulty);
      
      if (question) {
        questions.push(question);
      }
    }
  }
  
  return questions;
}

// ===== 5. دالة التحقق من الجودة =====
function validateQuestion(question) {
  const issues = [];
  
  // تحقق من وجود سؤال
  if (!question.question?.text) {
    issues.push("❌ نص السؤال مفقود");
  }
  
  // تحقق من عدد الخيارات
  if (!question.options || question.options.length !== 4) {
    issues.push("❌ يجب أن يكون هناك 4 خيارات");
  }
  
  // تحقق من وجود إجابة صحيحة واحدة فقط
  const correctCount = question.options.filter(o => o.isCorrect).length;
  if (correctCount !== 1) {
    issues.push(`❌ يجب أن تكون هناك إجابة صحيحة واحدة فقط (وجد: ${correctCount})`);
  }
  
  // تحقق من الحل
  if (!question.solution?.answer) {
    issues.push("❌ الحل مفقود");
  }
  
  // تحقق من تطابق الإجابة الصحيحة مع الحل
  const correctOption = question.options.find(o => o.isCorrect);
  if (correctOption && correctOption.text !== question.solution?.answer) {
    issues.push("❌ عدم تطابق بين الخيار الصحيح والحل");
  }
  
  return {
    isValid: issues.length === 0,
    issues: issues
  };
}

// ===== 6. دالة تصدير الأسئلة =====
function exportQuestions(questions, format = 'json') {
  switch(format) {
    case 'json':
      return JSON.stringify(questions, null, 2);
    
    case 'csv':
      let csv = "رقم السؤال,المهارة,المستوى,السؤال,الإجابة الصحيحة\n";
      questions.forEach(q => {
        const correctAnswer = q.options.find(o => o.isCorrect)?.text;
        csv += `"${q.questionId}","${q.skillId}","${q.difficulty}","${q.question.text}","${correctAnswer}"\n`;
      });
      return csv;
    
    case 'html':
      let html = '<html dir="rtl"><head><meta charset="UTF-8"><style>body{font-family:Arial;}</style></head><body>';
      questions.forEach((q, idx) => {
        html += `<div style="page-break-after:always; padding:20px; border:1px solid #ccc; margin-bottom:20px;">`;
        html += `<h3>السؤال ${idx + 1}:</h3>`;
        html += `<p>${q.question.text}</p>`;
        html += `<ol>`;
        q.options.forEach(opt => {
          html += `<li>${opt.text}</li>`;
        });
        html += `</ol>`;
        html += `</div>`;
      });
      html += '</body></html>';
      return html;
    
    default:
      return JSON.stringify(questions, null, 2);
  }
}

// ===== 7. دالة الإحصائيات =====
function generateStatistics(questions) {
  const stats = {
    totalQuestions: questions.length,
    byDifficulty: {},
    bySkill: {},
    byScenario: {},
    validQuestions: 0,
    invalidQuestions: 0,
    issues: []
  };
  
  questions.forEach(q => {
    // إحصائيات الصعوبة
    stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;
    
    // إحصائيات المهارة
    stats.bySkill[q.skillId] = (stats.bySkill[q.skillId] || 0) + 1;
    
    // إحصائيات السيناريو
    stats.byScenario[q.scenario] = (stats.byScenario[q.scenario] || 0) + 1;
    
    // التحقق من الجودة
    const validation = validateQuestion(q);
    if (validation.isValid) {
      stats.validQuestions++;
    } else {
      stats.invalidQuestions++;
      stats.issues.push({
        questionId: q.questionId,
        issues: validation.issues
      });
    }
  });
  
  return stats;
}

// ===== 8. دالة مثال الاستخدام =====
function generateExampleBatch() {
  // استيراد البيانات (في التطبيق الحقيقي ستكون من الملفات)
  const templatesData = {
    percentage: {
      templates: [
        // سيتم ملؤه من templates.json
      ]
    }
  };
  
  const scenariosData = {
    shopping: { id: 'shopping', name: 'التسوق' }
  };
  
  // وليد 50 سؤال
  const questions = generateBatch50Questions('percentage', templatesData, scenariosData);
  
  // احصل على الإحصائيات
  const statistics = generateStatistics(questions);
  
  return {
    questions: questions,
    statistics: statistics
  };
}

// ===== Export =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateRandomVariable,
    generateSmartDistracters,
    generateSingleQuestion,
    generateBatch50Questions,
    validateQuestion,
    exportQuestions,
    generateStatistics
  };
}
