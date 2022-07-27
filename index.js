#!/usr/bin/env node

const path = require('path')
const fse = require('fs-extra')
const child = require('child_process')
const chalk = require('chalk')
const inquirer = require('inquirer')

const templateDir = path.resolve(__dirname, 'template')
const targetDir = process.cwd()

/**
 * @returns true if directory is empty
 */
const isEmptyDir = (dir) => {
  const files = fse.readdirSync(dir)
  return files.length === 0
}

const askQuestions = () => {
  const questions = [
    {
      name: "NAME",
      type: "input",
      message: "Name of the package"
    },
    {
      name: "DESCRIPTION",
      type: "input",
      message: "Description of the package"
    },
    {
      name: "AUTHOR",
      type: "input",
      message: "Author of the package (Your Name <email>)"
    },
    {
      name: "REPO",
      type: "input",
      message: "Repository URL"
    },
  ]

  return inquirer.prompt(questions)
}

const interpolatePackageJson = (userData) => {
  const PACKAGE_JSON = './package.json'

  const templateBuffer = fse.readFileSync(PACKAGE_JSON)
  const templateText = templateBuffer.toString()

  // console.info('template', templateText)

  const result = templateText
    .replace('[NAME]', userData.NAME)
    .replace('[DESCRIPTION]', userData.DESCRIPTION)
    .replace('[AUTHOR]', userData.AUTHOR)
    .replace('[REPO]', userData.REPO)

  // console.info('result', result)

  fse.writeFileSync(PACKAGE_JSON, result)
}

const validate = () => {
  if (!isEmptyDir(targetDir)) {
    console.error(chalk.red(`Target directory ${targetDir} is not empty. Make sure it is empty or contains only .gitignore file.`))
    process.exit(1)
  }
}

const cleanup = () => {
  fse.emptyDirSync(targetDir)
}

const createFiles = (userData) => {
  try {
    // console.info(`Debug: Copying files ${templateDir} -> ${targetDir}`)
    fse.copySync(templateDir, targetDir, { recursive: true })
  } catch (error) {
    console.error(chalk.red(`\nFailed to copy config files to ${targetDir}`), error)
    cleanup()
    process.exit(1)
  }

  try {
    interpolatePackageJson(userData)
  } catch (error) {
    console.error(chalk.red(`\nFailed to interpolate package.json`), error)
    cleanup()
    process.exit(1)
  }
}

const installDependencies = () => {
  try {
    child.execSync('npm i', { stdio: 'inherit' })
  } catch (error) {
    console.error(chalk.red(`\nFailed to install dependencies via "npm i"`))
    process.exit(1)
  }
}

const main = async () => {
  validate()
  const userData = await askQuestions()

  console.info('Spawning a TS library')

  console.info(chalk.yellow(` - Setting up files and configs [1/2]...`))
  createFiles(userData)

  console.info(chalk.yellow(` - Installing dependencies [2/2]...\n`))
  installDependencies()

  console.log(chalk.green('\nSuccess!'))
  process.exit(0)
}

main()
