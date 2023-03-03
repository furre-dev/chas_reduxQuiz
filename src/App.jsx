import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useQuiz } from "./redux/quiz"

function App() {
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const data = useQuiz().questions;
  console.log(data)


  function correctGuess() {
    setScore(score + 1)

    setCurrentQuestion(currentQuestion + 1)
  }
  function falseGuess() {
    setCurrentQuestion(currentQuestion + 1)
  }


  return (
    <div className="App w-screen h-screen flex justify-center items-center">

      {data.length > currentQuestion ?
        <div className='flex justify-center items-center flex-col'>
          <h1 className=' text-5xl py-10'>{data[currentQuestion].title}</h1>
          <div className='grid grid-cols-2 gap-3'>
            {data[currentQuestion].questions.map((item, index) => {
              if (index === (data[currentQuestion].correctAnswer - 1)) {
                return <button onClick={correctGuess} key={index} className='w-64 h-24 bg-gray-600 text-white rounded-2xl'>{item}</button>
              }
              return <button onClick={falseGuess} key={index} className='w-64 h-24 bg-gray-600 text-white rounded-2xl'>{item}</button>
            })}
          </div>
          <h2 className='py-10'>Score : {score}</h2>
        </div>
        :
        <div className='text-center'>You are done with every question on this quiz! Head on to the admin page to add new questions.<br /><br />
          You got {score} out of {data.length} points!!!</div>
      }

    </div>
  )
}

export default App
