const database = require('./database/db')
const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utility/format')

const pageLanding = (req, res) => res.render("index.html")

const pageStudy = async (req,res) => {
    const filters = req.query
    const isEmpty = !filters.subject || !filters.weekday || !filters.time
    
    if (isEmpty) {
        return res.render("study.html", { filters, subjects, weekdays })
    }
    
    const timeToMinutes = convertHoursToMinutes(filters.time)
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    try {
        const db = await database
        const proffys = await db.all(query)

        proffys.map(({ subject }) => subject = getSubject(subject))

        return res.render("./study.html", { proffys, subjects, filters, weekdays })

    } catch (error) {
        console.log(error)
    }
}
const pageGiveClasses = (req, res) => {
    return res.render("give-classes.html", {subjects, weekdays})
}

const saveClasses = async (req,res) => {
    const createProffy = require('./database/createProffy')
    const data = req.body
    
    const proffyValue = {
        name: data.name,
        avatar: data.avatar,
        whatsapp: data.whatsapp,
        bio: data.bio
    }

    const classValue = {
        subject: data.subject,
        cost: data.cost
    }

    const classScheduleValues = data.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: convertHoursToMinutes(data.time_from[index]),
            time_to: convertHoursToMinutes(data.time_to[index])
        }
    })
    
    try {
        const db = await database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })
        
        let queryString = "?subject=" + data.subject
        queryString += "&weekday=" + data.weekday[0]
        queryString += "&time" + data.time_from

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)        
    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}