import React from "react"
import { useLocation, useNavigate } from "react-router-dom"

const QuizResult = () => {
    const location = useLocation()
    const { quizQuestions, totalScores } = location.state
    const numQuestions = quizQuestions.length
    const percentage = Math.round((totalScores / numQuestions) * 100)
    const navigate = useNavigate()

    const handleRetakeQuiz = () => {
        navigate("/quiz-stepper")
    }

    return (
        <section className="container mt-5 d-flex justify-content-center" style={{marginLeft:"350px"}}>
            <div className="card p-5" style={{ maxWidth: "500px" }}>
                <h3 className="card-title mb-4" style={{ color: "blue" }} >Your Quiz Result Summary</h3>
                <hr />
                <h5 className="card-text mb-3">
                    You answered <strong>{totalScores}</strong> out of <strong>{numQuestions}</strong> questions correctly.
                </h5>
                <p className="card-text"  style={{ color: "green" }}>Your total score is <strong>{percentage}%</strong>.</p>

                <button className="btn btn-primary btn-lg" onClick={handleRetakeQuiz}>
                    Give Again
                </button>
            </div>
        </section>
    )
}

export default QuizResult
