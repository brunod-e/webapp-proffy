const proffys = [
    { name: "Bruno Daniel", 
    avatar: "https://media-exp1.licdn.com/dms/image/C4D03AQG3QNcTnQQL4Q/profile-displayphoto-shrink_200_200/0?e=1602115200&v=beta&t=ntvhZVz_r9MVeuFmsKmEOw4V8CnA1hqkHhQ0xUnkPlo",
    whatsapp: "991189808",
    bio: "Viciado em programação e videogames. Não pode ver um jogo bom que já quer comprar, gamer e programador estressado! TOME CUIDADO! Ensina muito bem matemática.",
    subject: "Matemática",
    cost: "70",
    weekday: [0],
    time_from: [720],
    time_to: [1220]
    },
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

const express = require('express')
const server = express()
const nunjucks = require("nunjucks")

const getSubject = (subjectNumber) => subjects[+subjectNumber - 1]
const pageLanding = (req, res) => res.render("index.html")
const pageStudy = (req, res) => {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}
const pageGiveClasses = (req, res) => {
    const data = req.query
    const isNotEmpty = Object.keys(data).length !== 0
    
    if (isNotEmpty) {
        data.subject = getSubject(data.subject)

        proffys.push(data)

        return res.redirect("/study")
    }

    return res.render("give-classes.html", {subjects, weekdays})
}

nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server
    .use(express.static("public"))
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .listen(5500)