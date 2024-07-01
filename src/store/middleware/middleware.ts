import {Middleware} from "redux";
import {RootState} from "../store";

export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
    // @ts-ignore
    if (!action.type) {
        return next(action)
    }

    console.log("currentState: ", store.getState())

    next(action)

    console.log("next state: ", store.getState())
}