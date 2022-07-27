#!/usr/bin/env node

const chalk = require('chalk')

const { askProjectInfo, getProjectDir } = require('./cli.js')
const { installDependencies } = require('./dependencies.js')
const { createProjectFiles } = require('./file.utils.js')
const { openInVscode } = require('./command.js')

const main = async () => {
  const { name, pathname } = getProjectDir()
  const projectInfo = await askProjectInfo()

  console.info(`Spawning a TS library ${name}`)

  console.info(chalk.yellow(` - Setting up files and configs [1/2]...`))
  createProjectFiles(pathname, projectInfo)

  console.info(chalk.yellow(` - Installing dependencies [2/2]...\n`))
  installDependencies(name)

  console.log(chalk.green('\nSuccess!'))
  openInVscode(name)
  process.exit(0)
}

main()
