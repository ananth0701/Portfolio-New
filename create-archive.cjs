const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

// Create a file to stream archive data to
const output = fs.createWriteStream('portfolio-website.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log(`Archive created successfully: ${archive.pointer()} total bytes`);
  console.log('Portfolio website has been packaged as portfolio-website.zip');
});

// Handle warnings (e.g., stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err.message);
  } else {
    throw err;
  }
});

// Handle errors
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files and directories, excluding specified patterns
const excludePatterns = [
  'node_modules',
  'dist',
  '.git',
  '*.log',
  'portfolio-website.zip',
  'create-archive.js'
];

function shouldExclude(filePath) {
  return excludePatterns.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));
      return regex.test(filePath);
    }
    return filePath.includes(pattern);
  });
}

function addDirectory(dirPath, archivePath = '') {
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const archiveItemPath = archivePath ? path.join(archivePath, item) : item;
    
    if (shouldExclude(fullPath)) {
      return;
    }
    
    const stats = fs.statSync(fullPath);
    
    if (stats.isDirectory()) {
      addDirectory(fullPath, archiveItemPath);
    } else {
      archive.file(fullPath, { name: archiveItemPath });
    }
  });
}

// Add all files and directories from current directory
addDirectory('.');

// Finalize the archive
archive.finalize();