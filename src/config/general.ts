import app from '../../app.json'

const { name, version } = app.expo

// -----------------------------------------------------------------------------
// General
// -----------------------------------------------------------------------------
export const APP_NAME = name
export const APP_VERSION = version
// eslint-disable-next-line no-undef
export const IS_DEBUG = __DEV__

// -----------------------------------------------------------------------------
// Static url app api
// -----------------------------------------------------------------------------
const URLS = {
  PRODUCTION: {
    API: process.env.EXPO_PUBLIC_API_URL,
  },
}

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------
export const API_URL = URLS.PRODUCTION.API

// -----------------------------------------------------------------------------
// Errors
// -----------------------------------------------------------------------------
export const API_ERROR_TYPE_BAD_REQUEST = 'bad_request'
export const API_ERROR_TYPE_NOT_FOUND = 'not_found'
export const API_ERROR_TYPE_FORBIDDEN = 'forbidden'
export const API_ERROR_TYPE_CONNECTION = 'connection'
export const API_ERROR_TYPE_OTHER = 'other'
export const API_ERROR_TYPE_CANCEL = 'cancel'
