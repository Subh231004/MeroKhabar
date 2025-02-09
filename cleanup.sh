const fs = require('fs');
const path = require('path');

const dirsToClean = ['client', 'admin', 'server'];
const foldersToRemove = ['node_modules', 'build', 'dist'];

dirsToClean.forEach(dir => {
    foldersToRemove.forEach(folder => {
        const targetPath = path.join(__dirname, dir, folder);
        if (fs.existsSync(targetPath)) {
            fs.rmSync(targetPath, { recursive: true, force: true });
            console.log(`Removed ${targetPath}`);
        }
    });
});