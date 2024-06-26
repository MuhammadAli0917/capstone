import {compose, createStore, applyMiddleware} from "redux";
import {logger} from "redux-logger/src";
import {rootReducer} from "./root-reducer";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage"
import {loggerMiddleware} from "./middleware/middleware";
import {thunk} from "redux-thunk";
import createSagaMiddleware from "redux-saga"
import {rootSaga} from "./root-saga";


const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["cart"]
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV === "development" && logger, sagaMiddleware].filter(Boolean)

const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

// persist = save changes