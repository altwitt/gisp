const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

export const getArrayOfRandomNumbers = (desiredLength, max) => {
  let array = [];
  while (array.length < desiredLength) {
    let randomNumber = getRandomNumber(max);
    if (!array.includes(randomNumber)) {
      array.push(randomNumber);
    }
  }
  return array;
};

//Source: https://javascript.info/task/shuffle
export const shuffleAnswers = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

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

export const generateExam = (examQuestions, desiredLength) => {
  let indexes = getArrayOfRandomNumbers(desiredLength, examQuestions.length);
  let exam = [];

  indexes.forEach((index) => {
    let questions = {};
    questions.question = examQuestions[index].question;
    let answerIndex = examQuestions[index].answer - 1;
    let copiedAnswers = [...examQuestions[index].a];
    questions.correctAnswer = examQuestions[index].a[answerIndex];
    questions.answers = shuffleAnswers(copiedAnswers);

    exam.push(questions);
  });

  return exam;
};
