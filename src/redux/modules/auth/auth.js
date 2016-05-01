import {ACTIONS} from './actions';

const LS_KEY = 'auth';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case ACTIONS.LOAD_FROM_LS_SUCCESS:
      let data = action.data;
      console.log('action called', data);
      return data ? data : state;
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.result,
        user: {name: action.result.userName}
      };
    case ACTIONS.LOGIN_FAIL:
      return {
        ...state,
        token: null,
        user: null,
        loginError: action.error
      };
    case ACTIONS.LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        user: null
      };
    default:
      return state;
  }
}

export function loadFromLS() {
  let data = null;
  if (!__SERVER__) {
    //!server side
    let json = ls.getItem(LS_KEY);
    if (json) {
      try {
        data = JSON.parse(json);
        data = data.token && data.user ? data : null;
      } catch (e) {
        data = null;
      }
    }
  }
  return {
    type: ACTIONS.LOAD_FROM_LS_SUCCESS,
    data: data
  };
}

export function saveToLS(auth) {
  window.ls.setItem(LS_KEY, JSON.stringify(auth));
}

export function login(username, password) {
  return {
    types: [ACTIONS.LOGIN, ACTIONS.LOGIN_SUCCESS, ACTIONS.LOGIN_FAIL],
    promise: (client) => {
      return client.post('/ui/token/login', {
        params: {username, password}
      });
    }
  };
}

export function logout() {
  window.ls.removeItem(LS_KEY);
  return {
    type: ACTIONS.LOGOUT_SUCCESS
  };
}