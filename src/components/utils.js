export const getDisplayValue = (value) => {
  if (typeof value === "boolean") {
    if (value === true) {
      return "True";
    } else if (value === false) {
      return "False";
    }
  }

  return value;
};

export const getPercentageColor = (value) => {
  if (value >= 90) {
    return "#008568";
  } else if (value >= 80) {
    return "#0074C8";
  } else if (value >= 70) {
    return "#d17216";
  } else {
    return "#d11616";
  }
};

export const getPercentage = (score, max) => {
  let percentage = 0;
  if (typeof score === "number" && typeof max === "number") {
    percentage = Math.round((score / max) * 100);
  }
  return percentage;
};

export const generateExam = (examQuestions) => {
  let exam = [];

  for (const element of examQuestions) {
    let questions = {};
    questions.question = element.question;
    let answerIndex = element.answer - 1;
    let copiedAnswers = [...element.a];
    questions.correctAnswer = element.a[answerIndex];
    questions.answers = copiedAnswers;

    exam.push(questions);
  }

  return exam;
};
