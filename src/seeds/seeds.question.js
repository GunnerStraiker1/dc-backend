"use strict";

const Question = require('../database/models/models.question')
const { answerType } = require("../helpers/enums");
const mongoose = require('mongoose')

const mockQuestions = [
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q1",
        textQuestion: "¿Cuánto es 1 + 1?",
        score: 5,
        answerType:  answerType.OneAnswer,
        correctAnswers:["2"],
        wrongAnswers:["1", "3", "4", "5"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q2",
        textQuestion: "¿Berlin es la capital de Alemania?",
        score: 5,
        answerType:  answerType.Bool,
        correctAnswers:["Cierto"],
        wrongAnswers:["Falso"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q3",
        textQuestion: "¿Cuáles son los tipos de Estadística?",
        score: 5,
        answerType:  answerType.MoreOneAnswer,
        correctAnswers:["Descriptiva", "Inductiva"],
        wrongAnswers:["Analítica", "Conjuntiva", "Asociativa"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q4",
        textQuestion: "Es un conjunto de datos de una poblacion",
        score: 5,
        answerType:  answerType.OneAnswer,
        correctAnswers:["Muestra"],
        wrongAnswers:["Variante", "Captura", "Porcion", "Toma"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q5",
        textQuestion: "¿Cuáles son los tipos de gráficas?",
        score: 5,
        answerType:  answerType.AllAnswers,
        correctAnswers:["Barras", "Linea", "Pastel"],
        wrongAnswers:["Malvaviscos", "Tuercas"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q6",
        textQuestion: "¿2/4 de la Tierra es agua?",
        score: 5,
        answerType:  answerType.Bool,
        correctAnswers:["Falso"],
        wrongAnswers:["Cierto"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q7",
        textQuestion: "¿Cuales son cuadrilateros?",
        score: 5,
        answerType:  answerType.AllAnswers,
        correctAnswers:["Trapecios", "Rombo", "Rectángulo"],
        wrongAnswers:["Circulo", "Triangulo"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q8",
        textQuestion: "2 Partes de un paralelepipedo",
        score: 5,
        answerType:  answerType.MoreOneAnswer,
        correctAnswers:["Base", "Cara Lateral", "Vértice", "Arista"],
        wrongAnswers:["Foco"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q9",
        textQuestion: "2 poliedros Regulares",
        score: 5,
        answerType:  answerType.MoreOneAnswer,
        correctAnswers:["Tetraedro", "Dodecaedro", "Icosaedro"],
        wrongAnswers:["Octicaedro", "Dodocaedro"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q10",
        textQuestion: "¿Sen 60°?",
        score: 5,
        answerType:  answerType.OneAnswer,
        correctAnswers:["[(3)^(1/2)]/2"],
        wrongAnswers:["1", "-1", "0", "[(2)^(1/2)]/2"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q11",
        textQuestion: "¿Tipos de Eventos en Estadística?",
        score: 5,
        answerType:  answerType.AllAnswers,
        correctAnswers:["Deterministicos", "Estocasticos"],
        wrongAnswers:["Indeterministicos", "Cuasiprobables", "Improbable"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q12",
        textQuestion: "¿0.33 = 1/3?",
        score: 5,
        answerType:  answerType.OneAnswer,
        correctAnswers:["Cierto"],
        wrongAnswers:["Falso"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q13",
        textQuestion: "Es ángulo suplementario",
        score: 5,
        answerType:  answerType.MoreOneAnswer,
        correctAnswers:["30° y 150°", "100° y 80"],
        wrongAnswers:["55° y 35°", "20° y 70°", "120° y 30°"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q14",
        textQuestion: "¿0.5 = 1/2?",
        score: 5,
        answerType:  answerType.OneAnswer,
        correctAnswers:["Cierto"],
        wrongAnswers:["Falso"]
    }),
    new Question({
        _id: mongoose.Types.ObjectId(),
        questionId: "Q15",
        textQuestion: "Todas las partes de un poliedro",
        score: 5,
        answerType:  answerType.AllAnswers,
        correctAnswers:["Caras", "Aristas", "Vertices"],
        wrongAnswers:["Foco", "Radio"]
    }),
];

module.exports={
    mockQuestions,
    async seed() {
		console.log(">Seeding Questions");

		await Promise.all(mockQuestions.map((x) => x.save())).catch((err) => {
			return Promise.reject("Error while seeding Questions: " + err);
		});

		console.log(">...Questions done");
	},
}