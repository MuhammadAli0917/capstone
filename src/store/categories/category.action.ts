import {ActionWithPayload, Action, createAction, withMatcher} from "../../utils/reducer/reducer";
import {CATEGORIES_ACTION_TYPES, Category} from "./category.types";

// @ts-ignore
export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

// @ts-ignore
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

// @ts-ignore
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>


// export type CategoryAction = FetchCategoriesFailed | FetchCategoriesSuccess | FetchCategoriesStart


export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START))

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray))

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFailed =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error))





