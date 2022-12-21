export interface MetaData {
    meta: Options;
    items: Customer[];
}

interface Options {
    currentPage: number;
    perPage: number;
    totalPages: number;
}

export interface Customer {
    id: number;
    username: string;
    email: string;
    address: string;
}

export type FormValues = {
    username: string;
    email: string;
};