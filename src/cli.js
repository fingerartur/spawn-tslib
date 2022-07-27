const path = require('path')
const fse = require('fs-extra')
const chalk = require('chalk')
const inquirer = require('inquirer')

const { PROJECT_INFO } = require('./projectInfo.js')

/**
 * Print error, usage and exit
 *
 * @param {string} error
 */
const cancelRun = (error) => {
  console.error(chalk.red(`Error: ${error}\n`))
  console.info('Usage: @finga/spawn-tslib <projectDir>')
  process.exit(1)
}

/**
 * Get project directory path (full path). Exit on error and print Usage
 *
 * @returns {{ name: string; pathname: string; }}} project directory name and full name
 */
const getProjectDir = () => {
  if (process.argv.length < 3) {
    cancelRun('Project directory was not specified')
  }

  if (process.argv.length > 3) {
    cancelRun('Too many arguments')
  }

  const name = process.argv[2]

  const isValidName = /[a-zA-Z0-9_-]+/.test(name)
  if (!isValidName) {
    cancelRun(`Directory name is not valid (according to pattern [a-zA-Z0-9_-]+)`)
  }

  const pathname = path.resolve(process.cwd(), name)

  if (fse.existsSync(pathname)) {
    cancelRun(`Directory "${pathname}" already exists`)
  }

  return {
    name,
    pathname,
  }
}

/**
 * Interactively ask user for more project info
 *
 * @returns {Record<string, string>} map or project info
 */
const askProjectInfo = () => {
  const questions = [
    {
      name: PROJECT_INFO.NAME,
      type: "input",
      message: "Name of the package"
    },
    {
      name: PROJECT_INFO.DESCRIPTION,
      type: "input",
      message: "Description of the package"
    },
    {
      name: PROJECT_INFO.AUTHOR,
      type: "input",
      message: "Author of the package (Your Name <email>)"
    },
    {
      name: PROJECT_INFO.REPO,
      type: "input",
      message: "Repository URL"
    },
  ]

  return inquirer.prompt(questions)
}

module.exports = {
  askProjectInfo,
  getProjectDir,
}
