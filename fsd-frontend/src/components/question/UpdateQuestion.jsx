import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionById, updateQuestion } from "../../../utils/QuizService";

const UpdateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState([{ id: "", choiceValue: "" }]);
  const [correctAnswers, setCorrectAnswers] = useState([{ id: "", correctAnswerValue: "" }]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const questionToUpdate = await getQuestionById(id);
      if (questionToUpdate) {
        setQuestion(questionToUpdate.question);
        setChoices(questionToUpdate.choices);
        setCorrectAnswers(questionToUpdate.correctAnswers);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleChoiceChange = (index, e) => {
    const updatedChoices = [...choices];
    updatedChoices[index].choiceValue = e.target.value;
    setChoices(updatedChoices);
  };

  const handleCorrectAnswerChange = (index, e) => {
    const updatedCorrectAnswers = [...correctAnswers];
    updatedCorrectAnswers[index].correctAnswerValue = e.target.value;
    setCorrectAnswers(updatedCorrectAnswers);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedQuestion = {
        question,
        choices,
        correctAnswers,
      };
      await updateQuestion(id, updatedQuestion);
      navigate("/all-quizzes");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container" style={{paddingLeft:"600px",width:"1000px"}}>
      <div className="row justify-content-center mt-5">
        <div className="col-md-20">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="card-title mb-0">Update Quiz Question</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label className="form-label text-primary">Question:</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={question}
                    onChange={handleQuestionChange}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label text-primary">Choices:</label>
                  {choices.map((choice, index) => (
                    <input
                      key={index}
                      type="text"
                      className="form-control mb-3"
                      value={choice.choiceValue}
                      onChange={(e) => handleChoiceChange(index, e)}
                    />
                  ))}
                </div>
                <div className="mb-3">
                  <label className="form-label text-primary">Correct Answer(s):</label>
                  {correctAnswers.map((answer, index) => (
                    <input
                      key={index}
                      type="text"
                      className="form-control mb-3"
                      value={answer.correctAnswerValue}
                      onChange={(e) => handleCorrectAnswerChange(index, e)}
                    />
                  ))}
                </div>

                <div className="btn-group">
                  <button type="submit" className="btn btn-warning">
                    Update Question
                  </button>
                  <Link to={"/all-quizzes"} className="btn btn-primary ml-2">
                    Back to All Questions
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

export default UpdateQuestion;
