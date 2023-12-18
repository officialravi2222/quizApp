const questions = [
    {
      question: 'What is 2 + 2?',
      answers: [
        { text: '4', correct: true },
        { text: '22', correct: false }
      ]
    },
    {
      question: 'Which is the largest mammal?',
      answers: [
        { text: 'Blue Whale', correct: false },
        { text: 'Elephant', correct: true },
        { text: 'Tiger', correct: false },
        { text: 'Bear', correct: false}
      ]
    },
    {
      question: 'What is the capital of India?',
      answers: [
        { text: 'Mumbai', correct: false },
        { text: 'Delhi', correct: true },
        { text: 'Banglore', correct: false },
        { text: 'Chennai', correct: false }
      ]
    },
    {
      question: 'What is 4 * 2?',
      answers: [
        { text: '6', correct: false },
        { text: '8', correct: true }
      ]
    }
  ]


  const question = document.getElementById("Question")
  const nxtBtn = document.getElementById("nxtBtn")
  const answers = document.getElementById("answers")
  console.warn(question)
//   const answers = document.getElementsByClassName("arr")
//   console.warn(answers)
  const arrayFromCollection  = Array.from(answers.children)
  console.warn("Arr>>",arrayFromCollection)

  let index = 0;

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nxtBtn.innerHTML = "Next"
    showQuestion()
}

// IT SHOWS THE QUESTIONS AND BEFORE SHOWING THE QUESTION WE HAVE TO DELETE PREVIOUS ELEMENTS

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;


    question.innerHTML = questionNo + " . " + currentQuestion.question
    
    // INNER ARRAY 

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn")
        answers.appendChild(button)

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    })
}


function resetState(){
    nxtBtn.style.display = "none"
    while(answers.firstChild){
        answers.removeChild(answers.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    console.warn(e.target.disabled)
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    arrayFromCollection.forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
            // e.target.disabled = true;
        
    })
    nxtBtn.style.display  = "block"

}

function  showScore(){
    resetState();
    question.innerHTML = `You scored ${score } out of ${questions.length} !`

    nxtBtn.innerHTML = "Play again"
    nxtBtn.style.display = "block"

}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }
    else{
        showScore();
    }
}

nxtBtn.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


startQuiz();

nxtBtn.style.display = "block"



