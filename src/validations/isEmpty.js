/*
checks every data type & returns true if the data is empty
*/

const isEmpty = (data) => {
    return(
        data === undefined ||
        data === null ||
        (typeof data === 'object' && Object.keys(data).length === 0) ||
        (typeof data === 'string' && data.trim().length === 0)
    );
}

module.exports = isEmpty;