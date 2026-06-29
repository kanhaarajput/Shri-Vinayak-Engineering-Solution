const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/admin/pages/tabs');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix axios requests where I accidentally messed up the template literal
  // e.g., axios.get(${API_URL}/future-vision'); -> axios.get(`${API_URL}/future-vision`);
  // Or axios.post(${API_URL}/future-vision', data) -> axios.post(`${API_URL}/future-vision`, data)

  content = content.replace(/axios\.([a-z]+)\(\$\{API_URL\}(.*?)'\)/g, "axios.$1(\`${API_URL}$2\`)");
  content = content.replace(/axios\.([a-z]+)\(\$\{API_URL\}(.*?)',/g, "axios.$1(\`${API_URL}$2\`,");
  
  // also fix double quotes
  content = content.replace(/axios\.([a-z]+)\(\$\{API_URL\}(.*?)\"\)/g, "axios.$1(\`${API_URL}$2\`)");
  content = content.replace(/axios\.([a-z]+)\(\$\{API_URL\}(.*?)\",/g, "axios.$1(\`${API_URL}$2\`,");

  fs.writeFileSync(filePath, content);
});

console.log("Fixes applied successfully.");
