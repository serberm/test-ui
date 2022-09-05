type Dict<T> = {[k: string] : T};

// ImmutableJS type overrides
declare module Immutable {
    export interface Map<T> extends import('immutable').Map<string, any> {
        set<K extends keyof T>(key: K, value: T[K]): Immutable.Map<T>;
        get<K extends keyof T>(name: K, notSetValue?: T[K]): T[K];
        toJS(): T
    }
    export type Dict<T> = import('immutable').Map<string, Immutable.Map<T>>;
}
