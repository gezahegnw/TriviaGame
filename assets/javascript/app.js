//trivia game questions arrays
const myQuestionLists = [{
	myTriviaQuestion: "In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies??",
	answerArray: ["William and Elizabeth", "Joseph and Catherine", "John and Mary", "George and Anne"],
	answerIs: 2
},{
	myTriviaQuestion: "Which of the following items was owned by the fewest U.S. homes in 1990?",
	answerArray: ["home computer", "compact disk player", "cordless phone", "dishwasher."],
	answerIs: 1
},{
	myTriviaQuestion: "Who is third behind Hank Aaron and Babe Ruth in major league career home runs?",
	answerArray: ["Reggie Jackson", "Harmon Killebrew", "Willie Mays", "Frank Robinson"],
	answerIs: 2
},{
	myTriviaQuestion: "During the 1980s for six consecutive years what breed of dog was the most popular in the U.S.?",
	answerArray: ["cocker spaniel", "German shepherd", "Labrador retriever", "poodle."],
	answerIs: 0
},{
	myTriviaQuestion: "In 1985, five percent of U.S. households had telephone answering machines. By 1990 what percentage of homes had answering machines?",
	answerArray: ["10 percent", "15 percent", "31 percent", "51 percent"],
	answerIs: 2
},{
	myTriviaQuestion: "The first black American pictured on a U.S. postage stamp was who?",
	answerArray: ["Frederick Douglass", "Booker T. Washington", "Louis Armstrong", "Joe Louis"],
	answerIs: 3
},{
	myTriviaQuestion: "What did the 'D' in 'D-Day' stand for?",
	answerArray: ["doom", "day", "Dwight (Eisenhower)", "Dunkirk"],
	answerIs: 1
},{
	myTriviaQuestion: "The Brownie Box Camera introduced by Eastman Kodak in 1900 had a retail price of what?",
	answerArray: ["$1", "$5", "$10", "$13"],
	answerIs: 0
},{
	myTriviaQuestion: "Which of these characters turned 40 years old in 1990?",
	answerArray: ["Charlie Brown", "Bugs Bunny", "Mickey Mouse", "Fred Flintstone"],
	answerIs: 0
},{
	myTriviaQuestion: "The Philadelphia mint started putting a 'P' mint mark on quarters when?",
	answerArray: ["1960", "1980", "1970", "never"],
	answerIs: 1
},{
	myTriviaQuestion: "Before becoming George Bush's Secretary of Defense, what was Dick Cheney's position?",
	answerArray: ["congressman from Wyoming", "governor of New Hampshire", "secretary of defense under Ronald Reagan", "governor of New Kansas"],
	answerIs: 0
},{
	myTriviaQuestion: " what did the J stand for?",
	answerArray: ["James", "Joseph", "Job", "John"],
	answerIs: 3
},{
	myTriviaQuestion: "What year was it that the Census Bureau first reported that a majority of new mothers  were remaining in the new job market?",
	answerArray: ["1968", "1978", "1988", "1998"],
	answerIs: 2
},{
	myTriviaQuestion: "Florence Nightingale became known as 'the Lady With the Lamp' during which war?",
	answerArray: ["American Civil War", "Crimean War", "World War I", "World War II"],
	answerIs: 1
},{
	myTriviaQuestion: "Who holds the record for the most victories in a row on the professional golf tour?",
	answerArray: ["Jack Nicklaus", "Arnold Palmer", "Byron Nelson", "Ben Hogan"],
	answerIs: 2

}];
//golobal variables
//===========================================================================================================================================================================================================================================
let imageLists = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
let currentQuestionOnScreen; 
let correctAnswer; 
let answeredQuetions; 
let unansweredQuestions; 
let userSelectAnswer;
let incorrectAnswer; 
let time; 
let seconds; 
let displayMessages = {
	correctMsg: "That is correct aswear! Congratulation",
	incorrectMsg: "Sorry! that is not correct answer",
	endTimeMsg: "Sorry you got no more time left! next quetion will display in a second",
	finishedMsg: "Here is your final scores."
}
//functions
//====================================================================================================================================================================================================
//this function initializes the game and event listener
$('#clickHereToStartTheGame').on('click', function(){
	$(this).hide();
	startOverGame();
});
//this function makes the game start over every cicle and event listener
$('#restartTheGame').on('click', function(){
	$(this).hide(); //this hides the restart button when the game start.
	startOverGame();
});
//this function makes the game starts over after ever game and clears out the dom
let startOverGame = function(){
	currentQuestionOnScreen = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unansweredQuestions = 0;
	nextQuestion();
	$('#finalScore').empty();
	$('#correctAns').empty();
	$('#wrongAnswer').empty();
	$('#unanswered-quetions').empty();
}
//this will clear the screen before the next quetion display
let nextQuestion = function(){
	$('#messageDiv').empty();
	$('#correctlyAnswered').empty();
	$('#gif-image').empty();
	answeredQuetions = true;
	
	//this creats new quetions lists and answer list.
	$('#currentQuestion').html('Question #'+(currentQuestionOnScreen+1)+'/' + myQuestionLists.length);
	$('.triviaQuestion').html('<h3>' + myQuestionLists[currentQuestionOnScreen].myTriviaQuestion + '</h3>');
	for(let i = 0; i < 4; i++){
		let userAnswerIs = $('<div>');
		userAnswerIs.text(myQuestionLists[currentQuestionOnScreen].answerArray[i]);
		userAnswerIs.attr({'data-index': i });
		userAnswerIs.addClass('userChoice');
		$('.answerList').append(userAnswerIs);
	}
	gameTimer(); //this call the game timer function
	//clicking an answer will pause the time and setup update Answer Page
	$('.userChoice').on('click',function(){
		userSelectAnswer = $(this).data('index');
		clearInterval(time);
		updateAnsPage();
	});
}

let gameTimer = function(){
	seconds = 15;
    $('#timeRemainig').html('<h3>Time Remaining: ' + seconds + " Seconds" + '</h3>');
	answeredQuetions = true;
	//sets game timer to go down
	time = setInterval(dispalysTimer, 1000);
}

let dispalysTimer =function(){
	seconds--;
	//this dispalys remaining time the user has left
	$('#remainingTime').html('<h3>Time Remaining: ' + seconds + " Seconds" + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answeredQuetions = false;
		updateAnsPage();
	}
}
//this clears and updates the quetions page
let updateAnsPage = function(){
	

	let correctAnswerText = myQuestionLists[currentQuestionOnScreen].answerArray[myQuestionLists[currentQuestionOnScreen].answerIs];
	let correctAnswerIndex = myQuestionLists[currentQuestionOnScreen].answerIs;
	$('#gif-image').html('<img src = "assets/images/'+ imageLists[currentQuestionOnScreen] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered-quetions
	if((userSelectAnswer === correctAnswerIndex) && (answeredQuetions === true)){
		correctAnswer++;
		$('#messageDiv').html(displayMessages.correctMsg);
	} else if((userSelectAnswer !== correctAnswerIndex) && (answeredQuetions === true)){
		incorrectAnswer++;
		$('#messageDiv').html(displayMessages.incorrectMsg);
		$('#correctlyAnswered').html('The correct answer is: ' + correctAnswerText);
	} else{
		unansweredQuestions++;
		$('#messageDiv').html(displayMessages.endTimeMsg);
		$('#correctlyAnswered').html('The correct answer is: ' + correctAnswerText);
		answeredQuetions = true;
	}
	
	if(currentQuestionOnScreen === (myQuestionLists.length-1)){
		setTimeout(finalScorePage, 3000);
	} else{
		currentQuestionOnScreen++;
		setTimeout(nextQuestion, 3000);
	}	
	$('#currentQuestion').empty();
	$('.userChoice').empty(); //Clears myTriviaQuestion page
	$('.triviaQuestion').empty();
}


let finalScorePage = function(){
	$('#messageDiv').empty();  //this clears out the messeges and  the messege element in html.
	$('#remainingTime').empty(); //this clears out the remaning time messeges and  the messege element in html.
	$('#correctlyAnswered').empty(); //this clears out the final score messeges and  the messege element in html.
	$('#gif-image').empty(); //this clears out the images that shows after every quetion time out messeges and  the messege element in html.
	$('#wrongAnswer').empty();
//this dump the final messages in  to  the html
	$('#finalScore').html(displayMessages.finishedMsg);
	$('#correctAns').html("Correct Answers: " + correctAnswer);
	$('#wrongAnswer').html("Wrong Answers: " + incorrectAnswer);
	$('#unanswered-quetions').html("Questions Unanswered: " + unansweredQuestions);
	$('#restartTheGame').addClass('resetGame');//this add the class name restgame
	$('#restartTheGame').show(); //this shows the restart button after the end of game round. this button was hidden when the game start.
	$('#restartTheGame').html('Restart the game?');
}
