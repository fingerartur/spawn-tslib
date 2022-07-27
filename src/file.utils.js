const path = require('path')
const fse = require('fs-extra')
const chalk = require('chalk')

const { PROJECT_INFO } = require('./projectInfo.js')

/**
 * Remove all temporary files
 *
 * @param {string} projectDir target directory for the project (full path)
 */
const cleanupAndExit = (projectDir) => {
  try {
    fse.rmdirSync(projectDir)
  } catch (error) {
    console.error(chalk.red(`\nFatal: Failed to clean up ${projectDir}`), error)
    process.exit(1)
  }
}

/**
 * Interpolate dynamic fields in package.json
 *
 * @param {string} projectDir project directory
 * @param {Record<string, string>} projectInfo project info
 */
const interpolatePackageJson = (projectDir, projectInfo) => {
  const packageJsonPath = path.resolve(projectDir, 'package.json')

  const templateBuffer = fse.readFileSync(packageJsonPath)
  const templateText = templateBuffer.toString()

  // console.info('template', templateText)

  let result = templateText
  Object.values(PROJECT_INFO).forEach(value => {
    result = result.replace(`[${value}]`, projectInfo[value] ?? "")
  })

  // console.info('result', result)

  fse.writeFileSync(packageJsonPath, result)
}

/**
 * Create TS lib project files in projectDir. Fail on exit
 *
 * @param {string} projectDir target directory for the project (full path)
 * @param {Record<string,string>} projectInfo project info
 */
const createProjectFiles = (projectDir, projectInfo) => {
  try {
    fse.mkdirSync(projectDir)
  } catch (error) {
    console.error(chalk.red(`\nFailed to make directory ${projectDir}`), error)
    cleanupAndExit(projectDir)
    process.exit(1)
  }

  try {
    const templateDir = path.resolve(__dirname, '../template')
    fse.copySync(templateDir, projectDir, { recursive: true })
  } catch (error) {
    console.error(chalk.red(`\nFailed to copy config files to ${projectDir}`), error)
    cleanupAndExit(projectDir)
    process.exit(1)
  }

  try {
    interpolatePackageJson(projectDir, projectInfo)
  } catch (error) {
    console.error(chalk.red(`\nFailed to interpolate package.json`), error)
    cleanupAndExit(projectDir)
    process.exit(1)
  }
}

module.exports = {
  createProjectFiles,
}
