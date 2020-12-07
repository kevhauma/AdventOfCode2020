const fs = require("fs")
console.log("==== DAY 5 ====")

const lookupDirections = {
    B: true,
    F: false,
    R: true,
    L: false
}

let allIDs = []
let highestID = 0

// PART ONE
// ============================================================================================
let start = Date.now();
fs.readFile("./input.txt", 'utf8', (err, data) => {
    if (err) throw err

    let entries = data.split("\n").filter(e => e !== "")



    entries.forEach(e => {
        let sequence = e.split("")
        let rowSequence = sequence.splice(0, 7)
        let columnSequence = sequence

        let rowNumber = binarySearch(rowSequence, 0, 127)
        let columnNumber = binarySearch(columnSequence, 0, 7)

        let ID = rowNumber * 8 + columnNumber

        allIDs.push(ID)

    })

    highestID = Math.max(...allIDs)
    console.log(highestID)

    console.log(`This took ${Date.now() - start}ms`)

    start = Date.now();
    console.log(partTwo())

    console.log(`This took ${Date.now() - start}ms`)
})



// PART TWO
// ============================================================================================
function partTwo() {
    for (let id = 0; id < highestID; id++) {
        let left = allIDs.find(i => i == id + 1)
        let right = allIDs.find(i => i == id - 1)
        let center = allIDs.find(i => i == id)

        if (left != null && right != null && center == null)
            return id
    }
}

function binarySearch(sequence, start, end) {

    if (sequence.length == 0) return start
    let direction = sequence.shift()

    if (lookupDirections[direction]) {
        //upper half
        return binarySearch(sequence, Math.round((end - start) / 2 + start), end)
    } else {
        return binarySearch(sequence, start, Math.floor((end - start) / 2 + start))
    }
}
