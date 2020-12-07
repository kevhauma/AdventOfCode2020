const fs = require("fs")
console.log("==== DAY 2 ====")
// PART ONE
// ============================================================================================
let start = Date.now();
fs.readFile("./input.txt", 'utf8', (err, data) => {
    if (err) throw err

    let entries = convertData(data)

    let results = 0

    entries.forEach(e => {
        let lettercount = e.password.split("")
            .reduce((count, letter) => letter == e.rule.letter ? ++count : count, 0)

        if (lettercount >= e.rule.min && lettercount <= e.rule.max)
            results++
    })

    console.log(results)
    console.log(`This took ${Date.now() - start}ms`)


})

function convertData(data) {
    return data
        .split("\n")
        .map(e => {
            let [rule, password] = e.split(":").map(e => e.trim())
            return {
                rule: ruleToObject(rule),
                password
            }
        })
    
}

function ruleToObject(rule) {
    let [min, max, letter] = rule.replace("-", " ").split(" ")
    return {
        string: rule,
        min: parseInt(min),
        max: parseInt(max),
        letter,
    }
}

// PART TWO
// ============================================================================================
start = Date.now();
fs.readFile("./input.txt", 'utf8', (err, data) => {
    if (err) throw err

    let entries = convertData(data)

    let results = 0

    entries.forEach(e => {
        let matches = false;
        if (e.password.charAt(e.rule.min - 1) == e.rule.letter)
            matches = !matches
        if (e.password.charAt(e.rule.max - 1) == e.rule.letter) {
            matches = !matches
        }
        if (matches) results++

    })

    console.log(results)
    console.log(`This took ${Date.now() - start}ms`)



})
