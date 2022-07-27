const child = require('child_process')
const chalk = require('chalk')

/**
 * Installs dependencies for the project via NPM. Exits on error
 *
 * @param {string} projectDirName - name of the directory where the project should be created
 */
const installDependencies = (projectDirName) => {
  try {
    child.execSync(`npm --prefix ${projectDirName} i`, { stdio: 'inherit' })
  } catch (error) {
    console.error(chalk.red(`\nFailed to install dependencies via "npm i"`))
    process.exit(1)
  }
}

module.exports = {
  installDependencies,
}
