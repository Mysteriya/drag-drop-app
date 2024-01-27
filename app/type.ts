export type TypeCard = {
    id: string;
    title: string;
}

export interface TypeBoard {
    id: string;
    title: string;
    items: TypeCard[];
}