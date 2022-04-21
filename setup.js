// === SETUP ===

const data = [];

// Load database into memory from the `data` variable
const qData = new Map();
for (const questionData of data) {
    qData.set(questionData[0], new Map());

    for (const [key, answer] of questionData.slice(1)) {
        qData.get(questionData[0]).set(key, answer);
    }
}

// Use this to save the current in-memory map into JSON once 
// JSON.stringify([...qData.entries()].map(([a, b]) => [a, ...b.entries()]));
