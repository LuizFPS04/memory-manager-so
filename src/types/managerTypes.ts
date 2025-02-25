export interface PageReference {
    page: number;
    time: number;
    type: 'R' | 'W';
}

export interface InputData {
    totalPages: number;
    totalFrames: number;
    clockCycle: number;
    references: PageReference[];
}

export type Page = {
    pageNumber: number;
    R: number;
    M: number;
};

export type PageWs = {
    pageNumber: number;
    R: number;
    M: number;
    lastAccess: number;
    present: boolean;
};