export const capitalizeFirstLetter = (value: string): string => {
    return value[0].toLocaleUpperCase() + value.slice(1, value.length);
};
