$(window).load(function(){
	newGame();
});

// OBJECTS //
var questions = [
		{ qnnumber: 1,
		  qntitle: "What was Eypgt's name before Greek conquered it?",
		  
		  choices: ["First Egypt", "Othnu", "Kemet"],
		  correct: "Kemet",
		  
		  answertxt: ["CORRECT!!! Kemet is one of the oldest kingdoms known to man and is the source of knowledge for every other nation after!" ]

		}, { 

			qnnumber: 2,
		  qntitle: "Who made this quote, 'Powerful people cannot afford to educate the people that they oppress, because once you are truly educated, you will not ask for power. You will take it!",
			choices: ["Thomas W. Higginson", "Dr. John Henrik Clarke", "George Washington"],
			correct: "Dr. John Henrik Clarke",
			
			answertxt: "CORRECT!!! Dr. John Henrik Clarke made this powerful quote with others during his life time between January 1, 1915 - July 16, 1998.!"

		}, { 

			qnnumber: 3,
		  qntitle: "What is the scienctific term for the word Aura?",
			
			choices: ["Human Radius", "Microbial Cloud", "Elexstrem"],
			correct: "Microbial Cloud",
			
			answertxt: "CORRECT!!! The Microbial Cloud is a very unique braterial force field that surrounds every person and is to every person like a finger print!"

		},{ 

			qnnumber: 4,
		  qntitle: "What are one of the reasons birds sing before sunrise?",
			
			choices: ["It's beautiful", "Make worms come up", "Open plants spiracles"],
			correct: "Open plants spiracles",
			
			answertxt: "CORRECT!!! The frequency of the birds tone causes the spiracles on the leaves of a plant to open so it can feed!"

		},{ 

			qnnumber: 5,
		  qntitle: "What group of people accurately mapped the universe from our sun to Sirius Star 50,000 years ago?",
			
			choices: ["Greeks", "Dogon Tribe", "Three Wise Men"],
			correct: "Dogon Tribe",
			
			answertxt: "CORRECT!!! The Dogon Tribe wrote and describe the weight, size, color and distance of every planet in our solor system all the way to Sirius B. Sirius B is 8.611 light years away which is 50.62 trillion miles from earth!!! "
		}
	];

// VARIABLES //
var currentQuestion = 0; 
var currentAnswer = 0;
var userAnswer = $('input[type=radio]:checked + label').text();
var currentScore = 0;

// NEW GAME -- show start screen, hide questions and choices //
var newGame = function() {
	console.log('newgame');
	$('.start-screen').show();
	$('.game-screen').hide();
	$('.modalBox').hide();
	$('.end-game-win').hide();
	$('.end-game-lose').hide();
	toggleNext();
};

// START NEW GAME ON CLICK //
$('.new').click(function(){
	resetVal();
	newGame();
})

// MODAL BOX -- show instructions //
	$('.about').click(function() {
		$('.modalBox').fadeIn(500);
	});
// MODAL BOX -- Close instructions
	$('.close-box').on('click', function(){
		$('.modalBox').fadeOut(500);
	});

// RESET VALUES
var resetVal = function() {
	currentQuestion = 0;
	currentAnswer = 0;
	currentScore = 0;
	$('#point-bar').css('width', '0%');
};

// START GAME //
$('.start-game').click(function(){
	$('.start-screen').fadeOut(100);
	$('.game-screen').fadeIn(1000);
	$('.question-container').fadeIn(1000);
	resetVal();
	newQuestion();
});

// MANAGE SUBMIT AND NEXT LINKS //
var toggleNext = function (){
	$('.feedback').hide();
	$('.next-question').hide();
	$('.submit-answer').show();
	$('.finish-quiz').hide();	
};

// GENERATE QUESTIONS //
var newQuestion = function() {
	if(currentQuestion < questions.length) {
		$('.question-number').text(questions[currentQuestion].qntitle);
		$('.mystery-image').attr('src', questions[currentQuestion].image);
		$('#label1').text(questions[currentQuestion].choices[0]);
		$('#label2').text(questions[currentQuestion].choices[1]);
		$('#label3').text(questions[currentQuestion].choices[2]);
		$('.point-count').show();
		toggleNext();
	}
	else {
		displayScore();
	}
};

// SUBMIT ANSWER //
$('.submit-answer').click(function() {
	if($('input[name=choice]').is(':checked')) {
		userAnswer = $('input[type=radio]:checked + label').text();
		if(userAnswer == questions[currentQuestion].correct) {
			currentScore++;
			$('#point-bar').animate({width: "+=20%"});	
		}
		else {
			currentScore+=0;
		}	
		$('.mystery-image').attr('src', questions[currentQuestion].answerimg);
		$('.feedback').show().text(questions[currentQuestion].answertxt);
		$('.submit-answer').hide();
		$('.next-question').show();
	}
	else {
		$('.feedback').show().text('Please choose an answer!');
	}
	return(currentScore);te
});

// MOVE TO NEXT QUESTION //
$('.next-question').click(function(){
	currentQuestion++
	$('input[name=choice]').prop('checked', false);
	newQuestion();
});

// DISPLAY SCORE //
var displayScore = function() {
	if(currentScore == 5){
		$('.question-container').fadeOut(250);
		$('.next-question').hide();
		$('.point-count').fadeOut(250);
		$('.end-game-win').fadeIn(500);
		$('.score').text("You got " + currentScore + " questions right!");
	}
	else {
		$('.question-container').fadeOut(250);
		$('.next-question').hide();
		$('.point-count').fadeOut(250);
		$('.end-game-lose').fadeIn(500);
		$('.score').text("You got " + currentScore + " questions right!");
	}
};

