const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'src', 'admin');

// Skip files we've already manually handled
const skipFiles = new Set([
  'AdminLayout.jsx',
  'AdminSection.jsx',
  'AdminDashboard.jsx',
  'AdminLogin.jsx',
]);

// Replacements: [pattern, replacement] pairs applied in order
const replacements = [
  // Page wrapper backgrounds
  [/\bbg-white\b(?!\/)/g, 'bg-gray-900'],
  [/\bbg-gray-50\b/g, 'bg-gray-950'],
  [/\bbg-gray-100\b/g, 'bg-gray-900/60'],

  // Text colors
  [/\btext-gray-900\b/g, 'text-white'],
  [/\btext-gray-800\b/g, 'text-gray-100'],
  [/\btext-gray-700\b/g, 'text-gray-300'],
  [/\btext-gray-600\b/g, 'text-gray-400'],
  [/\btext-gray-500\b/g, 'text-gray-500'],

  // Borders
  [/\bborder-gray-200\b/g, 'border-white/[0.08]'],
  [/\bborder-gray-100\b/g, 'border-white/[0.06]'],
  [/\bborder-gray-50\b/g, 'border-white/[0.04]'],
  [/\bborder-gray-300\b/g, 'border-white/10'],

  // Inputs
  [/\bbg-white border border-gray-(?:200|300)\b/g, 'bg-white/[0.04] border border-white/[0.08]'],
  [/focus:ring-offset-white\b/g, 'focus:ring-offset-gray-950'],

  // Cards / shadows
  [/\bshadow-sm border border-gray-100\b/g, 'shadow-none border border-white/[0.08]'],

  // Badges
  [/\bbg-green-50 text-green-600\b/g, 'bg-green-500/10 text-green-400'],
  [/\bbg-green-50\b/g, 'bg-green-500/10'],
  [/\btext-green-600\b/g, 'text-green-400'],
  [/\bhover:bg-green-100\b/g, 'hover:bg-green-500/20'],
  [/\bbg-blue-50 text-blue-600\b/g, 'bg-blue-500/10 text-blue-400'],
  [/\bborder-blue-100\b/g, 'border-blue-500/20'],
  [/\bbg-red-50\b/g, 'bg-red-500/10'],
  [/\btext-red-600\b/g, 'text-red-400'],

  // Buttons
  [/\bbg-gray-50 text-gray-900 dark:text-white\b/g, 'bg-white/[0.04] text-gray-200'],
  [/\bhover:bg-gray-800\b/g, 'hover:bg-white/10'],
  [/\bhover:bg-gray-100\b/g, 'hover:bg-white/[0.08]'],
  [/\bhover:bg-gray-200\b/g, 'hover:bg-white/10'],

  // Heading text in page components
  [/\btext-2xl font-black text-gray-900\b/g, 'text-2xl font-black text-white'],
  [/\btext-sm text-gray-500\b/g, 'text-sm text-gray-500'],
];

function processFile(filePath) {
  const basename = path.basename(filePath);
  if (skipFiles.has(basename)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${filePath.replace(__dirname, '')}`);
  }
}

function walkDir(dir) {
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

walkDir(adminDir);
console.log('\n🎉 Admin dark-theme migration complete!');
