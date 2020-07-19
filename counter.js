/**
 * Word occurrence counter
 * 
 * Usage: node counter.js books/baby-beluga.txt
 */

'use strict';

const fs = require('fs');
const path = require('path');

const CSV_OUTPUT_FILE = 'output.csv';

function main() {
    // process command line arguments
    const args = process.argv.slice(2);
    if (!args.length) {
        throw new Error('Please provide the location to a text file!');
    };
    const text = fs.readFileSync(path.resolve(process.cwd(), args[0])).toString();

    const wordCountOccurrence = {};
    // process text and count word occurrence
    text.replace(/[\r\n]+/gm, " ").replace(/,/gm, "").split(" ").forEach((word) => {
        const wordToCheck = word.toLowerCase();
        if (wordCountOccurrence.hasOwnProperty(wordToCheck)) {
            wordCountOccurrence[wordToCheck] += 1;
        } else {
            wordCountOccurrence[wordToCheck] = 1;
        }
    });
    // normalize word count occurrence into array that can be sorted
    const normalizedArray = Object.entries(wordCountOccurrence).map(
        (entry) => { return {word: entry[0], count: entry[1]}}
    );
    // sort word count occurrence in descending order
    normalizedArray.sort(function(a, b){ return b.count - a.count });
    // create and write csv file
    let csv = 'word,count\n';
    normalizedArray.forEach((occurrence) => {
        csv += `${occurrence.word},${occurrence.count}\n`;
    });
    fs.writeFileSync(CSV_OUTPUT_FILE, csv);
    // log word count occurrence
    normalizedArray.forEach((occurrence) => {
        console.log(`Word: '${occurrence.word}' Count: ${occurrence.count}`);
    });
}

main();