const fs = require('fs');

// Read the formats file
let content = fs.readFileSync('config/formats.ts', 'utf8');

// Remove the duplicate format (lines 3335-3349)
const lines = content.split('\n');
const newLines = [];

let skipNext = false;
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this is the start of the duplicate format
    if (line.includes('"[Gen 6] 3v3 Multi Random Mega Battle"')) {
        skipNext = true;
        braceCount = 0;
        continue;
    }
    
    if (skipNext) {
        // Count braces to know when the format block ends
        for (const char of line) {
            if (char === '{') braceCount++;
            if (char === '}') braceCount--;
        }
        
        // If we've closed all braces, stop skipping
        if (braceCount <= 0 && line.includes('}')) {
            skipNext = false;
            continue;
        }
        continue;
    }
    
    newLines.push(line);
}

// Write the fixed content back
fs.writeFileSync('config/formats.ts', newLines.join('\n'));
console.log('Duplicate format removed!');
