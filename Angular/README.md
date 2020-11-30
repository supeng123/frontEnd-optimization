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


concatMap Runs subscriptions/requests in order and is less performant
Use for get, post and put requests when order is important

mergeMap Runs subscriptions/requests in parallel
Use for put, post and delete methods when order is not important

switchMap Cancels the current subscription/request and can cause race condition
Use for get request or cancelable requests like searches 永远取最新的

exhaustMap Ignores all subsequent subscriptions/requests until it completes 永远取第一个出来的
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
### Rxjs operators
~~~
combineLatest 返回多个abservable产生各自最新的结果，结果个数和observable的个数一样
merge 拿多个abservable的结果中最新的一个

var ob = combineLatest(
    fromEvent(document, 'click'),
    fromEvent(document, 'dblclick')
).subscribe([v1,v2] => {
    console.log(`${v1.clientX}, ${v2.clientX}`)
})

var ob = forkJoin(
    fromEvent(document, 'click').pipe(take(1)),
    fromEvent(document, 'dblclick').pipe(take(1))
).subscribe([v1,v2] => {
    console.log(`${v1.clientX}, ${v2.clientX}`)
})

startWith 用在一个observable依赖前面返回一个特定值

var ob = fromEvent(document, 'click').pipe(
    startWith([1,2,3])
).subscribe(console.log)

三元运算符iif
const firstOrSecond = iif(
    () => (return true),
    of('first'),
    of('second')
).subscribe(console.log)

//scan,reduce, scan不需要每个observable返回值，reduce需要
~~~
### angular 路由resolve
~~~
提前拿数据，避免到component中onInit时去拿反应慢

@Injectable()
export class HomeResolveService implements Resolve<HomeDataType> {
    constructor(private homeService: HomeService, private singerService: SingerService) {}
    resolve(): Observable<HomeDataType> {
        return forkJoin([
            this.homeService.getBanners(),
            this.singerService.getEnterSinger()
        ]).pipe(first())
    }
}


然后在component 通过路由拿到所有resolve的值,HomeDatas需要暴露到module的import参数里 resolve模块
this.route.data.pipe(map(res => res.HomeDatas)).subscribe(res => {
    console.log(res)
})
~~~
### 创建动态模板比如实时广告
~~~
import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, Directive, ViewContainerRef, Type } from '@angular/core';

@Directive({
    selector: ['ad-host']
})
class AdDirective {
    contructor(public viewContainerRef:ViewContainerRef) {}
}

class AdItem {
    constructor(public component: Type<any>, public data: any) {}
}

interface AdComponent {
    data: any
}

@Component({
  selector: 'app-ad-banner',
  template: `
              <div class="ad-banner-example">
                <h3>Advertisements</h3>
                <ng-template ad-host></ng-template>
              </div>
            `
})
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[];
  currentAdIndex = -1;
  @ViewChild(AdDirective, {static: true}) adHost: AdDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}

entryComponents: [ HeroJobAdComponent, HeroProfileComponent ],
~~~
### elementRef && templateRef && viewContainerRef
~~~
elementref 能拿到dom原生节点的信息
templateRef 能拿到ng-template的信息
viewContainerRef 可以通过templateRef创建管理视图
~~~
### contentChild && viewChild
~~~
都可以通过定义拿到子组件里面的属性方法
viewchild是直接拿到子组件
contentchild 是ng-content的内容投影
https://www.cnblogs.com/banluduxing/p/10394387.html
~~~
### InjectionToken
~~~
构造函数中非 Type 类型的参数只能通过 @Inject(Something) 的方式注入
~~~
### Forward Reference
~~~
通过引入 forwardRef 让我们可以在使用构造注入时，使用尚未定义的依赖对象类型

@Injectable()
class Socket {
  constructor(private buffer: Buffer) { }
}
console.log(Buffer); // undefined
@Injectable()
class Buffer {
  constructor(@Inject(BUFFER_SIZE) private size: Number) { }
}
console.log(Buffer); // [Function: Buffer]

//alternative
import { forwardRef } from'@angular2/core';

@Injectable()
class Socket {
  constructor(@Inject(forwardRef(() => Buffer)) 
      private buffer) { }
}

class Buffer {
  constructor(@Inject(BUFFER_SIZE) private size: Number) { }
}
~~~