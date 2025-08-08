document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "How do you usually commute?",
            answers: [
                { text: "Walk / Bicycle", points: 5 },
                { text: "Public transport", points: 4 },
                { text: "Carpool", points: 3 },
                { text: "Motorbike/Scooter", points: 2 },
                { text: "Personal car (fuel)", points: 1 }
            ]
        },
        {
            question: "How often do you recycle household waste?",
            answers: [
                { text: "Always", points: 5 },
                { text: "Often", points: 4 },
                { text: "Sometimes", points: 2 },
                { text: "Never", points: 0 }
            ]
        },
        {
            question: "How frequently do you buy new clothes?",
            answers: [
                { text: "Rarely (buy second-hand / sustainable brands)", points: 5 },
                { text: "Every few months", points: 3 },
                { text: "Monthly or more", points: 1 }
            ]
        },
        {
            question: "How much meat do you consume?",
            answers: [
                { text: "Vegetarian/Vegan", points: 5 },
                { text: "Rarely", points: 4 },
                { text: "Occasionally", points: 3 },
                { text: "Daily", points: 1 }
            ]
        },
        {
            question: "Do you conserve water at home?",
            answers: [
                { text: "Always (short showers, fix leaks)", points: 5 },
                { text: "Sometimes", points: 3 },
                { text: "Rarely", points: 1 }
            ]
        },
        {
            question: "How do you manage electronic waste?",
            answers: [
                { text: "Recycle/Donate", points: 5 },
                { text: "Store for later recycling", points: 3 },
                { text: "Throw in regular trash", points: 0 }
            ]
        },
        {
            question: "Do you actively plant trees or participate in green drives?",
            answers: [
                { text: "Yes, regularly", points: 5 },
                { text: "Occasionally", points: 3 },
                { text: "Never", points: 0 }
            ]
        }
    ];

    const resultData = {
        ecoHero: {
            title: "1st - 🌿 Eco Hero",
            message: "Outstanding! You’re a true environmental leader — keep inspiring others.",
            tips: [
                "Share your practices on social media to influence your network.",
                "Mentor others in eco-friendly habits.",
                "Join or start a local environmental community project."
            ],
            className: 'eco-hero'
        },
        ecoAware: {
            title: "2nd - 🌱 Eco Aware",
            message: "Great job! You’re on the right track — small tweaks can make a big impact.",
            tips: [
                "Switch to 100% renewable energy sources if possible.",
                "Choose locally grown and seasonal produce to cut transport emissions.",
                "Commit to a “buy nothing new” challenge for a month."
            ],
            className: 'eco-aware'
        },
        ecoLearner: {
            title: "3rd - 🍂 Eco Learner",
            message: "You care, but there’s room to grow — your small daily actions can create big change.",
            tips: [
                "Start recycling and composting at home.",
                "Use public transport or carpool instead of solo driving.",
                "Fix water leaks and limit shower time."
            ],
            className: 'eco-learner'
        },
        ecoRisk: {
            title: "4th - 🔥 Eco Risk Zone",
            message: "Your lifestyle is having a heavy impact — urgent action needed!",
            tips: [
                "Begin with one habit: recycle all plastic and paper waste.",
                "Replace short car trips with walking or biking.",
                "Reduce single-use plastics starting today."
            ],
            className: 'eco-risk'
        }
    };

    const startScreen = document.getElementById('start-screen');
    const startBtn = document.getElementById('start-quiz-btn');
    const quizHeader = document.getElementById('quiz-header');
    const questionArea = document.getElementById('question-area');
    const resultsContainer = document.getElementById('results-container');
    const progressBar = document.getElementById('progress-bar');
    // REMOVED: const missionSection = document.getElementById('mission-section-quiz');
    
    let currentQuestionIndex = 0;
    let totalScore = 0;

    startBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        startScreen.classList.add('hidden');
        quizHeader.style.display = 'block';
        questionArea.style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        const questionData = quizData[currentQuestionIndex];
        questionArea.innerHTML = `
            <h2 class="question-text">${questionData.question}</h2>
            <div class="answer-options">
                ${questionData.answers.map(answer => `
                    <button class="answer-btn" data-points="${answer.points}">${answer.text}</button>
                `).join('')}
            </div>
        `;
        document.querySelectorAll('.answer-btn').forEach(button => {
            button.addEventListener('click', selectAnswer);
        });
        updateProgressBar();
    }

    function selectAnswer(e) {
        totalScore += parseInt(e.target.dataset.points);
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function updateProgressBar() {
        const progressPercent = (currentQuestionIndex / quizData.length) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }

    function showResults() {
        // Final progress bar update
        progressBar.style.width = '100%';

        let result;
        if (totalScore >= 28) {
            result = resultData.ecoHero;
        } else if (totalScore >= 20) {
            result = resultData.ecoAware;
        } else if (totalScore >= 12) {
            result = resultData.ecoLearner;
        } else {
            result = resultData.ecoRisk;
        }

        document.getElementById('quiz-container').classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        resultsContainer.classList.add(result.className);
        resultsContainer.innerHTML = `
            <h2 class="result-title">${result.title}</h2>
            <p class="result-message">${result.message}</p>
            <div class="result-tips">
                <h3>Your Next Steps:</h3>
                <ul>
                    ${result.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        `;
        
        // REMOVED: missionSection.classList.remove('hidden');
    }
});