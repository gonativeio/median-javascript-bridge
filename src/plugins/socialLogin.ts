import { CallbackParams } from '../types/index.js';
import { addCommand, addCommandCallback } from '../utils.js';

type FacebookLoginData = {
  accessToken?: string;
  error?: string;
  state?: string;
  type: 'facebook';
  userId?: string;
};

type FacebookLoginParams = {
  callback?: (data: FacebookLoginData) => void;
  redirectUri?: string;
  scope?: string;
  state?: string;
};

type GoogleSigninData = {
  error?: string;
  idToken?: string;
  state?: string;
  type: 'google';
};

type GoogleSigninParams = {
  callback?: (data: GoogleSigninData) => void;
  redirectUri?: string;
  state?: string;
};

type AppleSigninData = {
  code?: string;
  error?: string;
  idToken?: string;
  firstName?: string | null;
  lastName?: string | null;
  state?: string;
  type: 'apple';
};

type AppleSigninParams = {
  callback?: (data: AppleSigninData) => void;
  redirectUri?: string;
  state?: string;
};

const socialLogin = {
  facebook: {
    login: function (params?: FacebookLoginParams) {
      if (params?.callback) {
        return addCommandCallback<FacebookLoginData>('median://socialLogin/facebook/login', params);
      }
      addCommand('median://socialLogin/facebook/login', params);
    },
    logout: function (params: CallbackParams) {
      if (params?.callback) {
        return addCommandCallback('median://socialLogin/facebook/logout', params);
      }
      addCommand('median://socialLogin/facebook/logout', params);
    },
  },
  google: {
    login: function (params?: GoogleSigninParams) {
      if (params?.callback) {
        return addCommandCallback<GoogleSigninData>('median://socialLogin/google/login', params);
      }
      addCommand('median://socialLogin/google/login', params);
    },
    logout: function (params: CallbackParams) {
      if (params?.callback) {
        return addCommandCallback('median://socialLogin/google/logout', params);
      }
      addCommand('median://socialLogin/google/logout', params);
    },
  },
  apple: {
    login: function (params?: AppleSigninParams) {
      if (params?.callback) {
        return addCommandCallback<AppleSigninData>('median://socialLogin/apple/login', params);
      }
      addCommand('median://socialLogin/apple/login', params);
    },
  },
};

export default socialLogin;
