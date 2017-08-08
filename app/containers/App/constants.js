/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
let serverUrl = '';
let entityUrls = {};
if (process.env.NODE_ENV === 'production') {
  // serverUrl = 'https://esplsol.crm8.dynamics.com/api/data/v8.0/';
  //serverUrl = window.parent.Xrm.Page.context.getClientUrl();
  serverUrl = 'http://localhost:3000/api';
  entityUrls = {
    PRODUCTS: '/products',
    QUOTE: '/quote',
    COUNTRIES: '/countries',
  };
}

if (process.env.NODE_ENV === 'development') {
  serverUrl = 'http://localhost:3000/api';
  entityUrls = {
    PRODUCTS: '/products',
    QUOTE: '/quote',
    COUNTRIES: '/countries',
  };
}
export const SERVER_URL = serverUrl;
export const EntityURLs = entityUrls;
// export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
// export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
// export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
// export const LOAD_DATA = 'app/ApiPage/LOAD_DATA';
// export const LOAD_DATA_SUCCESS = 'app/ApiPage/LOAD_DATA_SUCCESS';
// export const LOAD_DATA_ERROR = 'app/ApiPage/LOAD_DATA_ERROR';
export const DEFAULT_ACTION = 'app/App/DEFAULT_ACTION';
export const SAVE_ACTION = 'app/App/SAVE_ACTION';
export const LOAD_DATA = 'app/App/LOAD_DATA';
export const LOAD_DATA_SUCCESS = 'app/App/LOAD_DATA_SUCCESS';
export const LOAD_DATA_ERROR = 'app/EditQuote/LOAD_DATA_ERROR';
export const CLONE_LINE = 'app/EditQuote/CLONE_LINE';
export const DELETE_LINE = 'app/EditQuote/DELETE_LINE';
export const LOAD_XRM_DATA = 'app/EditQuote/LOAD_XRM_DATA';
export const LOAD_XRM_DATA_SUCCESS = 'app/EditQuote/LOAD_XRM_DATA_SUCCESS';
export const ADD_PRODUCTS = 'app/EditQuote/ADD_PRODUCTS';
export const DELETE_MULTIPLE_LINES = 'app/EditQuote/DELETE_MULTIPLE_LINES';
export const CALCULATE_SELECTED = 'app/EditQuote/CALCULATE_SELECTED';
export const QUICK_SAVE_QUOTES = 'app/EditQuote/QUICK_SAVE_QUOTES';
export const UPDTATE_PROPS = 'app/EditQuote/UPDTATE_PROPS';
