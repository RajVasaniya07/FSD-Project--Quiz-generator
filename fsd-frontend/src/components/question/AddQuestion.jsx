import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createQuestion, getSubjects } from "../../../utils/QuizService";

const AddQuestion = () => {
    const [question, setQuestionText] = useState("");
    const [questionType, setQuestionType] = useState("single");
    const [choices, setChoices] = useState([""]);
    const [correctAnswers, setCorrectAnswers] = useState([""]);
    const [subject, setSubject] = useState("");
    const [newSubject, setNewSubject] = useState("");
    const [subjectOptions, setSubjectOptions] = useState([]);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const subjectsData = await getSubjects();
            setSubjectOptions(subjectsData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddChoice = () => {
        const lastChoice = choices[choices.length - 1];
        const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A";
        const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1);
        const newChoice = `${newChoiceLetter}.`;
        setChoices([...choices, newChoice]);
    };

    const handleRemoveChoice = (index) => {
        setChoices(choices.filter((choice, i) => i !== index));
    };

    const handleChoiceChange = (index, value) => {
        setChoices(choices.map((choice, i) => (i === index ? value : choice)));
    };

    const handleCorrectAnswerChange = (index, value) => {
        setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)));
    };

    const handleAddCorrectAnswer = () => {
        setCorrectAnswers([...correctAnswers, ""]);
    };

    const handleRemoveCorrectAnswer = (index) => {
        setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = {
                question,
                questionType,
                choices,
                correctAnswers: correctAnswers.map((answer) => {
                    const choiceLetter = answer.charAt(0).toUpperCase();
                    const choiceIndex = choiceLetter.charCodeAt(0) - 65;
                    return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null;
                }),
                subject,
            };

            await createQuestion(result);

            setQuestionText("");
            setQuestionType("single");
            setChoices([""]);
            setCorrectAnswers([""]);
            setSubject("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddSubject = () => {
        if (newSubject.trim() !== "") {
            setSubject(newSubject.trim());
            setSubjectOptions([...subjectOptions, newSubject.trim()]);
            setNewSubject("");
        }
    };

    return (
        <div className="container py-5" style={{width:"700px",marginLeft:"400px"}}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                    <div className="card-header bg-primary text-white">

                            <center><h5 className="card-title mb-0">Add New Quiz</h5></center>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                <label htmlFor="subject"  className="form-label text-primary">

                                        Select a Subject
                                    </label>
                                    <select
                                        id="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="form-control"
                                    >
                                        <option value="" style={{ color: 'red' }} >Select subject or topic</option>
                                        <option value={"New"}  style={{ color: 'red' }}>Add New subject or topic</option>
                                        {subjectOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {subject === "New" && (
                                    <div className="mb-3">
                                        <label htmlFor="new-subject"  className="form-label text-primary">
                                            Add New Subject or topic here
                                        </label>
                                        <input
                                            type="text"
                                            id="new-subject"
                                            value={newSubject}
                                            onChange={(event) => setNewSubject(event.target.value)}
                                            className="form-control"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddSubject}
                                            
                                            className="btn btn-outline-primary mt-2"
                                        >
                                            Add Subject
                                        </button>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="question-text" className="form-label text-primary">
                                        Question
                                    </label>
                                    <textarea
                                        className="form-control"
                                        rows={4}
                                        value={question}
                                        onChange={(e) => setQuestionText(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="question-type" className="form-label text-primary">
                                        Question type
                                    </label>
                                    <select
                                        id="question-type"
                                        value={questionType}
                                        onChange={(event) => setQuestionType(event.target.value)}
                                        className="form-control"
                                    >
                                        <option value="single" style={{color:"red"}}>Single Answer</option>
                                        <option value="multiple" style={{color:"red"}}>Multiple Answer</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="choices" className="form-label text-primary">
                                        Choices or options
                                    </label>
                                    {choices.map((choice, index) => (
                                        <div key={index} className="input-group mb-3">
                                            <input
                                                type="text"
                                                value={choice}
                                                onChange={(e) => handleChoiceChange(index, e.target.value)}
                                                className="form-control"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveChoice(index)}
                                                className="btn btn-outline-danger"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handleAddChoice}
                                        className="btn btn-outline-primary"
                                    >
                                        Add Option
                                    </button>
                                </div>
                                {questionType === "single" && (
                                    <div className="mb-3">
                                        <label htmlFor="answer" className="form-label text-success">
                                            Correct Answer
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="answer"
                                            value={correctAnswers[0]}
                                            onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
                                        />
                                    </div>
                                )}
                                {questionType === "multiple" && (
                                    <div className="mb-3">
                                        <label htmlFor="answer" className="form-label text-success">
                                            Correct Answer(s)
                                        </label>
                                        {correctAnswers.map((answer, index) => (
                                            <div key={index} className="d-flex mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control me-2"
                                                    value={answer}
                                                    onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                                                />
                                                {index > 0 && (
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        onClick={() => handleRemoveCorrectAnswer(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary mt-2"
                                            onClick={handleAddCorrectAnswer}
                                        >
                                            Add Correct Answer
                                        </button>
                                    </div>
                                )}

                                {!correctAnswers.length && <p>Please enter at least one correct answer.</p>}

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-success">
                                        Save Question to database
                                    </button>
                                    <Link to={"/all-quizzes"} className="btn btn-primary">
                                        Back to existing questions
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddQuestion;
