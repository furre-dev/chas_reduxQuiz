import { useEffect, useState } from "react";
import { useQuiz, removeItem, addItem, updateItem } from "./redux/quiz"


export default function Admin() {
    const [modalStatus, setModalStatus] = useState(false);


    const [title, setTitle] = useState("")
    const [answerArr, setAnswerArr] = useState([])
    const [correctAns, setCorrectAns] = useState(0)
    const id = Date.now();

    const [changeTitle, setChangeTitle] = useState("");
    const [updateAnswerArr, setUpdateAnswerArr] = useState([]);
    const [updateCorrectAns, setUpdateCorrectAns] = useState(0)

    const [currId, setCurrId] = useState();

    function handleChangeTitle(e) {
        setChangeTitle(e.target.value)
    }

    function handleUpdateAnswerArr(e, num) {
        const arrayCopy = [...updateAnswerArr];
        arrayCopy[num] = e.target.value
        setUpdateAnswerArr(arrayCopy);
    }

    function handleUpdateCorrect(e) {
        console.log(e.target.value)
        setUpdateCorrectAns(e.target.value)
    }



    function updateObj(id, title, questions, correctAnswer) {
        //check if there is empty input. If empty input dont update item.
        if (title && questions && correctAnswer) {
            updateItem({
                id,
                title,
                questions,
                correctAnswer
            })

            setModalStatus(false)
        }

    }

    function handleUpdate(id) {
        setModalStatus(true)

        setCurrId(id)
    }

    function handleAdd(title, questions, correctAnswer, id) {
        //check if there is empty input. If empty input dont add item.
        if (title && questions && correctAnswer) {
            const obj = {
                title,
                questions,
                correctAnswer,
                id
            }
            addItem(obj);
        }


    }

    function handleTitle(e) {
        setTitle(e.target.value)
    }

    function handleAnswerArr(e, num) {
        const arrayCopy = [...answerArr];
        arrayCopy[num] = e.target.value
        setAnswerArr(arrayCopy);
    }

    function handleCorrect(e) {
        console.log(e.target.value)
        setCorrectAns(e.target.value)
    }

    const data = useQuiz().questions;
    console.log(data)


    return (
        <>
            {modalStatus && <div className="bg-[#00000076] w-screen h-full absolute">
                <div className="flex h-full justify-center items-center">
                    <div className="bg-white flex flex-col gap-3 justify-center items-center py-3 px-2">
                        <button onClick={() => setModalStatus(false)}>X</button>
                        <input onChange={handleChangeTitle} className="text-center border border-black" placeholder="Question" />
                        <input onChange={(e) => handleUpdateAnswerArr(e, 0)} className="text-center border border-black" placeholder="Answer1" />
                        <input onChange={(e) => handleUpdateAnswerArr(e, 1)} className="text-center border border-black" placeholder="Answer2" />
                        <input onChange={(e) => handleUpdateAnswerArr(e, 2)} className="text-center border border-black" placeholder="Answer3" />
                        <input onChange={(e) => handleUpdateAnswerArr(e, 3)} className="text-center border border-black" placeholder="Answer4" />
                        <input onChange={handleUpdateCorrect} className="text-center border border-black" placeholder="Correct answer" />
                        <button onClick={() => updateObj(currId, changeTitle, updateAnswerArr, updateCorrectAns)} className="bg-cyan-200 px-10">Done!</button>
                    </div>
                </div>
            </div>}

            <div className="w-full flex justify-center py-10">
                <div className="flex-col flex gap-2 items-center">
                    <input onChange={handleTitle} className="border border-black text-center rounded-lg" placeholder="Question"></input>
                    <input onChange={(e) => handleAnswerArr(e, 0)} className="border border-black text-center rounded-lg" placeholder="Answer 1"></input>
                    <input onChange={(e) => handleAnswerArr(e, 1)} className="border border-black text-center rounded-lg" placeholder="Answer 2"></input>
                    <input onChange={(e) => handleAnswerArr(e, 2)} className="border border-black text-center rounded-lg" placeholder="Answer 3"></input>
                    <input onChange={(e) => handleAnswerArr(e, 3)} className="border border-black text-center rounded-lg" placeholder="Answer 4"></input>
                    <input onChange={handleCorrect} className="border border-black text-center rounded-lg" placeholder="Correct answer"></input>
                    <button onClick={() => handleAdd(title, answerArr, correctAns, id)} className="bg-cyan-500 rounded-lg w-2/4 text-white w-max px-10 py-2">Add</button>
                    <div className="pt-10">
                        <h1 className="border-b-2 border-black mb-10">Current data</h1>
                        <div className="flex gap-3 flex-wrap">
                            {data.map((quest) => {
                                return (
                                    <div className="p-5 text-center border space-y-3">
                                        <h1>{quest.title}</h1>
                                        <p>Question1: {quest.questions[0]}</p>
                                        <p>Question2: {quest.questions[1]}</p>
                                        <p>Question3: {quest.questions[2]}</p>
                                        <p>Question4: {quest.questions[3]}</p>
                                        <p>Correct answer: {quest.correctAnswer}</p>
                                        <div className="flex gap-3">
                                            <button onClick={() => removeItem(quest.id)} className="bg-red-500 grow">Delete</button>
                                            <button onClick={() => handleUpdate(quest.id)} className="bg-slate-500 grow">Update</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}