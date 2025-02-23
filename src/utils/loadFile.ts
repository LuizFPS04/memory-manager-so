import fs from 'fs';
import path from 'path';
import { InputData } from '../types/managerTypes';

export function readInputFile(filePath: string): InputData {
    const data = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
    const [totalPages, totalFrames, clockCycle, ...references] = data;
    const parsedReferences = references.map(line => {
        const [page, time, operation] = line.split(' ');
        return { page: parseInt(page), time: parseInt(time), type: operation as 'R' | 'W' };
    });
    return {
        totalPages: parseInt(totalPages),
        totalFrames: parseInt(totalFrames),
        clockCycle: parseInt(clockCycle),
        references: parsedReferences,
    };
}

export function writeOutputFile(filePath: string, results: number[]): void {
    const output = results.map(result => result.toString()).join('\n');
    fs.writeFileSync(filePath, output, "utf-8");
}

export function getTestFiles(directory: string): string[] {
    return fs.readdirSync(directory)
        .filter(file => file.startsWith('TESTE-') && file.endsWith('.txt'));
}