let questionsMade = [];

// questions of the game

const questions = [
	{
		question: 'Qual desses é um macronutiente?',
		options: [
			'Carboidratos e água',
			'Gorduras',
			'Proteinas, alcool',
			'Todos são macronutientes',
		],
		right: 'answer3',
	},
	{
		question: 'Qual desses macronutientes você deve comer mais para saúde?',
		options: ['Carboidratos', 'Gorduras', 'Proteinas', 'alcool'],
		right: 'answer0',
	},
	{
		question: 'Qual o imc ideal?',
		options: ['18.5 - 24.9', '24.9 - 29.9', '29.9 - 34.9', '15.9 - 19.9'],
		right: 'answer0',
	},
	{
		question: 'Qual o principal macronutriente das frutas?',
		options: ['Carboidrato e água', 'Gordura', 'Proteina', 'alcool'],
		right: 'answer0',
	},
	{
		question: 'O que importa mais para saúde?',
		options: [
			'Praticar exercício físico',
			'Comer vegetais, frutas e legumes',
			'Não fumar',
			'Não beber álcool',
		],
		right: 'answer1',
	},
	{
		question: 'O que é uma alimentação balanceada?',
		options: [
			'Comer vegetais, legumes e frutas',
			'Comer carne, peixe e ovos',
			'Comer todos os macronutientes',
			'Nenhuma das alternativas',
		],
		right: 'answer0',
	},
	{
		question: 'Qual desses é a principal causa da diabetes?',
		options: [
			'Genética',
			'Metabolismo',
			'Idade',
			'Nenhuma das alternativas',
		],
		right: 'answer3',
	},
];

const totalQuestions = questions.length - 1;

getQuestions(totalQuestions);

function getQuestions(maxQuestions) {
	const random = Math.floor(Math.random() * maxQuestions);
	if (!questionsMade.includes(random)) {
		questionsMade.push(random);
		let questionSelected = questions[random];

		$('#question').html(questionSelected.question);
		$('#question').attr('data-index', random);

		let parent = $('#answers');
		let buttons = parent.children();

		for (let i = 1; i < buttons.length; i++) {
			parent.append(buttons.eq(Math.floor(Math.random() * i)));
		}

		for (let i = 0; i < totalQuestions; i++) {
			$('#answer' + i).html(questionSelected.options[i]);
		}
	} else {
		if (questionsMade.length < totalQuestions) {
			return getQuestions(totalQuestions);
		} else {
			$('.header').addClass('hidden');
			$('.main').addClass('hidden');
			$('#status').removeClass('hidden');
			$('#message').html(
				'Você é melhor do que a maioria dos médicos!!!!',
			);
		}
	}
}

$('.answer').click(function () {
	if ($('.main').attr('data-status') !== 'over') {
		resetButtons();
		$(this).addClass('active');
	}
});

$('#confirm').click(function () {
	let index = $('#question').attr('data-index');
	let rightAnswer = questions[index].right;

	$('.answer').each(function () {
		if ($(this).hasClass('active')) {
			let answer = $(this).attr('id');
			if (answer === rightAnswer) {
				console.log('Você acertou!');
				nextQuestion();
			} else {
				console.log('Você errou!');
				$('#' + rightAnswer).addClass('right');
				$('#' + answer).removeClass('active');
				$('#' + answer).addClass('wrong');
				$('#confirm').addClass('hidden');
				$('.main').attr('data-status');

				setTimeout(function () {
					gameOver();
				}, 2000);
			}
		}
	});
});

function newGame() {
	questionsMade = [];
	$('#status').addClass('hidden');
	$('.main').removeClass('hidden');
	$('.header').removeClass('hidden');
	$('#confirm').removeClass('hidden');
	resetButtons();
	getQuestions(totalQuestions);
}

function nextQuestion() {
	resetButtons();
	getQuestions(totalQuestions);
}

function resetButtons() {
	$('.answer').each(function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		}
		if ($(this).hasClass('right')) {
			$(this).removeClass('right');
		}
		if ($(this).hasClass('wrong')) {
			$(this).removeClass('wrong');
		}
	});
}

function gameOver() {
	$('#status').removeClass('hidden');
	$('.main').addClass('hidden');
	$('.header').addClass('hidden');
	$('#message').html('Game over!');
	let score = questionsMade.length - 1;
	$('#score').html(score);
}

$('#newGame').click(function () {
	newGame();
});
