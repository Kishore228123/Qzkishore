const quizData = [
    {
      question: 'Q1 - which among the following is not a computer language?',
      options: ['ALGOL', 'COBOL','PASCAL','DRAM'],
      answer: 'DRAM',
    },
    {
      question: 'Q2 - Who among the following has developed the Perl programming language?',
      options: ['Larry Wall', 'Gudio van rossum', 'Joe Armstrong', 'Yukihiro Matsumoto'],
      answer: 'Larry Wall',
    },
    {
      question: 'Q3 - Who among the following has designed the PHP programming language?',
      options: ['Rasmus Lerdorf', 'Gudio van Rossum', 'Brendan Eich', 'James Gosling'],
      answer: 'Rasmus Lerdorf',
    },
    {
      question: 'who among the following first invented the compter mouse?',
      options: ['Douglas C.Engelbart', 'Adam Osborne', 'Adi Shamir', 'Alain Glavieux'],
      answer: 'Douglas C.Engelbart',
    },
    {
      question: 'who among the following is the popular as "Mother of Internet"?',
      options: [
        'Radia Perlman',
        'Ada Lovelace',
        'Grace Hopper',
        'Anita Borg',
      ],
      answer: 'Radia Perlman',
    },
    {
      question: 'which one of the following is developed by Microsoft?',
      options: ['Java', 'Dcl', 'C sharp', 'Shell'],
      answer: 'C sharp',
    },
    {
      question: 'the .com used frquently in website url can be expressed as...?',
      options: [
        'Corporation',
        'Commercial',
        'Cooperative',
        'Cordial',
      ],
      answer: 'Commercial',
    },
    {
      question: 'Computer Hard Disk was first indroduced in 1956 by?',
      options: ['Dell', 'Apple', 'Microsoft', 'IBM'],
      answer: 'IBM',
    },
    {
      question: 'which protocol is used to recieve e-mail?',
      options: [
        'SMTP',
        'POP3',
        'HTTP',
        'FTP',
      ],
      answer: 'POP3',
    },
    {
      question: 'which protocol is used to send e-mail?',
      options: ['SMTP', 'FTP', 'POP3', 'HTTP'],
      answer: 'SMTP',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();