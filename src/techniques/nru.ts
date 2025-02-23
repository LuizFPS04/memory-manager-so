import { InputData, Page, PageReference } from "../types/managerTypes";

export function nruAlgorithm(inputData: InputData): number {
    const totalFrames = inputData.totalFrames;
    const accesses = inputData.references;
    const frames: Page[] = [];
    let pageFaults = 0;

    for (const access of accesses) {
        const page = frames.find(frame => frame.pageNumber === access.page);

        if (!page) {
            pageFaults++;
            handlePageFault(access, frames, totalFrames);
        } else {
            page.R = 1;

            if (access.type === 'W') {
                page.M = 1;
            }
        }
    }

    return pageFaults;
}

function handlePageFault(access: PageReference, frames: Page[], totalFrames: number): void {
    if (frames.length < totalFrames) {

        frames.push({
            pageNumber: access.page,
            R: 1,
            M: access.type === 'W' ? 1 : 0,
        });
    } else {
        replacePage(access, frames);
    }
}

function replacePage(access: PageReference, frames: Page[]): void {
    let pageToReplace = frames[0];

    for (let frame of frames) {

        if ((frame.R === 0 && frame.M === 0) || (frame.R === 0 && frame.M === 1)) {
            pageToReplace = frame;
            break;
        }
    }

    const index = frames.indexOf(pageToReplace);
    frames.splice(index, 1);

    frames.push({
        pageNumber: access.page,
        R: 1,
        M: access.type === 'W' ? 1 : 0,
    });
}
