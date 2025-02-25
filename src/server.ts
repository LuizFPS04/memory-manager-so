import * as path from 'path';

import { readInputFile, writeOutputFile, getTestFiles } from './utils/loadFile';

import { optimalAlgorithm } from './techniques/optimal';
import { nruAlgorithm } from './techniques/nru';
import { clockAlgorithm } from './techniques/clock';
import { wsClockAlgorithm } from './techniques/wsclock';

const directory = "C://Users//upflo//OneDrive//Área de Trabalho//IFMG//memory-manager-so-1//src//docs";
const directoryDestiny = path.resolve(__dirname, './doc-parsed');
const files = getTestFiles(directory);

files.forEach(file => {
    const inputFilePath = path.join(directory, file);
    const outputFileName = file.replace('.txt', '-RESULTADO.txt');
    const outputFilePath = path.join(directoryDestiny, outputFileName);

    const inputData = readInputFile(inputFilePath);
    const results = [
        optimalAlgorithm(inputData),
        nruAlgorithm(inputData),
        clockAlgorithm(inputData),
        wsClockAlgorithm(inputData)
    ];

    writeOutputFile(outputFilePath, results);
    console.log(`Arquivo ${outputFilePath} gerado.`);
});
