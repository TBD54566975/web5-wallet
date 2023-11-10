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

        // Remove existing symlink if it exists
        if (fs.existsSync(targetPath)) {
          fs.unlink(targetPath, (unlinkErr) => {
            if (unlinkErr) {
              console.error(
                `Error removing existing symlink for ${file} in ${targetDir}: ${unlinkErr.message}`
              );
              return;
            }
            createSymlink(sourcePath, targetPath, file, targetDir);
          });
        } else {
          createSymlink(sourcePath, targetPath, file, targetDir);
        }
      });
    });
});

function createSymlink(sourcePath, targetPath, file, targetDir) {
  fs.symlink(sourcePath, targetPath, (err) => {
    if (err) {
      console.error(
        `Error creating symlink for ${file} in ${targetDir}: ${err.message}`
      );
    } else {
      console.log(`Symlink created/updated for ${file} in ${targetDir}`);
    }
  });
}
