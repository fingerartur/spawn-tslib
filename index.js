#!/usr/bin/env node

const path = require('path')
const fse = require('fs-extra')
const child = require('child_process')
const chalk = require('chalk')

const templateDir = path.resolve(__dirname, 'template')
const targetDir = process.cwd()

/**
 * @returns true if directory is empty, or if it has a single .git folder inside and otherwise it is empty
 */
const isEmptyDir = (dir) => {
  const files = fse.readdirSync(dir)

  if (files.length === 0) {
    return true
  }

  if (files.length === 1) {
    return files[0] === '.git'
  }

  return false
}

if (!isEmptyDir(targetDir)) {
  console.error(chalk.red(`Target directory ${targetDir} is not empty. Make sure it is empty or contains only .gitignore file.`))
  process.exit(1)
}

console.info('Spawning a TS library')
console.info(chalk.yellow(` - Setting up files and configs [1/2]...`))

// console.info(`Debug: Copying files ${templateDir} -> ${targetDir}`)

try {
  fse.copySync(templateDir, targetDir, { recursive: true })
} catch (error) {
  console.error(chalk.red(`\nFailed to copy config files to ${targetDir}`), error)
  process.exit(1)
}

console.info(chalk.yellow(` - Installing dependencies [2/2]...\n`))

try {
  child.execSync('npm i', { stdio: 'inherit' })
} catch (error) {
  console.error(chalk.red(`\nFailed to install dependencies via "npm i"`))
  process.exit(1)
}

console.log(chalk.green('\nSuccess!'))
process.exit(0)
