# Notes

### Store
- Single container for application state
- Interact w/ that state in an immutable way (none of the inner properties mutated)
- Install the @ngrx/store package
- Organize application state by feature
- Name the feature slice with the feature name
- Initialize the store using:
    - `StoreModule.forRoor(reducer)`
    - `StoreModule.forFeature('feature', featureReducer)`

### Action
- An action represents an event
- Define an action for each event worth tracking
    - not local to a component unless the actions need to be tracked after the component is destroyed

### Reducer
- Responds to dispatched actions
- Replaces the state tree w/ new state
- Build a reducer function (often one per feature)
- Implement using create Reducer: 
    ```
    export const productReducer  =  createReducer(
        initialState,
        on(ProductActions.toggleProductCode, state => {
            return {
                ...state,
                showProductCode: !state.showProductCode
            };
        })
    );
    ```
- Spread the state as needed

### Dsipatching an Action
- Often done in response to a user action or an operation
- Inject the store in the constructor
- Call the dispatch method of the sotre
- Pass in the action to dispatch:
    ```
    this.store.dispatch({
        type: '[Product] Toggle Product Code'
    });
    ```
- Dispatched to all reducers

### Subscribing to the Store
- Often done in the ngOnInit lifecycle hook
- Inject the store in the constructor
- Use the store's select function, passing in the desired slice of state
- Subscribe: 
    ```
    this.store.select('products').subscribe(
        products => this.displayCode = products.showProductCode
    );
    ```

### Installing Redux DevTools
- Install the Redux Devtools Chrome extension
- Add @ngrx/store-devtools
- Initialize StoreDevToolsModule in App module

### Using Redux DevTools
- Inpsect action logs
- Visualize state tree
- Time travel debugging

### Strongly Typing State
- Define an interface for each slice of state:
    ```
    export interface ProductState {
        showProductCode: boolean;
        currentProduct: Product;
        products: Product[];
    }
    ```
- Compose them for the global application state
- Use the interfaces to strongly type the state
    ```
    import { State } from './state/product.reducer';
    ...
    constructor(private store: Store<State>) { }
    ```

### Initializing State
- Set initial values: 
    ```
    const initialState: ProductState = {
        showProductCode: true,
        currentProduct: null,
        products: []
    }
    ```
- Initialize the state:
    ```
        export const productReducer = createReducer<ProductState>(
            initialState,
            on(...)
        );
    ```

### Building Selectors
- Build selectors to define reusable state queries
- Conceptually similar to stored procedures
- Feature selector:
    ```
    const getProductFeatureState = createFeatureSelector<ProductState>('products');
    ```
- State selector:
    ```
    export const getShowProductCode = createSelector(
        getProductFeatureState,
        state => state.showProductCode
    );
    ```

### 
