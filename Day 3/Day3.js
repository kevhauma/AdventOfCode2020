const fs = require("fs")

// PART ONE
// ============================================================================================
let start = Date.now();
fs.readFile("./input.txt", 'utf8', (err, data) => {
    if (err) throw err



    let map = convertData(data)

    const slope = {x: 3,y: 1}
    let toboggan = {x: 0,y: 0}


    let amountOfTrees = 0

    while (toboggan.y < map.height) {

        let nextcoord = coordsAdd(map, toboggan, slope)

        let tree = findTree(map.trees, nextcoord)

        if (tree.length)
            amountOfTrees++

        toboggan = nextcoord

    }

    console.log(amountOfTrees)

    console.log(`This took ${Date.now() - start}ms`)

})


// PART TWO
// ============================================================================================
start = Date.now();
fs.readFile("./input.txt", 'utf8', (err, data) => {
    if (err) throw err


    let map = convertData(data)

    const slopes = [{x:3,y:1},{x:1,y:1},{x:5,y:1},{x:7,y:1},{x:1,y:2}]

    let treesEncountered=[]

    slopes.forEach(slope => {
        let toboggan = {x: 0,y: 0}

        let amountOfTrees = 0

        while (toboggan.y < map.height) {

            let nextcoord = coordsAdd(map, toboggan, slope)

            let tree = findTree(map.trees, nextcoord)

            if (tree.length)
                amountOfTrees++

            toboggan = nextcoord

        }        
        treesEncountered.push(amountOfTrees)
    })

    let result = treesEncountered.reduce((mult,curr)=>mult*curr,1)
    console.log(treesEncountered)
    console.log(result)
    console.log(`This took ${Date.now() - start}ms`)
})



function convertData(data) {
    let lines = data.split("\n")
    let height = lines.length
    let width = lines[0].split("").length


    let trees = []

    lines.forEach((line, y) => {
        let cells = line.split("")
        cells.forEach((cell, x) => {
            if (cell === "#")
                trees.push({x,y})
        })
    })


    return {width,height,trees}

}

function coordsAdd(map, coord1, coord2) {
    let x = coord1.x + coord2.x
    let y = coord1.y + coord2.y
    if (x >= map.width)
        x -= map.width
    return {x,y}
}

function findTree(trees, coord) {
    return trees.filter(tree => tree.x == coord.x && tree.y == coord.y)
}
