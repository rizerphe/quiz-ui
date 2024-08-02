"use client";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import TestList from "./components/TestList";
import QuestionList from "./components/QuestionList";
import QuestionViewer from "./components/QuestionViewer";
import testsData from "./data/tests.json";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const HomePage: React.FC = () => {
    const [selectedTest, setSelectedTest] = useState<number>(0);
    const [selectedQuestion, setSelectedQuestion] = useState<number>(0);

    const currentTest = testsData[selectedTest];
    const currentQuestion = currentTest
        ? currentTest.questions[selectedQuestion]
        : null;

    const handleNext = (isCorrect: boolean) => {
        if (currentTest && currentQuestion) {
            const nextQuestionNumber = selectedQuestion + 1;

            if (nextQuestionNumber < currentTest.questions.length) {
                setSelectedQuestion(nextQuestionNumber);
            } else {
                const nextTestIndex = selectedTest + 1;
                if (nextTestIndex < testsData.length) {
                    setSelectedTest(nextTestIndex);
                    setSelectedQuestion(0);
                }
            }
        }
    };

    const handlePrev = () => {
        if (selectedQuestion > 0) {
            setSelectedQuestion(selectedQuestion - 1);
        } else if (selectedTest > 0) {
            setSelectedTest(selectedTest - 1);
            setSelectedQuestion(
                testsData[selectedTest - 1].questions.length - 1
            );
        }
    };

    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="lg">
                    <MdMenu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="grid gap-2 overflow-y-scroll h-full">
                    <TestList
                        tests={testsData}
                        selectedTest={selectedTest}
                        onSelectTest={setSelectedTest}
                    />
                    {currentTest && (
                        <QuestionList
                            questions={currentTest.questions}
                            selectedQuestion={selectedQuestion}
                            onSelectQuestion={setSelectedQuestion}
                        />
                    )}
                </div>
            </SheetContent>
            {currentQuestion && (
                <QuestionViewer
                    test_name={currentTest.test_name}
                    question={currentQuestion}
                    questionNumber={selectedQuestion + 1}
                    totalQuestions={currentTest.questions.length}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}
        </Sheet>
    );
};

export default HomePage;
