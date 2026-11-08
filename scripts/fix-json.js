const fs = require('fs');

function fixAndValidate(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace any key like:  key: or "key: or key": or "key":
    // Handles lines like `    summary: "` or `    significance": "` or ` "target_month: 12`
    let fixed = content.replace(/(^|[{,\s])\s*"?([a-zA-Z0-9_]+)"?\s*:/gm, '$1"$2":');

    // Also handle trailing commas before } or ]
    fixed = fixed.replace(/,(\s*[}\]])/g, '$1');

    try {
        const parsed = JSON.parse(fixed);
        fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
        console.log(`Successfully fixed and formatted ${filePath} (${parsed.length} items)`);
    } catch (e) {
        console.error(`Failed parsing ${filePath}:`, e.message);
        // Find line number from message if possible
        const posMatch = e.message.match(/position (\d+)/);
        if (posMatch) {
            const pos = parseInt(posMatch[1], 10);
            const line = fixed.slice(0, pos).split('\n').length;
            const snippet = fixed.slice(Math.max(0, pos - 80), Math.min(fixed.length, pos + 80));
            console.error(`Around line ${line}:\n--- SNIPPET ---\n${snippet}\n--- END ---`);
        }
    }
}

const file = process.argv[2] || 'database/seeds/december_events.json';
fixAndValidate(file);
