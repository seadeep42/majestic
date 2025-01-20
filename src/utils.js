export const onlyAlphanumeric = (str) => {
    return (str || '').replace(/[^a-zA-Z0-9]/g, '');
};

export const onlyNumeric = (str) => {
    return (str || '').replace(/[^0-9]/g, '');
};

export const onlyAlphabetic = (str) => {
    return (str || '').replace(/[^a-zA-Z]/g, '');
};
