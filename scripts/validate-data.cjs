const fs = require('node:fs')
const path = require('node:path')
const { buildCpFallback } = require('./cp-fallback.cjs')

const root = path.resolve(__dirname, '..')
const cpData = JSON.parse(fs.readFileSync(path.join(root, 'src/data/cp-data.json'), 'utf8'))
const cpProblems = JSON.parse(fs.readFileSync(path.join(root, 'src/data/cp-problems.json'), 'utf8'))
const cpFallback = JSON.parse(fs.readFileSync(path.join(root, 'src/data/cp-fallback.json'), 'utf8'))

const platforms = ['tlx', 'codeforces', 'leetcode', 'hackerrank']
const errors = []

const solvedTotal = platforms.reduce((sum, key) => sum + (cpData.platforms?.[key]?.totalSolved || 0), 0)

if (cpData.overview?.totalSolved !== solvedTotal) {
  errors.push(`overview.totalSolved is ${cpData.overview?.totalSolved}, expected ${solvedTotal}`)
}

if (cpProblems.totalProblems !== cpProblems.problems.length) {
  errors.push(`totalProblems is ${cpProblems.totalProblems}, but problems.length is ${cpProblems.problems.length}`)
}

if (JSON.stringify(cpFallback) !== JSON.stringify(buildCpFallback(cpData))) {
  errors.push('cp-fallback.json is stale; run "npm run sync:cp-fallback"')
}

const knownPlatforms = new Set(platforms)
const problemIds = new Set()

for (const problem of cpProblems.problems) {
  if (!knownPlatforms.has(problem.platform)) {
    errors.push(`unknown platform "${problem.platform}" on problem "${problem.title}"`)
  }
  if (problemIds.has(problem.id)) {
    errors.push(`duplicate problem id "${problem.id}"`)
  }
  problemIds.add(problem.id)
}

if (errors.length > 0) {
  console.error('CP data validation failed:')
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log(`CP data OK: ${solvedTotal} solved across ${platforms.length} platforms, ` + `${cpProblems.problems.length} archive problems.`)
