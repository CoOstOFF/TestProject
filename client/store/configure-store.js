import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/app-reducer'

export default function configureStore(initialState) {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(thunk)
    ));

    if (module.hot) {
        module.hot.accept('../reducers/app-reducer', () => {
            const nextRootReducer = require('../reducers/app-reducer');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}