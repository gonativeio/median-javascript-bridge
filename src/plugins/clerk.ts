import { Clerk } from '../types/clerk.js';
import { addCommandCallback } from '../utils/index.js';

const clerk = {
  initialize: function (params: Clerk.InitializeParams) {
    return addCommandCallback<Clerk.InitializeResponse>('median://clerk/initialize', params);
  },
  presentSignIn: function () {
    return addCommandCallback<Clerk.PresentSignInResponse>('median://clerk/presentSignIn');
  },
  signOut: function () {
    return addCommandCallback<Clerk.SignOutResponse>('median://clerk/signOut');
  },
  getAuthStatus: function () {
    return addCommandCallback<Clerk.GetAuthStatusResponse>('median://clerk/getAuthStatus');
  },
};

export default clerk;
