import { isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { alertError } from "./alertState";

export const errorHandler: Middleware = (api: MiddlewareAPI) => next => action => {
    if ( isRejectedWithValue(action) ) {
        api.dispatch(
			alertError(
				action.payload?.data?.message || "Что-то пошло не так..."
			)
		)
    }
    return next(action)
}