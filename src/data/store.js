import { readable, writable, derived, get } from "svelte/store";
import { generateExam, getPercentage } from "../components/utils";
import { mcExam } from "./data";

// Settings
export const maxNumberOfQuestions = readable(mcExam.questions.length);
export const numberOfQuestions = writable(2);

// App State
export const hasExamBegun = writable(true);
export const currentQuestionIndex = writable(0);
export const isExamDone = writable(false);

// Data
export const mcExamQuestions = readable(mcExam.questions);
export const mcExamTitle = readable(mcExam.title);
export const exam = derived(
  hasExamBegun,
  ($hasExamBegun, set) => {
    if ($hasExamBegun) {
      set(generateExam(get(mcExamQuestions), get(numberOfQuestions)));
    }
  },
  []
);
export const score = writable(0);
export const scorePercentage = derived(
  [score, exam],
  ([$score, $exam]) => {
    return getPercentage($score, $exam.length);
  },
  0
);
export const detailedScore = writable([]);
export const reset = () => {
  score.set(0);
  hasExamBegun.set(true);
  currentQuestionIndex.set(0);
  isExamDone.set(false);
  detailedScore.set([]);
};
