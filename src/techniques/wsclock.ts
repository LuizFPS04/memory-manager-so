import { InputData, PageReference, PageWs } from "../types/managerTypes";

export function wsClockAlgorithm(inputData: InputData): number {
    const totalFrames = inputData.totalFrames;
    const accesses = inputData.references;
    const frames: PageWs[] = [];
    let pageFaults = 0;
    const tau = inputData.clockCycle;
    let clockHand = 0;

    for (const access of accesses) {
        const page = frames.find(frame => frame.pageNumber === access.page);

        if (!page) {
            pageFaults++;
            handlePageFault(access, frames, totalFrames, clockHand, tau);
        } else {
            // Atualiza o bit de referência
            page.R = 1;
            // Se for uma escrita, também marca o bit de modificação
            if (access.type === 'W') {
                page.M = 1;
            }
            page.lastAccess = access.time; // Atualiza o último acesso
        }
    }

    return pageFaults;
}

function handlePageFault(access: PageReference, frames: PageWs[], totalFrames: number, clockHand: number, tau: number): void {
    if (frames.length < totalFrames) {
        
        frames.push({
            pageNumber: access.page,
            R: 1,
            M: access.type === 'W' ? 1 : 0,
            lastAccess: access.time,
            present: true,
        });
    } else {
        replacePage(access, frames, clockHand, tau);
    }
}

function replacePage(access: PageReference, frames: PageWs[], clockHand: number, tau: number): void {
    let victimFound = false;
    const startHand = clockHand;

    do {
        const current = frames[clockHand];
        const age = access.time - current.lastAccess;

        if (age > tau) {
            if (current.R === 0 && current.M === 0) {
                current.present = false;
                frames[clockHand] = {
                    pageNumber: access.page,
                    R: 1,
                    M: access.type === 'W' ? 1 : 0,
                    lastAccess: access.time,
                    present: true,
                };
                victimFound = true;
                break;
            }
        }

        current.R = 0;
        clockHand = (clockHand + 1) % frames.length;
    } while (clockHand !== startHand && !victimFound);

    if (!victimFound) {
        do {
            const current = frames[clockHand];
            if (current.R === 0) {
                current.present = false;
                frames[clockHand] = {
                    pageNumber: access.page,
                    R: 1,
                    M: access.type === 'W' ? 1 : 0,
                    lastAccess: access.time,
                    present: true,
                };
                victimFound = true;
                break;
            }
            current.R = 0;
            clockHand = (clockHand + 1) % frames.length;
        } while (clockHand !== startHand && !victimFound);

        if (!victimFound) {
            const victim = frames[clockHand];
            victim.present = false;
            frames[clockHand] = {
                pageNumber: access.page,
                R: 1,
                M: access.type === 'W' ? 1 : 0,
                lastAccess: access.time,
                present: true,
            };
        }
    }
}
