/**
 * Helpers to work with model structures
 * These must be clean functions
 */

export const getTopParent = (ref: string) => (data: Dict<{parents: string[]}>): string => {
    const [parentRef] = data[ref]?.parents || [];
    return parentRef ? getTopParent(parentRef)(data) : ref;
};
