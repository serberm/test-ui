export const uniq = <T>(data: T[]) => Array.from(new Set(data));

export const isDev = () => process.env.NODE_ENV === 'development';
