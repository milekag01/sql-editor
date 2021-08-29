import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-community/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['requests'],
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  store,
  persistor,
};
