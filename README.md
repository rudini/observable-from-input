# observable-from-input

Small library that provides a typesave extension to use angular component input fields as RxJS Observables

## Installation

```npm
npm i observable-from-input
```

## Usage

Suppose you have the following component:

```typescript
@Component({
    selector: 'app-component',
    ...
})
export class AppComponent {
    @Input() showData: boolean;
    data$: Observable<Data>;

    constructor(private store: Store) {
        this.data$ = this.store.pipe(
            select(selectData));
    }
}
```

In the constructor you want to connect the input to an observable.
To do this you can now use the function fromInput.
The signature of the function looks like this:

```typescript
fromInput: <T>(target: T) => <K extends keyof T>(name: K) => Observable<T[K]>
```

The input can now be turned into an observable from the input field using the following call.

```typescript
fromInput<AppComponent>(this)('showData');
```

Here the complete example:

```typescript
import { fromInput } from 'observable-from-input';

@Component({
    selector: 'app-component',
    template: `
        <div *ngIf="showData">Input</div>
        <div *ngIf="showData$ | async">Input as observable</div>
    `
})
export class AppComponent {
    @Input() showData: boolean;
    showData$: Observable<boolean>;
    data$: Observable<Data>;

    constructor(private store: Store) {
        this.showData$ = fromInput<AppComponent>(this)('showData');
        this.data$ = this.store.pipe(
            select(selectData));

        // now you can connect observables as you like
    }
}
```
