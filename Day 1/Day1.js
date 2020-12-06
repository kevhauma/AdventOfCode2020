const fs = require("fs")



// PART ONE
// ============================================================================================
let start = Date.now();
fs.readFile("./input.txt", 'utf8', (err, data) => {
    if (err) throw err
    let numbers = data.split("\n").map(n => parseInt(n))


    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = i + 1; j < numbers.length - 1; j++) {
            if (numbers[i] + numbers[j] == 2020) {
                console.log(`${numbers[i]} + ${numbers[j]} = ${numbers[j] + numbers[i]}`)
                console.log(`${numbers[i]} * ${numbers[j]} = ${numbers[j] * numbers[i]}`)
                console.log(`This took ${Date.now() - start}ms`)
                return
            }

        }
    }
})


// PART TWO
// ============================================================================================
start = Date.now();
fs.readFile("./input.txt", 'utf8', (err, data) => {
    if (err) throw err
    let numbers = data.split("\n").map(n => parseInt(n))


    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = i + 1; j < numbers.length - 1; j++) {
            for (let k = 0; k < numbers.length - 1; k++) {
                if (numbers[i] + numbers[j] + numbers[k] == 2020) {
                    console.log(`${numbers[i]} + ${numbers[j]} + ${numbers[k]} = ${numbers[j] + numbers[i] + numbers[k]}`)
                    console.log(`${numbers[i]} * ${numbers[j]}* ${numbers[k]} = ${numbers[j] * numbers[i] * numbers[k]}`)
                    console.log(`This took ${Date.now() - start}ms`)
                    return
                }

            }
        }
    }
})
