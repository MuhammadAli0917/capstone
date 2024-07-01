import {UserState} from "./user.reducer";
import {createSelector} from "reselect";
import {RootState} from "../store";

// @ts-ignore
export const selectUserReducer = (state: RootState): UserState => state.user

export const selectCurrentUser = createSelector(selectUserReducer, (user) => user.currentUser)