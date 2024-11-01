import { MiddlewareAPI, Dispatch, Action } from 'redux';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
type ApiCallPayload = {
  url: string;
  method?: string;
  data?: any;
  onStartActionType?: string;
  onSuccessActionType?: string;
  onFaildActionType?: string;
  onErrorActionTYpe?: string;
};
export const apiCall = createAction<ApiCallPayload>('api/call');
export const apiCallSuccess = createAction<{}>('api/callSuccess');
export const apiCallFailed = createAction<string>('api/callFailed');

const BASE_URL = 'https://skills-api-zeta.vercel.app';
const api =
  ({ dispatch }: MiddlewareAPI<Dispatch<Action>>) =>
  (next: Dispatch<Action>) =>
  async (action: PayloadAction<ApiCallPayload>) => {
    if (action.type !== apiCall.type) return next(action);
    const {
      url,
      method,
      data,
      onStartActionType,
      onSuccessActionType,
      onErrorActionTYpe,
    } = action.payload;

    if (onStartActionType) dispatch({ type: onStartActionType });
    next(action);

    try {
      const response = await fetch(BASE_URL + url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const responseData = await response.json();
      // general success  call ex: if we need to add toast notification
      dispatch(apiCallSuccess(responseData));
      // specific success handler
      if (onSuccessActionType)
        dispatch({ type: onSuccessActionType, payload: responseData });
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'An unknown error occurred';
      dispatch(apiCallFailed(errorMessage));
      if (onErrorActionTYpe)
        dispatch({ type: onErrorActionTYpe, payload: errorMessage });
    }
  };

export default api;
