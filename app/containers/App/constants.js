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
import { browserHistory } from 'react-router';
export const DEFAULT_LOCALE = 'en';
let serverUrl = '';
let entityUrls = {};
if (process.env.NODE_ENV === 'production') {
  // serverUrl = 'https://esplsol.crm8.dynamics.com/api/data/v8.0/';
  // serverUrl = window.parent.Xrm.Page.context.getClientUrl();
  serverUrl = 'http://localhost:3000/api';
  entityUrls = {
    PRODUCTS: '/Product',
    QUOTE: '/Quote',
    COUNTRIES: '/countries',
  };
}
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function addQuery(query) {
  const location = Object.assign({}, browserHistory.getCurrentLocation());
  Object.assign(location.query, query); // or simple replace location.query if you want to completely change params
  browserHistory.push(location);
}

export function removeQuery(...queryNames) {
  const location = Object.assign({}, browserHistory.getCurrentLocation());
  queryNames.forEach((q) => delete location.query[q]);
  browserHistory.push(location);
}
export function generateGuid() {
  const guid = (`${S4() + S4()}-${S4()}-4${S4().substr(0, 3)}-${S4()}-${S4()}${S4()}${S4()}`).toLowerCase();
  return guid;
}
if (process.env.NODE_ENV === 'development') {
  serverUrl = 'http://localhost:3000/api';
  entityUrls = {
    PRODUCTS: '/Product',
    QUOTE: '/Quote',
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
export const CLONE_MULTIPLE_LINES = 'app/EditQuote/CLONE_MULTIPLE_LINES';
export const CALCULATE_SELECTED = 'app/EditQuote/CALCULATE_SELECTED';
export const QUICK_SAVE_QUOTES = 'app/EditQuote/QUICK_SAVE_QUOTES';
export const UPDTATE_PROPS = 'app/EditQuote/UPDTATE_PROPS';
export const CLONE_GROUP = 'app/EditQuote/CLONE_GROUP';
export const DELETE_GROUP = 'app/EditQuote/DELETE_GROUP';
export const UNGROUP = 'app/EditQuote/UNGROUP';
export const GROUP = 'app/EditQuote/GROUP';
export const UPDATE = 'app/EditQuote/UPDATE';
export const UPDATE_BUNDLE = 'app/EditQuote/UPDATE_BUNDLE';
export const UPDATE_SEG = 'app/EditQuote/UPDATE_SEG';
export const UPDATE_SEG_BUNDLE = 'app/EditQuote/UPDATE_SEG_BUNDLE';
export const UPDATE_SEG_SELECT = 'app/EditQuote/UPDATE_SEG_SELECT';
export const UPDATE_SEG_BUNDLE_SELECT = 'app/EditQuote/UPDATE_SEG_BUNDLE_SELECT';
export const UPDATE_GROUP_DATA = 'app/EditQuote/UPDATE_GROUP_DATA';
export const UPDATE_GROUP_VAL = 'app/EditQuote/UPDATE_GROUP_VAL';
export const SEGMENT = 'app/EditQuote/SEGMENT';
export const DESEGMENT = 'app/EditQuote/DESEGMENT';
export const UPDATE_SELECT = 'app/EditQuote/UPDATE_SELECT';
export const CANCEL = 'app/EditQuote/CANCEL';
export const CONTINUE = 'app/EditQuote/CONTINUE';
export const UPDATE_SELECT_BUNDLE = 'app/EditQuote/UPDATE_SELECT_BUNDLE';
export const SAVE_APP_CUSTOM_SEGMENT_DATA = 'app/EditQuote/SAVE_APP_CUSTOM_SEGMENT_DATA';
export const SAVECONFIGURATION_SUCCESS = 'app/EditQuote/SAVECONFIGURATION_SUCCESS';
export const TOGGLE_RECONFIGURELINE_STATUS = 'app/EditQuote/TOGGLE_RECONFIGURELINE_STATUS';
