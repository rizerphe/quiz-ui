import { Button } from "@/components/ui/button";
import React from "react";

interface QuestionListProps {
    questions: { question_text: string }[];
    selectedQuestion: number;
    onSelectQuestion: (questionNumber: number) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
    questions,
    selectedQuestion,
    onSelectQuestion,
}) => {
    return (
        <>
            <h2 className="text-2xl font-bold">Questions</h2>
            {questions.map((question, i) => (
                <Button
                    key={i}
                    className="w-full justify-start overflow-hidden"
                    onClick={() => onSelectQuestion(i)}
                    variant={selectedQuestion === i ? "secondary" : "primary"}
                >
                    {question.question_text}
                </Button>
            ))}
        </>
    );
};

export default QuestionList;
