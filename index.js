const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require("path");
const port=process.env.PORT || 80;
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use((req, res, next) => {
    if (req.url.endsWith('.js') || req.url.endsWith('.css')) {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    }
    next();
});

function replaceWords(text, replacements) {
    const words = text.split(' ');
    const replacedWords = words.map((word) => {
        const normalizedWord = word.replace(/[^\w']/g, '');
        let replacement=replacements[normalizedWord.toLowerCase()] || word;
        replacement=replacement.replace(replacement[0],word[0])
        return replacement;
    });
    return replacedWords.join(' ');
}

const replacements = {
    "don't": "do not",
    "isn't": "is not",
    "aren't": "are not",
    "doesn't": "does not",
    "didn't": "did not",
    "haven't": "have not",
    "hasn't": "has not",
    "hadn't": "had not",
    "it's": "it is",
    "let's": "let us",
    "i'll": "i will",
    "you'll": "you will",
    "he'll": "he will",
    "she'll": "she will",
    "we'll": "we will",
    "they'll": "they will",
    "i've": "i have",
    "you've": "you have",
    "we've": "we have",
    "they've": "they have",
    "i'd": "i would",
    "you'd": "you would",
    "he'd": "he would",
    "she'd": "she would",
    "we'd": "we would",
    "they'd": "they would",
    "i'm": "i am",
    "you're": "you are",
    "he's": "he is",
    "she's": "she is",
    "we're": "we are",
    "they're": "they are",
    "can't": "cannot",
    "won't": "will not",
    "couldn't": "could not",
    "shouldn't": "should not",
    "wouldn't": "would not",
    "mustn't": "must not",
    "shan't": "shall not",
    "that's": "that is",
    "there's": "there is",
    "here's": "here is",
    "what's": "what is",
    "where's": "where is",
    "who's": "who is",
    "why's": "why is",
    "how's": "how is"
};

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Route for serving the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/humanize', (req, res) => {
    let text = req.body.text;
    text = text.replace(/-/g, ' ');
    text = text.replace(/\s*,\s*/g, ',');
    text = text.replace(/,\s+ and/g, ' and');
    text = text.replace(/'s/g, ' is');
    text = text.replace(/(?<![\.\s\W])\s(\w+)/g, (match) => match.toLowerCase());
    text=replaceWords(text, replacements);
    text = text.replace(/([!@#$%^&*()_+=[\]{}|\\:;"'<>,/?])/g, ' $1 ');
    const response = {
        status: "ok",
        output: text
    };
    res.json(response);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
