// Artificial sleep functions
const sleep = time => new Promise((res) => setTimeout(res, time));
const sleepRandom = async (min, max) => await sleep(Math.random() * (max - min) + min);

// === MAIN LOOP ===

// Set `repeat = false` to pause answering.
let repeat = true;

async function addNewWording(question) {
	qData.set(question, new Map());
}    

async function addNewQuestion(question, keys) {    
    document.querySelector("#answercontainer div a").click();
    await sleep(4000);
    qData.get(question).set(keys, document.querySelector("#answercontainer .btn-success").dataset.answerid);
}    

async function answer(question, keys) {
    // If we've never encountered the question before, add it to the database
	if (!qData.has(question)) await addNewWording(question);

    // If we have encountered the question before, but not with these answers, add the
    // concatenated answer ID string 
    if (!qData.get(question).has(keys)) return await addNewQuestion(question, keys);

    document.querySelector(`#answercontainer
a[data-answerid="${qData.get(question).get(keys)}"]`).click();    
    await sleep(4000);
}    

async function answerQuestion() {
    try {
        // Because there are sometimes duplicate questions with different answers,
        // we use have nested maps that look like so:

        /* 
        "<question text here>" -> {
            "0001000200030004" -> "0002",
            "1001100210031004" -> "1004",
        }
        */

        // The top-level map uses the exact question text as a key, and the value
        // for that key is another map which has the concatenated answer IDs as keys,
        // and the correct answer ID as its value.

        // This function extracts and concatenates the IDs from the `data-answerid`
        // attribute from the answers HTML elements.
        const concatenatedIDs = 
            [...document.querySelectorAll(".btn-answer")]
                .slice(0, 4)
                .map(n => parseInt(n.dataset.answerid))
                .sort((a, b) => parseInt(a) - parseInt(b))
                .join("");
        
        // Answer
        await answer(document.querySelector("#questiontext").textContent, keys);

    } catch(error) {
        // Catch errors just in case, then click the first answer to continue to the next question.
        console.log(error);
        document.querySelector("#answercontainer div a").click();

        await sleepRandom(4000, 6000);
    }    

    // Move onto the next question
    document.querySelector("#lnkNext").click();

    // Random sleep so we don't get caught :troll:
    await sleepRandom(5000, 6000);

    // Only repeat if loop is active
    if (repeat) answerQuestion();
}    

answerQuestion();
