const API_ENDPOINT_URL="https://humanize-api.vercel.app/humanize";

document.getElementById('submitButton').addEventListener('click',getResults);
document.getElementById('clearText').addEventListener('click',clearText);
document.getElementById('textarea').addEventListener('input', count);

function count() {
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const text = this.value;
    const count = text.length;
    const words = text.trim().split(/\s+/);

    charCount.textContent = `Character Count: ${count}/5000`;
    wordCount.textContent = `Word Count: ${words.length}`;

}
function clearText(){
    const inputText = document.getElementById('textarea');
    inputText.value="";
    const event = new Event('input', { bubbles: true });
    inputText.dispatchEvent(event);
}
function getResults(){
    const rephraseButton = document.getElementById('rephraseButton');
    const inputText = document.getElementById('textarea');
    const outputText = document.getElementById('outputTextarea');
    const text = inputText.value;
    const startTime = new Date();

    fetch(API_ENDPOINT_URL, {
        method: 'POST',
        body: JSON.stringify({text}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const endTime = new Date();

            const rephrasedText = data.output;
            console.log(rephrasedText);
            inputText.value = rephrasedText;
            outputText.innerText="Converted in "+(endTime-startTime)/1000+"s";
        })
        .catch(error => {
            console.error('Error:', error);
        });
}