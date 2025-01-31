import './style.css'

    interface Question  {
      question: String;
      options: Array<string>;
      correct: Number;
    };

    
    const questions: Array<Question> = [
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2,
      },
      {
        question: "What is the capital of Brazil??",
        options: ["Rio de Janeiro", "Brasília", "Sal", "Salvador"],
        correct: 1,
      },
      {
        question: "What is the capital of Canada?",
        options: ["Ottawa", "Toronto", "Calgary", "Alberta"],
        correct: 0,
      },
      {
        question: "What is the capital of Japan?",
        options: ["Kyoto", "Tokyo", "Kobe", "Yokohama"],
        correct: 1,
      },
      {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Perth", "Victoria", "Canberra"],
        correct: 3,
      },
    ];
    
    const quizContainer: any = document.getElementById("quiz");
    const submitButton: any = document.getElementById("submit");
    const resetButton: any = document.getElementById("reset");
    const scoreContainer: any = document.getElementById("score");

    let quizSubmitted = false; //Flag to track if quiz has been submitted/

    function loadQuiz() {
      if(!quizContainer) return;
      quizContainer.innerHTML = ""; // Clear the quiz container
      if (scoreContainer) scoreContainer.textContent = ""; // Clear the score
      quizSubmitted = false; //Reset the submitted flag/
      
      questions.forEach((q, index) => {
        const questionEl = document.createElement("div");
        questionEl.className = "question-block";

        const questionText = document.createElement("p");
        questionText.className = "question";
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionEl.appendChild(questionText);

        q.options.forEach((option, i) => {
          const label = document.createElement("label");
          label.className = "option";

          const input = document.createElement("input");
          input.type = "radio";
          input.name = `question-${index}`;
          input.value = i.toString();

          label.appendChild(input);
          label.appendChild(document.createTextNode(option));
          questionEl.appendChild(label);
        });

        quizContainer.appendChild(questionEl);
      });
    }
    function calculateScore(): number {
      let totalScore = 0;
      questions.forEach((q, index) => {
        const selectedOption: HTMLInputElement | null = document.querySelector(
          `input[name="question-${index}"]:checked`
        );

        if (selectedOption && parseInt(selectedOption.value) === q.correct) {
          totalScore++;
        }
      });
      return totalScore;
    }
   //Disable inputs after clicking Submit/

    function disableInputs() {
      const inputs = quizContainer?.querySelectorAll("input[type='radio']");
      inputs?.forEach((input: HTMLInputElement) => {
         input.disabled = true;
      });
    }

    //Submit button: calculate and display score/

    submitButton.addEventListener("click", () => {
      if (quizSubmitted) return; //Prevent re-submitting the quiz/
      const score = calculateScore();
      quizSubmitted = true; //Marks the quiz as submitted/
      disableInputs(); //Disable all further inputs;
      if (scoreContainer) {
          scoreContainer.textContent = `Your score is ${score} out of ${questions.length}`;
    }
  });
    //Reset button: reload quiz/

    resetButton.addEventListener("click", () => {
      loadQuiz();
    });

    //Load the quiz on page load/

  loadQuiz();
