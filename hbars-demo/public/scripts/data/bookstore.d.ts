export declare const bookstore: {
    authors: {
        id: number;
        firstname: string;
        lastname: string;
        mail: string;
    }[];
    books: {
        id: number;
        author_id: number;
        title: string;
        published: string;
        bookprice: number;
        isbn: string;
        onhand: number;
    }[];
    customers: {
        id: number;
        name: string;
        city: string;
        state: string;
        country: string;
        mail: string;
    }[];
};
