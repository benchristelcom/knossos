#!/usr/bin/env node
import * as fs from "fs/promises"
import {MarkovModel, PosTaggedState, tokenizeWithPosTags, seedRandom} from "markdownov"

const train = (model) => async (path) => {
    const text = await fs.readFile(path, "utf-8")
    model.train(tokenizeWithPosTags(text))
}

function zeropad(length, num) {
    const s = String(num)
    if (s.length < length) {
        return zeropad(length, "0" + s)
    } else {
        return s
    }
}

async function main() {
    const trainingDataPaths = process.argv.slice(2)
    const model = new MarkovModel(Math.random, () => new PosTaggedState())
    for (const path of trainingDataPaths) {
        await train(model)(path)
    }

    const writePromises = []
    for (let i = 0; i < 256; i++) {
        const id = zeropad(3, i)
        const path = `src/${id}.md`
        const text = `# The Product Is The Process \#${id}\n\n` + model.generate()
        writePromises.push(fs.writeFile(path, text, "utf-8"))
    }
    await Promise.all(writePromises)
}

main()
