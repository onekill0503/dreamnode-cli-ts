
export const searchValueFromArray = (
    data: Array<any>,
    k: string,
    attr: string
    ): any => {
    return data.filter(d => {
        if(d[attr] == k) return d;
    })[0];
}