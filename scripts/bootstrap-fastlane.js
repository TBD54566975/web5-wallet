/**
 * This script generates initial symlinks for fastlane.
 * Rerun this anytime new .env files get introduced
 * or when setting up on a new machine.
 */
const fs = require("fs");
const path = require("path");

const envDir = "./env";
const targetDirs = ["./ios/fastlane", "./android/fastlane"];

// This function creates a symlink if the target file does not already exist
function createSymlink(sourcePath, targetPath) {
  try {
    if (fs.existsSync(targetPath)) {
      console.log(`Symlink already exists: ${targetPath}`);
      return;
    }

    fs.symlinkSync(sourcePath, targetPath, "file");
    console.log(`Symlink created: ${targetPath} -> ${sourcePath}`);
  } catch (err) {
    console.error(
      `Error creating symlink from ${sourcePath} to ${targetPath}:`,
      err
    );
  }
}

// This function processes a directory and creates symlinks for all files within it
function processDirectory(sourceDir, targetDirs) {
  // Read all files from source directory
  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${sourceDir}:`, err);
      return;
    }

    // Iterate over each file in the environment directory
    files.forEach((file) => {
      // Construct full path to the source file
      const sourceFilePath = path.join(sourceDir, file);

      // Check if it's a file and not a directory
      if (fs.lstatSync(sourceFilePath).isFile()) {
        // Create a symlink in each target directory
        targetDirs.forEach((targetDir) => {
          // Construct full path to the target symlink
          const targetFilePath = path.join(targetDir, file);
          // Create the symlink
          createSymlink(sourceFilePath, targetFilePath);
        });
      }
    });
  });
}

// Creating symlinks for iOS and Android fastlane directories
processDirectory(envDir, targetDirs);
