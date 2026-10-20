const fs = require('node:fs')
const path = require('node:path')
const { buildCpFallback } = require('./cp-fallback.cjs')

const root = path.resolve(__dirname, '..')
const cpData = JSON.parse(fs.readFileSync(path.join(root, 'src/data/cp-data.json'), 'utf8'))
const outputPath = path.join(root, 'src/data/cp-fallback.json')

const fallback = buildCpFallback(cpData)

fs.writeFileSync(outputPath, `${JSON.stringify(fallback, null, 2)}\n`)
console.log(`Wrote ${path.relative(root, outputPath)}`)
