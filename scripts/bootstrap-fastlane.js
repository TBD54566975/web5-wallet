/**
 * This script generates initial symlinks for fastlane.
 * Rerun this anytime new .env files get introduced
 * or when setting up on a new machine.
 */
const fs = require("fs");
const path = require("path");

const sourceDir = "./env/";
const targetDirs = ["./ios/fastlane/", "./android/fastlane/"];

fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error(`Error reading directory ${sourceDir}: ${err.message}`);
    return;
  }

  files
    .filter((file) => file.startsWith(".env"))
    .forEach((file) => {
      targetDirs.forEach((targetDir) => {
        const sourcePath = "../../" + path.join(sourceDir, file); // Adjusted path
        const targetPath = path.join(targetDir, file);

        fs.symlink(sourcePath, targetPath, (err) => {
          if (err) {
            if (err.code === "EEXIST") {
              console.log(`Symlink for ${file} already exists in ${targetDir}`);
            } else {
              console.error(
                `Error creating symlink for ${file} in ${targetDir}: ${err.message}`
              );
            }
          } else {
            console.log(`Symlink created for ${file} in ${targetDir}`);
          }
        });
      });
    });
});
