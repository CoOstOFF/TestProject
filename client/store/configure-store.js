import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/app-reducer'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

    if (module.hot) {
        module.hot.accept('../reducers/app-reducer', () => {
            const nextRootReducer = require('../reducers/app-reducer');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}