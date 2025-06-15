#!/usr/bin/env node
import * as fs from "fs/promises"
import {MarkovModel, PosTaggedState, tokenizeWithPosTags} from "markdownov"

const train = (model) => async (path) => {
    const text = await fs.readFile(path, "utf-8")
    model.train(tokenizeWithPosTags(text))
}

async function main() {
    const trainingDataPaths = process.argv.slice(2)
    const model = new MarkovModel(Math.random, () => new PosTaggedState())
    await Promise.all(trainingDataPaths.map(train(model)))
    console.log(model.generate())
}

main()
