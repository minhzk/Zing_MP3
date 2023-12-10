import rootReducer from "./store/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
const reduxConfig = () => {

    const store = createStore(rootReducer, applyMiddleware(thunk))
    const persistor = persistStore(store)

    return {store, persistor}
}

export default reduxConfig