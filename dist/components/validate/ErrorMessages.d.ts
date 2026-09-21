declare function invalidNumber(num: string, entity: string): {
    error: {
        type: string;
        description: string[];
    };
};
interface ErrorMessage {
    error: {
        type: string;
        description: string[];
    };
}
declare function buildMessage(err: any, err_type: string): ErrorMessage;
export { invalidNumber, buildMessage };
