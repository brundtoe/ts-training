import { AuthorEntity, AuthorResponse } from './models_interfaces';
declare const _default: {
    findAll(): AuthorEntity[];
    findById(author_id: number): AuthorResponse;
    deleteById(author_id: number): AuthorResponse;
    updateById(author: AuthorEntity): AuthorResponse;
    save(author: AuthorEntity): AuthorResponse;
};
export default _default;
