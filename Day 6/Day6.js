const fs = require("fs")

console.log("==== DAY 6 ====")

// PART ONE
// ============================================================================================
let start = Date.now();
fs.readFile("./input.txt", 'utf8', (err, data) => {
    if (err) throw err
    let entries = convertDataPartOne(data)


    let answerSets = []
    entries.forEach(e => {
        let seperateAnswers = e.split("")
        let entrySet = new Set(seperateAnswers)
        answerSets.push(Array.from(entrySet))
    })

    let totalYes = answerSets.reduce((acum, curr) => acum + curr.length, 0)

    console.log(totalYes)

    console.log(`This took ${Date.now() - start}ms`)


})



// PART TWO
// ============================================================================================
start = Date.now();
fs.readFile("./input.txt", 'utf8', (err, data) => {
    if (err) throw err
    let entries = convertDataPartTwo(data)

    let totalCount =0
    entries.forEach(e => {
        answers = e.split(";").filter(a => a !== "")

        entryAnswers = answers.map(a => a.split(""))

        allAnswers = []
        entryAnswers.forEach(ea => {
            allAnswers.push(ea)
        })

        allAnswers = allAnswers.flat()

        let amountAnswered = {}

        allAnswers.forEach(a => {
            if (!amountAnswered[a])
                amountAnswered[a] = 1
            else
                amountAnswered[a] = amountAnswered[a] + 1
        })


        let countAllAnswered = 0
        Object.keys(amountAnswered).forEach(key => {
            if (amountAnswered[key] == entryAnswers.length)
                countAllAnswered++
        })
        
        totalCount += countAllAnswered 


    })
    
    console.log(totalCount)

    console.log(`This took ${Date.now() - start}ms`)
})



function convertDataPartOne(data) {
    let entries = []
    let lines = data.split("\n")
    let tempEntry = ""
    // go trough each line, add lines to entry until empty line, 
    // empty line means new entry
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim()
        if (line === "") {
            entries.push(tempEntry.trim())
            tempEntry = ""
        } else {
            tempEntry += line;
        }
    }
    return entries
}

function convertDataPartTwo(data) {
    let entries = []
    let lines = data.split("\n")
    let tempEntry = ""
    // go trough each line, add lines to entry until empty line, 
    // empty line means new entry
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim()
        if (line === "") {
            entries.push(tempEntry.trim())
            tempEntry = ""
        } else {
            tempEntry += line + ";";
        }
    }
    return entries
}
