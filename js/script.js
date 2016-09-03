$(window).load(function(){
	newGame();
});

// OBJECTS //
var questions = [
		{ qnnumber: 1,
		  qntitle: "",
		  image: "",
		  choices: [""],
		  correct: "",
		  answerimg: "",
		  answertxt: ""

		}, { 

			qnnumber: 2,
		  qntitle: "Question 2",
			image: "img/Q2_Pokemon.png",
			choices: ["Gengar", "Clefairy", "Sableye"],
			correct: "Gengar",
			answerimg: "img/Q2_Pokemon_Answer.png",
			answertxt: "It's Gengar!"

		}, { 

			qnnumber: 3,
		  qntitle: "Question 3",
			image: "img/Q3_Pokemon.png",
			choices: ["Arcanine", "Luxray", "Raikou"],
			correct: "Luxray",
			answerimg: "img/Q3_Pokemon_Answer.png",
			answertxt: "It's Luxray!"

		},{ 

			qnnumber: 4,
		  qntitle: "Question 4",
			image: "img/Q4_Pokemon.png",
			choices: ["Honedge", "Aegislash", "Doublade"],
			correct: "Doublade",
			answerimg: "img/Q4_Pokemon_Answer.png",
			answertxt: "It's Doublade!"

		},{ 

			qnnumber: 5,
		  qntitle: "Question 5",
			image: "img/Q5_Pokemon.png",
			choices: ["Jigglypuff", "Aromatisse", "Swirlix"],
			correct: "Swirlix",
			answerimg: "img/Q5_Pokemon_Answer.png",
			answertxt: "It's Swirlix!"
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

