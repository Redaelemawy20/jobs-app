import { configureStore, Middleware } from '@reduxjs/toolkit';
import api from './middleware/api';
import jobsReducer from './jobs';
import skillsReducer from './skills';
import searchReducer from './search';
const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    skills: skillsReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api as Middleware),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
