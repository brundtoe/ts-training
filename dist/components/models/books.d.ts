import { BookEntity, BookResponse } from "./models_interfaces";
declare const _default: {
    findById(book_id: number): BookResponse;
    findAll(): BookEntity[];
    deleteById(book_id: number): BookResponse;
    updateById(book: BookEntity): BookResponse;
    save(book: BookEntity): BookResponse;
};
export default _default;
