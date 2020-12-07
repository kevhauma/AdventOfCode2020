const fs = require("fs")

console.log("==== DAY 7 ====")

let bags
// PART ONE
// ============================================================================================
let start = Date.now();
fs.readFile("./input.txt", 'utf8', (err, data) => {
    if (err) throw err

    bags = convertData(data)


    let shinyHoldingBags = findContent("shiny", "gold")

    let allShinyHoldingBags = [...shinyHoldingBags]
    let oldSize = -1
    let newSize = -2
    do {
        oldSize = allShinyHoldingBags.length

        let moreShinyHoldingBags = [] //find the next layer of bags,
        allShinyHoldingBags.forEach(bag => {
            let moreBags = findContent(bag.container.mutation, bag.container.color)
            moreShinyHoldingBags = [...moreShinyHoldingBags, ...moreBags]
        })

        //remove duplicates (there shouldn't be any dupes if I was any good from the first place)
        allShinyHoldingBags = Array.from(new Set([...allShinyHoldingBags, ...moreShinyHoldingBags]))

        newSize = allShinyHoldingBags.length

        //if no more new bags are found, head out
    } while (oldSize != newSize)




    console.log(allShinyHoldingBags.length)




    console.log(`This took ${Date.now() - start}ms`)

    partTwo()


})



// PART TWO
// ============================================================================================

function partTwo() {
    start = Date.now();
    let shinyBag = findBag("shiny", "gold")

    console.log(shinyBag)
    let result = recursiveBagFinding(1, shinyBag)

    console.log(result)


    console.log(`This took ${Date.now() - start}ms`)

}


function recursiveBagFinding(quantity, bag) {

    if (bag.content.length == 0) return quantity

    let contentCount = 0;

    //for for every bag in this bag, get the countCount
    for (let i = 0; i < bag.content.length; i++) {
        let content = bag.content[i]

        //find bag in rule list, 
        let contentBag = findBag(content.mutation, content.color)

        //add the count of this bag's content to the big counter 
        contentCount += recursiveBagFinding(content.quantity, contentBag)
    }
    //multiply the result with the amount of bags required
    return contentCount * quantity

}


function findBag(mutation, color) {
    return bags.find(bag => bag.container.mutation === mutation && bag.container.color === color)
}


function findContent(mutation, color) {
    return bags.filter(bag => {
        let canHold = false
        bag.content.forEach(c => {
            if (c.mutation === mutation && c.color === color)
                canHold = true
        })
        return canHold
    })
}

function convertData(data) {
    let entries = data.split("\n")

    return entries.filter(e => e !== "")
        .map(e => {
            let [container, content] = e.replace(/bags|\./g, "").split("contain")
            let [mutation, color] = container.trim().split(" ")

            container = {mutation,color}

            content = content.split(",")
                .map(c => {
                    let [quantity, mutation, color] = c.trim().split(" ")
                    if (quantity !== "no") {
                        return {
                            quantity: parseInt(quantity),
                            mutation,
                            color
                        }
                    } else null

                }).filter(c => c !== undefined)

            return {
                container: container,
                content
            }
        })
}
