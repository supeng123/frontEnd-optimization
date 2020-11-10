### 1. Agrx lazyload state
~~~
import * as fromRoot from './state/app.state'

export interface State extends fromRoot.State {
    products: ProductState
}

export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[]
}

export function reducer(state: ProductState, action): ProductSate {
    switch (action.type) {
        case: 'TOGGLE_PRDUCT_CODE':
            return {
                ...state,
                showProductCode: action.payload
            }
        default:
            return state;
    }
}

note: store: Store<fromProduct.State> //引用feature product state
~~~
### 2. Agrx Selector Caching data
~~~
//in reducer
const getProductFeatureState = createFeatureSelector<ProductState>('products')

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
)

//in component
this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
    showProductCode => this.displayCode = showProductCode
)

//compose multiple selectors
export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
)

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => state.products.find(p => p.id === currentProductId)
)
~~~
### 3.Agrx Effects
~~~

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productService: ProductService) {}

    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productAction.Load) => this.productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError(error => of(new LoadFail(error)))
        ))
    )
}


switchMap Cancels the current subscription/request and can cause race condition
Use for get request or cancelable requests like searches

concatMap Runs subscriptions/requests in order and is less performant
Use for get, post and put requests when order is important

mergeMap Runs subscriptions/requests in parallel
Use for put, post and delete methods when order is not important

exhaustMap Ignores all subsequent subscriptions/requests until it completes
Use for login when you do not want more requests until the initial one is completed

//app.module
EffectsModule.forRoot([])
//detail module
EffectsModule.forFeature(ProductEffects)

//use effects
this.store.dispatch(new productActions.Load())
this.store.pipe(select(fromProduct.getProducts),
        takeWhile(() => this.componentActive))
    .subscribe(
    (products: Product[]) => this.products = products
)

or
products$: Observable<Product[]>;
this.products$ = this.store.pipe(select(fromProduct.getProducts))

<div class="card-body" *ngIf="products$ | async as products">
~~~
### Promise && Rxjs
~~~
funtion promiseFunction() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(123)
        }, 1000)
    })
}

function rxjsFunction() {
    return new Observable((Observer) => {
        setTimeout(() => {
            Observer.next(123)
        }, 1000)
    })
}

promiseFunction().then(console.log)
rxjsFunction().subscribe(console.log)
~~~