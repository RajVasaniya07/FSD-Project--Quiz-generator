import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "../../../utils/QuizService";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";

const GetAllQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState("");

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const data = await getAllQuestions();
            setQuestions(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteQuestion = async (id) => {
        try {
            await deleteQuestion(id);
            setQuestions(questions.filter((question) => question.id !== id));
            setIsQuestionDeleted(true);
            setDeleteSuccess("Question deleted successfully.");
        } catch (error) {
            console.error(error);
        }
        setTimeout(() => {
            setDeleteSuccess("");
        }, 4000);
    };

    return (
        <section className="container my-5" style={{ paddingTop: "20px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>All Quiz Questions</h4>
                <Link to={"/create-quiz"} className="btn btn-primary">
                    <FaPlus className="me-1" /> Add Question
                </Link>
            </div>
            <hr className="mb-4" />
            {isQuestionDeleted && <div className="alert alert-success">{deleteSuccess}</div>}
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {questions.map((question, index) => (
                    <div key={question.id}>
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h5 className="card-title">{`${index + 1}. ${question.question}`}</h5>
                                    <ul className="list-group">
                                        {question.choices.map((choice, index) => (
                                            <li key={index} className="list-group-item">{choice.choiceValue}</li>
                                        ))}
                                    </ul>
                                    <p className="text-success">Correct Answers: {question.correctAnswers.map((correctAnswer) => correctAnswer.correctAnswerValue).join(', ')}</p>
                                </div>
                                <div className="btn-group mt-2">
    <Link to={`/update-quiz/${question.id}`} className="btn btn-warning">
        <FaEdit className="me-1" /> Edit Question
    </Link>
    <button className="btn btn-danger ms-2" onClick={() => handleDeleteQuestion(question.id)}>
        <FaTrashAlt className="me-1" /> Delete Question
    </button>
</div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GetAllQuiz;
