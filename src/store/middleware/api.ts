import { MiddlewareAPI, Dispatch, Action } from 'redux';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
type ActionWithOptionalPayload = PayloadAction<object> | Action;
type ApiCallPayload = {
  url: string;
  method?: string;
  data?: any;
  onStartAction?: ActionWithOptionalPayload;
  onSuccessAction?: ActionWithOptionalPayload;
  onFailedAction?: ActionWithOptionalPayload;
  onErrorAction?: ActionWithOptionalPayload;
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
      onStartAction,
      onSuccessAction,
      onFailedAction,
    } = action.payload;

    if (onStartAction) dispatch(onStartAction);
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
      if (onSuccessAction) {
        dispatch(mergePayloads(onSuccessAction, responseData));
      }
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'An unknown error occurred';
      dispatch(apiCallFailed(errorMessage));
      if (onFailedAction)
        dispatch(mergePayloads(onFailedAction, { message: errorMessage }));
    }
  };

export default api;

/*
  helper function to merge intial action payload 
  with for example the result of  an api call
  return new action to dispatch
*/
function mergePayloads(action: ActionWithOptionalPayload, data: {}) {
  return {
    type: action.type,
    payload: {
      ...data,
      ...('payload' in action // if there is payload merge it with response data
        ? action.payload
        : {}),
    },
  };
}
