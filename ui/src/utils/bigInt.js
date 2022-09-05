import { currencySymbols } from './constants';

export const DECIMAL_POINTS = 10;

export const DECIMAL_SEPARATOR = parseFloat('1.1')
    .toLocaleString()
    .substring(1, 2);
export const THOUSAND_SEPARATOR = parseInt('1000')
    .toLocaleString()
    .substring(1, 2);


export const fromBigInt = (n) => {
    if (n === null || n === undefined) {
        return null;
    }

    const minus = n !== '' && n[0] === '-' ? '-' : '';
    n = minus === '' ? n : n.substring(1);

    // Make sure we have enough leading zeros if we get a small number
    while (n.length < DECIMAL_POINTS) {
        n = '0' + n;
    }

    let value =
        n.slice(0, n.length - DECIMAL_POINTS) +
        '.' +
        n.slice(n.length - DECIMAL_POINTS);

    while (
        value.includes('.') &&
        (value.endsWith('0') || value.endsWith('.'))
    ) {
        value = value.slice(0, -1);
    }

    if (value === '') {
        return '0';
    }

    return minus + value;
};

export const formatCurrency = (value, symbol, decimalPoints) => {
    if (value === '' || value === undefined || value === null) {
        return value;
    }

    const minus = value[0] === '-' ? '-' : '';

    if (value.indexOf('.') >= 0) {
        if (decimalPoints) {
            value = Number(value).toFixed(decimalPoints);
        } else {
            decimalPoints = DECIMAL_POINTS;
        }
        const decimalPosition = value.indexOf('.');

        let leftSide = value[0] !== '0' ? value.substring(0, decimalPosition) : value.substring(1, decimalPosition); 
        let rightSide = value.substring(decimalPosition);

        leftSide = formatLeft(leftSide) || '0';
        rightSide = formatRight(rightSide).substring(0, decimalPoints + 1);

        return (
            minus +
      (currencySymbols[symbol] || '') +
      leftSide +
      DECIMAL_SEPARATOR +
      rightSide
        );
    } else {
        return (
            minus +
      (currencySymbols[symbol] || '') +
      formatLeft(value)
        );
    }
};

const formatLeft = (n) => {
    return n
        .replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, THOUSAND_SEPARATOR);
};

const formatRight = (n) => {
    return n.replace(/\D/g, '');
};
