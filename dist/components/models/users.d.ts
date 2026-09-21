import { UserEntity, UserResponse } from "./models_interfaces";
declare const users: {
    findById(user_id: number): UserResponse;
    findAll(): UserEntity[];
    deleteById(user_id: number): UserResponse;
    updateById(user: UserEntity): UserResponse;
    save(user: UserEntity): UserResponse;
};
export default users;
