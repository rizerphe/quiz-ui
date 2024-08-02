import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";

interface QuestionViewerProps {
    test_name: string;
    question: {
        question_text: string;
        answers: string[];
        correct_answers: string[];
    };
    questionNumber: number;
    totalQuestions: number;
    onNext: (isCorrect: boolean) => void;
    onPrev?: () => void;
}

const QuestionViewer: React.FC<QuestionViewerProps> = ({
    test_name,
    question,
    questionNumber,
    totalQuestions,
    onNext,
    onPrev,
}) => {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [isHighlighted, setIsHighlighted] = useState(false);
    const [focusedAnswer, setFocusedAnswer] = useState<number>(0);

    useEffect(() => {
        setIsHighlighted(false);
        setSelectedAnswers([]);
        setFocusedAnswer(0);
    }, [question]);

    const handleAnswerChange = (answer: string) => {
        setSelectedAnswers((prev) =>
            prev.includes(answer)
                ? prev.filter((a) => a !== answer)
                : [...prev, answer]
        );
    };

    const handleNext = () => {
        const isCorrect =
            selectedAnswers.sort().join() ===
            question.correct_answers.sort().join();
        if (isCorrect || isHighlighted) {
            if (isCorrect) {
                toast("Correct!", { type: "success" });
            }
            onNext(isCorrect);
        } else {
            setIsHighlighted(true);
        }
    };

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                setFocusedAnswer((prev) =>
                    prev < question.answers.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === "ArrowUp") {
                setFocusedAnswer((prev) =>
                    prev > 0 ? prev - 1 : question.answers.length - 1
                );
            } else if (e.key === "Enter") {
                handleAnswerChange(question.answers[focusedAnswer]);
                if (focusedAnswer < question.answers.length - 1) {
                    setFocusedAnswer(focusedAnswer + 1);
                } else {
                    handleNext();
                }
            } else if (e.key === " ") {
                handleAnswerChange(question.answers[focusedAnswer]);
            } else if (e.key === "Tab") {
                e.preventDefault();
                if (focusedAnswer < question.answers.length - 1) {
                    setFocusedAnswer(focusedAnswer + 1);
                } else {
                    handleNext();
                }
            } else if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === "ArrowLeft" && onPrev) {
                onPrev();
            }
        },
        [focusedAnswer, question, isHighlighted]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    return (
        <div className="col-span-2 flex flex-col flex-1 justify-between gap-6 p-6">
            <div>
                <div className="font-bold text-gray-600">{test_name}</div>
                <div className="text-gray-400">
                    Question {questionNumber} of {totalQuestions}
                </div>
                <h3 className="text-xl font-semibold">
                    {question.question_text}
                </h3>
                <ul className="space-y-2 p-6">
                    {question.answers.map((answer) => (
                        <li
                            key={answer}
                            className={`flex items-center gap-3 ${
                                isHighlighted &&
                                (question.correct_answers.includes(answer) ==
                                selectedAnswers.includes(answer)
                                    ? "text-green-500"
                                    : "text-red-500")
                            } ${
                                focusedAnswer ===
                                question.answers.indexOf(answer)
                                    ? "bg-gray-800"
                                    : ""
                            } p-2 rounded`}
                            onClick={() => {
                                handleAnswerChange(answer);
                                setFocusedAnswer(
                                    question.answers.indexOf(answer)
                                );
                            }}
                        >
                            <input
                                type="checkbox"
                                className="h-5 w-5"
                                checked={selectedAnswers.includes(answer)}
                            />
                            <label>{answer}</label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-end">
                <button
                    className="bg-gray-700 py-2 px-4 rounded hover:bg-gray-600"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default QuestionViewer;
