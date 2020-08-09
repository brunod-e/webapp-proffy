const database = require('./db')
const createProffy = require('./createProffy')

database.then(async db => {
    proffyValue = { 
        name: "Bruno Daniel", 
        avatar: "https://media-exp1.licdn.com/dms/image/C4D03AQG3QNcTnQQL4Q/profile-displayphoto-shrink_200_200/0?e=1602115200&v=beta&t=ntvhZVz_r9MVeuFmsKmEOw4V8CnA1hqkHhQ0xUnkPlo",
        whatsapp: "991189808",
        bio: "Viciado em programação e videogames. Não pode ver um jogo bom que já quer comprar, gamer e programador estressado! TOME CUIDADO! Ensina muito bem matemática.",
    }

    classValue = {
        subject: 1,
        cost: "70",
        
    }

    classScheduleValues = [
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // await createProffy(db, { proffyValue, classValue, classScheduleValues })

    const getProffys = await db.all("SELECT * FROM proffys")
    const getClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    const getClassesSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520
    `)

    console.log(getClassesSchedule)
})

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
