import { InputData } from '../types/managerTypes';

export function optimalAlgorithm(data: InputData): number {
    const { references, totalFrames } = data;
    let pageFaults = 0;
    const frames: number[] = [];

    for (let i = 0; i < references.length; i++) {
        const page = references[i].page;

        if (!frames.includes(page)) {
            pageFaults++;
            if (frames.length < totalFrames) {
                frames.push(page);
            } else {
                let farthest = i;
                let replaceIndex = 0;

                for (let j = 0; j < frames.length; j++) {
                    const nextUse = references.slice(i + 1).findIndex(ref => ref.page === frames[j]);
                    if (nextUse === -1) {
                        replaceIndex = j;
                        break;
                    } else if (nextUse > farthest) {
                        farthest = nextUse;
                        replaceIndex = j;
                    }
                }
                frames[replaceIndex] = page;
            }
        }
    }
    return pageFaults;
}