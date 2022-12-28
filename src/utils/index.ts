
export const searchValueFromArray = (
    data: Array<any>,
    k: string,
    attr: string
    ): any => {
    return data.filter(d => {
        if(d[attr] == k) return d;
    })[0];
}
export const sleep = async (T: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, T));
}