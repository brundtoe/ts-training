import {getUsers} from './fetchMap'
import {UserEntity, UserResponse, statusCode} from "./models_interfaces"

const users = {

    findById(user_id: number): UserResponse {
        const data = getUsers()
        if (data.has(user_id)) {
            return {
                user: data.get(user_id),
                status: statusCode.OK,
                message: `User ${user_id} er fundet`
            }
        }
        return {
            status: statusCode.NotFound,
            message: `User med nummer ${user_id} findes ikke`,
        }
    },

    findAll(): UserEntity[] {
        let data: UserEntity[] = []
        try {
            const actual = getUsers()
            if (actual.size > 0) {
                actual.forEach((item) => {
                    data.push(item)
                })
            }
            return data
        } catch (err: any) {
            return []
        }
    },
    deleteById(user_id: number): UserResponse {
        try {
            const data = getUsers()
            if (data.has(user_id)) {
                data.delete(user_id)
                return {
                    status: statusCode.OK,
                    message: `Slettet user ${user_id}`
                }
            }
            return {
                status: statusCode.NotFound,
                message: `User med nummer ${user_id} findes ikke`,
            }

        } catch (err: any) {
            return {
                user: undefined,
                status: statusCode.NotFound,
                message: err.message
            }

        }
    },

    updateById(user: UserEntity): UserResponse {
        try {
            const data = getUsers()
            if (data.has(user.id)) {
                data.set(user.id, user)
                return {
                    user: data.get(user.id),
                    status: statusCode.OK,
                    message: `User ${user.id} er opdateret`
                }
            }
            return {
                status: statusCode.NotFound,
                message: `User med nummer ${user.id} findes ikke`,
            }
        } catch (err: any) {
            return {
                user: undefined,
                status: statusCode.NotFound,
                message: err.message
            }
        }
    },
    save(user: UserEntity): UserResponse {
        let data: Map<number, UserEntity> | undefined
        try {
            data = getUsers()
            const lastUser: UserEntity | undefined = data.get(data.size)
            if (lastUser) {
                user.id = lastUser.id + 1
                data.set(user.id, user)
                return {
                    user: data.get(user.id),
                    status: statusCode.OK,
                    message: `User ${user.id} er oprettet`
                }
            }
            return {
                user: undefined,
                status: statusCode.NotFound,
                message: 'Unexpected end of save author'
            }
        } catch (err: any) {
            return {
                user: undefined,
                status: statusCode.NotFound,
                message: err.message
            }
        }
    }
}

export default users
