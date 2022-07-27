
const child = require('child_process')
const commandExistsSync = require('command-exists').sync

/**
 * Open project in vscode
 *
 * @param {string} directory project directory
 */
const openInVscode = (directory) => {
  try {
    if (commandExistsSync('code')) {
      child.execSync(`code ${directory}`)
    }
  } catch (error) {
    // do nothing
  }
}

module.exports = {
  openInVscode,
}
