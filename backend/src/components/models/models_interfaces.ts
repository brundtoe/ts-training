export interface AuthorEntity {
    id: number,
    firstname: string,
    lastname: string,
    mail: string
}

export type AuthorMap = Map<number, AuthorEntity>

export interface EntityResponse {
    status: number,
        message?: string

}

export interface AuthorResponse extends EntityResponse {
    author?: AuthorEntity,
}

export enum statusCode {
    'OK' = 200,
    'NotFound' = 400
}

export interface BookEntity {
    id: number,
    author_id: number,
    title: string,
    published: string,
    bookprice: number,
    isbn: string,
    onhand: number
}

export type BookMap = Map<number, BookEntity>

export interface BookResponse  extends EntityResponse {
   book?: BookEntity
}

export interface UserEntity {
    id: number,
    name: string,
    city: string,
    state: string,
    country: string,
    mail: string
}

export type UserMap = Map<number, UserEntity>

export interface UserResponse  extends EntityResponse  {
    user?: UserEntity,
}

