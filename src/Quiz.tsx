import { useState } from "react";

interface Question {
  question: string;
  options: string[];
}

// Questions list
const questions: Question[] = [
  { question: "What sound does a cat make?", options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"] },
  { question: "What would you probably find in your fridge?", options: ["Shoes", "Ice Cream", "Books"] },
  { question: "What color are bananas?", options: ["Blue", "Yellow", "Red"] },
  { question: "How many stars are in the sky?", options: ["Two", "Infinite", "One Hundred"] },
];

// Correct answers (must match exactly)
const correctAnswers = ["Meow-Meow", "Ice Cream", "Yellow", "Infinite"];

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showScore, setShowScore] = useState(false);

  const handleOptionClick = (option: string) => {
    const next = [...answers];
    next[current] = option;
    setAnswers(next);
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const prevQuestion = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = () => setShowScore(true);

  const handleRestart = () => {
    setCurrent(0);
    setAnswers([]);
    setShowScore(false);
  };

  // Progress calculation
  const progress = ((current + 1) / questions.length) * 100;

  // Score calculation (each correct = 15%, total 60%)
  const correctCount = answers.filter((ans, index) => ans === correctAnswers[index]).length;
  const score = (correctCount / questions.length) * 60; // max score = 60%

  return (
    <div className="w-full min-h-screen bg-[radial-gradient(circle_at_top_left,#BECFEE_0%,#71C6E2_25%,#D9F4FA_60%,#BECFEE_100%)] flex items-center justify-center p-4">
      <div className="w-full max-w-[900px] bg-white rounded-[50px] shadow-xl p-8 flex flex-col items-center">

        {/* TITLE */}
        <h1 className="text-[90px] leading-[102px] italic font-[800] tracking-[-4px] bg-[linear-gradient(90deg,#15313D_0%,#3CABDA_100%)] bg-clip-text text-transparent font-['DM_Serif_Display',serif] text-center">
          Test Your Knowledge
        </h1>

        <p className="text-[20px] leading-[24px] text-[#15313D] text-center font-manrope font-medium mt-2">
          Answer all questions to see your results
        </p>

        {/* Score Page */}
        {showScore ? (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold">
              Your Final Score is {score}%
            </h2>

            <p className="mt-2 text-gray-600">
              You got {correctCount} out of {questions.length} correct.
            </p>

            <div className="mt-6 flex justify-center gap-4">
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={handleRestart}
              >
                Start Again
              </button>
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Keep Learning!
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="mt-8 w-full">
              <div className="h-2 bg-[#E2EBF6] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F7C948] transition-all duration-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mt-8 w-full bg-[#E4F2FF] rounded-[16px] p-4">
              <h2 className="text-[18px] leading-[26px] font-medium text-[#15313D]">
                {current + 1}. {questions[current].question}
              </h2>
            </div>

            {/* Options */}
            <div className="mt-4 w-full flex flex-col gap-3">
              {questions[current].options.map((option) => {
                const selected = answers[current] === option;

                return (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className={`h-14 w-full rounded-[12px] border px-4 text-left text-[16px] leading-[24px] transition-all ${
                      selected
                        ? "bg-[#E4F2FF] border-[#7DB4FF] text-[#15313D]"
                        : "bg-white border-[#E0E7F1] text-[#4A5C73] hover:bg-[#F3F7FF]"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="mt-6 flex justify-between w-full">
              <button
                onClick={prevQuestion}
                disabled={current === 0}
                className="px-4 py-2 bg-white border border-[#E0E7F1] rounded-lg disabled:opacity-40 hover:bg-[#F3F7FF]"
              >
                Previous
              </button>

              {current === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-[#1C90F3] text-white rounded-lg hover:bg-[#1776CC]"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-4 py-2 bg-[#1C90F3] text-white rounded-lg hover:bg-[#1776CC]"
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
