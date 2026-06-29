const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Pattern to match standard hardcoded card styles
  // We'll replace the style block and inject tailwind classes into the preceding className
  const regex = /className="([^"]+)"[\s\n]*style=\{\{\s*background:\s*'rgba\(17,24,39,0\.\d+\)',\s*border:\s*'1px solid rgba\(255,255,255,0\.0[56]\)',\s*backdropFilter:\s*'blur\(\d+px\)',\s*WebkitBackdropFilter:\s*'blur\(\d+px\)',?\s*\}\}/g;
  
  content = content.replace(regex, (match, classes) => {
    return `className="${classes} bg-white/80 dark:bg-gray-900/85 border border-black/5 dark:border-white/[0.06] backdrop-blur-md"`;
  });

  // Also catch variations with just background and border
  const regex2 = /className="([^"]+)"[\s\n]*style=\{\{\s*background:\s*'rgba\(17,24,39,0\.\d+\)',\s*border:\s*'1px solid rgba\(255,255,255,0\.0[56]\)',?\s*\}\}/g;
  content = content.replace(regex2, (match, classes) => {
    return `className="${classes} bg-white/80 dark:bg-gray-900/85 border border-black/5 dark:border-white/[0.06]"`;
  });

  // Also catch variations with just background and backdropFilter
  const regex3 = /className="([^"]+)"[\s\n]*style=\{\{\s*background:\s*'rgba\(17,24,39,0\.\d+\)',\s*backdropFilter:\s*'blur\(\d+px\)',\s*WebkitBackdropFilter:\s*'blur\(\d+px\)',?\s*\}\}/g;
  content = content.replace(regex3, (match, classes) => {
    return `className="${classes} bg-white/80 dark:bg-gray-900/85 backdrop-blur-md"`;
  });

  // If there's a standalone background: 'rgba(17,24,39,0.8)' that didn't match above:
  // (We have to be careful not to break other style elements)
  // We'll manually fix the remaining ones if needed.

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated inline styles in ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

walkDir('./src');
console.log("Inline style cleanup complete.");
