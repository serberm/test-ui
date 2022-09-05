/**
 * Finds the top parent by child reference
 * @param ref
 * @returns {*}
 */
export const getTopParent = (ref: string) => (data: Immutable.Dict<{parents: string[]}>): string => {
    const item = data.get(ref);
    if (!item) {
        return ref;
    }
    const [entryParentRef] = item.get('parents') || [];
    return entryParentRef ? getTopParent(entryParentRef)(data) : ref;
};
