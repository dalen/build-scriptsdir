const fs = require('fs');
const path = require('path');

exports.provideScriptsDirTargets = () => class ScriptsDirBuildProvider {
  constructor(cwd) {
    this.cwd = cwd;
    this.dirName = 'script';
    this.scriptsDir = path.join(this.cwd, this.dirName);
  }

  getNiceName() {
    return 'Scripts Directory';
  }

  isEligible() {
    try {
      return fs.statSync(this.scriptsDir).isDirectory();
    } catch (e) {
      return false;
    }
  }

  settings() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.scriptsDir, (error, files) => {
        if (error) {
          reject(error);
        } else {
          resolve(files.map(file => ({
            name: path.join(this.dirName, file),
            exec: path.join(this.dirName, file),
            sh: false,
          })));
        }
      });
    });
  }
};
