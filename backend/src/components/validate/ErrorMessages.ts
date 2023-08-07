function invalidNumber(num: string, entity: string) {
    return {
        error: {
            type: 'VALIDATION_ERROR',
            description: [
                `Værdien: ${num} er ikke et ${entity} nummer`
            ]
        }
    }
}

interface ErrorMessage {
    error: {
        type: string,
        description: string[]
    }
}
function  buildMessage (err: any, err_type: string) {
    let error: ErrorMessage = {
        error: {
            type: err_type,
            description: []
        }
    }
    for (const item of err.details) {
        error.error.description.push(item.message)
    }
    return error
}

export {invalidNumber, buildMessage}
