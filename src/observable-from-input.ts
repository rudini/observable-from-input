import { Observable, ReplaySubject } from 'rxjs';

export const fromInput = <T>(target: T) => <K extends keyof T>(name: K): Observable<T[K]> => {
    let current: T[K];
    const subject = new ReplaySubject<T[K]>(1);

    if (target[name] !== undefined) {
        subject.next(target[name] as any);
    }

    Object.defineProperty(target, name, {
        set(value: T[K]) {
            subject.next(value);
            current = value;
        },
        get() {
            return current;
        },
    });

    return subject.asObservable();
};
