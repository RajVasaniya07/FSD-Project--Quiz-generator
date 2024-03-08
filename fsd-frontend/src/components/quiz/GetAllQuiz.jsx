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

    if (isLoading) {
        return <center><p>Loading...</p></center>;
    }

    return (
        <section className="container my-5"  style={{paddingLeft:"600px"}}>
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h4>All Quiz Questions</h4>
                </div>
                <div className="col-md-6 text-end">
                    <Link to={"/create-quiz"} className="btn btn-primary">
                        <FaPlus className="me-1" /> Add Question
                    </Link>
                </div>
            </div>
            <hr />
            {isQuestionDeleted && <div className="alert alert-success">{deleteSuccess}</div>}
            {questions.map((question, index) => (
                <div key={question.id} className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">{`${index + 1}. ${question.question}`}</h5>
                        <ul className="list-unstyled">
                            {question.choices.map((choice, index) => (
                                <li key={index}>{choice.choiceValue}</li>
                            ))}
                        </ul>
                        <p className="text-success">Correct Answers: {question.correctAnswers.map((correctAnswer) => correctAnswer.correctAnswerValue).join(', ')}</p>
                        <div className="btn-group">
                            <Link to={`/update-quiz/${question.id}`} className="btn btn-warning">
                                <FaEdit className="me-1" /> Edit Question
                            </Link>
                            <button className="btn btn-danger" onClick={() => handleDeleteQuestion(question.id)}>
                                <FaTrashAlt className="me-1" /> Delete Question
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default GetAllQuiz;
