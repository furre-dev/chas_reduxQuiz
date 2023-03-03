// Redux funktioner (Reducers) som behövs.
// 1. addQuestion
// 2. updateQuestion
// 3. deleteQuestion

// 4. startQuizz ->
// sätt quizzStated = true, showResult = false,
// currentQuestion = 0, score = 0

// 5. answerQuestion ->
// kolla om det var rätt svar då öka score med 1
// kolla om det var sista frågan (Kolla om
//    currentQuestion är == questions.length - 1)
//    då ändra showResult = true.
// Öka currentQuestion med 1.

// Data för frågorna och quizzet:

import { createReduxModule } from "hooks-for-redux";

const initalState = {
    quizzStated: true,
    showResult: false,
    currentQuestion: 0,
    score: 0,
    questions: [
        {
            title: "Vad heter huvudstaden i Sverige?",
            questions: ["Stockholm", "Göteborg", "Malmö", "Dubai"],
            correctAnswer: 1,
            id: 1,
        },
        {
            title: "Vad heter huvudstaden i Frankrike?",
            questions: ["Dubai", "Göteborg", "Paris", "Stockholm"],
            correctAnswer: 3,
            id: 2,
        },
    ],
};


export const [useQuiz, { removeItem, addItem, updateItem }] = createReduxModule(
    "quiz",
    initalState,
    {
        removeItem: (state, id) => {
            return {
                ...state,
                questions: state.questions.filter((item) => id !== item.id)
            };
        },
        addItem: (state, obj) => {
            return {
                ...state,
                questions: [...state.questions, obj],
            };
        },
        updateItem: (state, objWithId) => {
            return {
                ...state,
                questions: [...state.questions.map((item) => {
                    if (objWithId.id === item.id) {
                        item.title = objWithId.title
                        item.questions = objWithId.questions
                        item.correctAnswer = objWithId.correctAnswer
                        return item;
                    }
                    return item;
                })]
            };
        },


    }
)