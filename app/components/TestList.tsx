import { Button } from "@/components/ui/button";

interface TestListProps {
    tests: { test_name: string }[];
    selectedTest: number;
    onSelectTest: (testNumber: number) => void;
}

const TestList: React.FC<TestListProps> = ({
    tests,
    selectedTest,
    onSelectTest,
}) => {
    return (
        <>
            <h2 className="text-2xl font-bold">Tests</h2>
            {tests.map((test, i) => (
                <Button
                    key={test.test_name}
                    className="w-full justify-start overflow-hidden"
                    onClick={() => onSelectTest(i)}
                    variant={selectedTest === i ? "secondary" : "primary"}
                >
                    {test.test_name}
                </Button>
            ))}
        </>
    );
};

export default TestList;
