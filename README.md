# auto-smart-revise
This respository holds the code and data required to inject a script into the online quiz platform [smart revise](https://smartrevise.online/) that will automatically answer questions.

## Reasoning
I was bored?

## Process
Smart Revise is protected by CloudFlare, which makes writing webdriver-driven bots difficult. Instead, this bot comes in the form of a script that can be injected directly into the debug console of the quiz page. Follow the steps below to run the script.

### Explanation
Since this is a client-based script, the question data it uses is **not** stored externally in any kind of database - which means it's up to you, the user, to generate the data and load it in every time you wish to use the bot.
The data takes the form of a JSON file that is gradually filled up with questions as the bot continues to answer, but it is your responsibility to reguarly save this data into an external file and load it back in when you start up the bot.
Due to copyright concerns, this repository will **not** contain any of these JSON files, as the questions and their answers are copyright of Craig 'n Dave LTD.

### First-Time Setup
- Log into [smart revise](https://smartrevise.online/) and navigate to the quiz page - `students/revise/Question/<some number>`.
- Press `CTRL + SHIFT + J` to open the debug console on the website.
- Copy and paste the entirety of `setup.js` into the console and click enter.
- Copy and paste the entirety of `run.js` into the console and click enter.
- The bot has started! Every time it encounters a question, it will check if it has the answer to the question saved in its data. If not, it will answer randomly and record the correct answer in its memory. When it encounters the same question again, it will answer correctly!

### Saving bot data
- In order for your bot to retain the questions it has learned the answer to, you must reguarly export its memory and save it an external JSON file.
- To do this, simple copy and paste **line 16** from `setup.js` into the console (minus the `//` at the start) - `JSON.stringify([...qData.entries()].map(([a, b]) => [a, ...b.entries()]));`
- This will output a long string, that you can **right-click on** and select `Copy String Contents`.
- Then just paste this into an external file for safekeeping!

### Loading bot data
- If you have some external files, you can load them into the bot when you start it up by replacing **line 3** in `setup.js`.
- Turn replace `[]` on line 3 with the exact contents of your JSON file.
- Then copy/paste the entirety of `setup.js` into the console, followed by the entirety of `run.js`
- The bot will start running with knowledge of all the questions contained in the JSON file, and will be able to answer questions automatically!

## Liability
The publishing of this code is not an admission of use by the Author. The Author retains no liability for legal consequences due to to your use of any of the resources provided within this repository.
