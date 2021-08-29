import {RequestStatus} from './constants';
import {getProp} from './helpers';

export const initialRequestState = () => ({
  status: RequestStatus.NOT_STARTED,
  error: null,
});

export const handleRequest = (REQUEST, SUCCESS, FAILURE, state, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        status: RequestStatus.STARTED,
      };
    case SUCCESS:
      return {
        ...state,
        status: RequestStatus.SUCCESS,
        error: null,
      };
    case FAILURE: {
      return {
        ...state,
        status: RequestStatus.FAILURE,
        error: action.error || action.payload,
      };
    }
    default:
      return state;
  }
};

export const actionCreator = (type, payload) => ({type, payload});

export const mapListToObject = (records, key) => {
  const object = {};
  if (records) {
    records.forEach((item) => {
      object[item[key]] = item;
    });
  }
  return object;
};

export const mergeListToObject = (state, records, path) => {
  const object = {};
  let arrKeyPath = path.split('.');
  const getKey = getProp(arrKeyPath);
  const arrObjectPath = arrKeyPath.slice(0, arrKeyPath.length - 1);
  let getObject = getProp(arrObjectPath);
  if (records) {
    records.forEach((item) => {
      const key = getKey(item);
      if (!key) return;

      const current = state[key];
      object[key] = {...(current || {}), ...getObject(item)};
    });
  }
  return object;
};
