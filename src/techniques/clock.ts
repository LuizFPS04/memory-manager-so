import { InputData, Page } from "../types/managerTypes";

export function clockAlgorithm(inputData: InputData): number {
    const totalFrames = inputData.totalFrames;
    const accesses = inputData.references;
    const frames: Page[] = [];
    let pageFaults = 0;
    let clockHand = 0;

    for (const access of accesses) {
        const page = frames.find(frame => frame.pageNumber === access.page);

        if (!page) {
            pageFaults++;

            if (frames.length < totalFrames) {
                frames.push({
                    pageNumber: access.page,
                    R: 1,
                    M: access.type === 'W' ? 1 : 0,
                });
            } else {
                while (true) {
                    const framePage = frames[clockHand];

                    if (framePage.R === 0) {
                        frames.splice(clockHand, 1, {
                            pageNumber: access.page,
                            R: 1,
                            M: access.type === 'W' ? 1 : 0,
                        });
                        break;
                    } else {
                        framePage.R = 0;
                        clockHand = (clockHand + 1) % totalFrames;
                    }
                }
            }
        } else {
            page.R = 1;

            if (access.type === 'W') {
                page.M = 1;
            }
        }
    }

    return pageFaults;
}