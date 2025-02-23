export interface PageReference {
    page: number;
    time: number;
    type: 'R' | 'W';
}

export interface InputData {
    totalPages: number;
    totalFrames: number;
    clockCycle: number; // Ciclo do relógio (se necessário)
    references: PageReference[];
}

export type Page = {
    pageNumber: number;
    R: number; // Referência
    M: number; // Modificação
};

export type PageWs = {
    pageNumber: number;
    R: number; // Referência
    M: number; // Modificação
    lastAccess: number; // Último acesso
    present: boolean; // Se a página está presente na memória
};