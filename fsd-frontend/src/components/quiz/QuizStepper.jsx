import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../../utils/QuizService";

const QuizStepper = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedNumQuestions, setSelectedNumQuestions] = useState("");
    const [subjects, setSubjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSubjectData();
    }, []);

    const fetchSubjectData = async () => {
        try {
            const subjectsData = await getSubjects();
            setSubjects(subjectsData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNext = () => {
        if (currentStep === 3) {
            if (selectedSubject && selectedNumQuestions) {
                navigate("/take-quiz", { state: { selectedNumQuestions, selectedSubject } });
            } else {
                alert("Please select a subject and number of questions.");
            }
        } else {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };

    const handleNumQuestionsChange = (event) => {
        setSelectedNumQuestions(event.target.value);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div style={{width:"1000px",height: "200px",marginLeft:"" }} >
                        <h3 className="text-black mb-2">Step 1: I want to take a quiz on :</h3>

                        <select
                            className="form-select"
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                        >
                            <option value="" >Select a subject</option>
                            {subjects.map((subject) => (
                                <option key={subject} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            case 2:
                return (
                    <div style={{width:"1200px"}}>
                        <h3 className="text-black mb-2">Step 2: How many questions would you like to attempt ?</h3>
                        <input
                            type="number"
                            className="form-control"
                            value={selectedNumQuestions}
                            onChange={handleNumQuestionsChange}
                            placeholder="Enter the number of questions"
                        />
                    </div>
                );
            case 3:
                return (
                    <div style={{width:"1200px"}}>
                        <h3 className="text-black mb-2">Step 3: Confirmation</h3>
						<p>Subject: <span style={{ color: "red" }}>{selectedSubject}</span></p>

						<p>Number of Questions: <span style={{ color: "red" }}>{selectedNumQuestions}</span></p>

                    </div>
                );
            default:
                return null;
        }
    };

    const progressBarColor = () => {
        switch (currentStep) {
            case 1:
                return "bg-danger"; // Green color for step 1
            case 2:
                return "bg-success"; // Red color for step 2
            default:
                return "bg-success";
        }
    };

    return (
        <section className="mt-5">
            <h3 className="text-primary mb-4">Welcome to Quizify</h3>
            <div className="progress">
                <div
                    className={`progress-bar ${progressBarColor()}`}
                    role="progressbar"
                    style={{ width: `${(currentStep - 1) * 50}%` }}
                    aria-valuenow={currentStep}
                    aria-valuemin="1"
                    aria-valuemax="3"
                >
                    Step {currentStep}
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    {renderStepContent()}
                    <div className="d-flex justify-content-between mt-4">
                        {currentStep > 1 && (
                            <button className="btn btn-primary" onClick={handlePrevious}>
                                Previous
                            </button>
                        )}
                        {currentStep < 3 && (
                            <button
                                className="btn btn-primary"
                                onClick={handleNext}
                                disabled={
                                    (currentStep === 1 && !selectedSubject) ||
                                    (currentStep === 2 && !selectedNumQuestions)
                                }
                            >
                                Next
                            </button>
                        )}
                        {currentStep === 3 && (
                            <button className="btn btn-success" onClick={handleNext}>
                                Start Quiz
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuizStepper;
