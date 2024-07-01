import {Category} from "./category.types";
import {fetchCategoriesFailed, fetchCategoriesStart, fetchCategoriesSuccess} from "./category.action";
import {AnyAction} from "redux";

export type CategoryState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null
}

export const CATEGORIES_INITIAL_STATE: CategoryState = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as AnyAction) => {

    if(fetchCategoriesStart.match(action)) {
        return {...state, isLoading: true}
    }

    if(fetchCategoriesSuccess.match(action)) {
        // @ts-ignore
        return {...state, categories: action.payload, isLoading: false}
    }

    if(fetchCategoriesFailed.match(action)) {
        // @ts-ignore
        return {...state, error: action.payload, isLoading: false}
    }

    return state
}