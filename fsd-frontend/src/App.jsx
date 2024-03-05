import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import AddQuestion from "./components/question/AddQuestion"
import UpdateQuestion from "./components/question/UpdateQuestion"
import GetAllQuiz from "./components/quiz/GetAllQuiz"



function App() {
	return (
		<main className="container mt-5 mb-5">
			<Router>
			
				<Routes>
				

					<Route path="/create-quiz" element={<AddQuestion />} />
					<Route path="/update-quiz/:id" element={<UpdateQuestion />} />
					<Route path="/all-quizzes" element={<GetAllQuiz />} />
				
				</Routes>
			</Router>
		</main>
	)
}

export default App