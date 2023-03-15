import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import playlistReducer from './playlist';
import followingPlaylistReducer from './followingplaylist';
import followingUserReducer from './followinguser';
import audioPlayerReducer from './audioplayer';
import songsLikedReducer from './likedsongs';

const rootReducer = combineReducers({
  session,
  playlistReducer,
  followingPlaylistReducer,
  followingUserReducer,
  audioPlayerReducer,
  songsLikedReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
