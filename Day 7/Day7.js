const fs = require("fs")

console.log("==== DAY 7 ====")

let bagRules
// PART ONE
// ============================================================================================
let start = Date.now();
fs.readFile("./input.txt", 'utf8', (err, data) => {
    if (err) throw err

    bagRules = convertData(data)


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

    let result = recursiveBagFinding(shinyBag)

    console.log(result)


    console.log(`This took ${Date.now() - start}ms`)

}


function recursiveBagFinding(bag) {
    if(!bag) return 0
    let contentCount = 0;
    
    for(let i=0;i<bag.content.length;i++){  
        let content = bag.content[i]     
            let contentBag = findBag(content.mutation, content.color)

        
            let bagContentCount = recursiveBagFinding(contentBag)
        
            console.log(`${content.mutation} ${content.color}: ${contentCount} += ${content.quantity} * ${bagContentCount}`)    
        
            contentCount += content.quantity * bagContentCount      
        
        
    }
    return contentCount

}


function findBag(mutation, color) {
    return bagRules.find(rule => rule.container.mutation === mutation && rule.container.color === color)
}


function findContent(mutation, color) {
    return bagRules.filter(rule => {
        let canHold = false
        rule.content.forEach(c => {
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

            container = {
                mutation,
                color
            }

            content = content.split(",").map(c => {
                let [quantity, mutation, color] = c.trim().split(" ")
                if (quantity === "no") {
                    quantity = 1
                    mutation = null
                    color = null
                }
                return {
                    quantity: parseInt(quantity),
                    mutation,
                    color
                }
            })

            return {
                container: container,
                content
            }
        })
}
