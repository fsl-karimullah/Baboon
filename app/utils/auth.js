import tokenService from './tokens';
import { ENDPOINT } from '../configs';

export const AuthenticationStatus = {
  LoggingIn: 'LoggingIn',
  LoggedIn: 'LoggedIn',
  LoggedOut: 'LoggedOut',
  Unauthorized: 'Unauthorized'
};

class Auth {
  constructor(tokens) {
    this.tokens = tokens;
    this.subscribers = [];
  }

  /**
   * Check is user's tokens are already saved
   * @returns true of logged in, false otherwise
   */
  async isLoggedIn() {
    const tokens = await this.tokens.get();
    return !!tokens;
  }

  /**
   * Login and save credentials to local storage
   * @param {String} username - username
   * @param {String} pin - pin
   * @param {String} deviceId - pin
   */
  async login(username, pin, deviceId, loginByUser, params, isNumChange) {
    this._notifySubscribers(AuthenticationStatus.LoggingIn);

    // If there are stored tokens, no need to re-login
    let tokens = await this.tokens.get();
    let result;
    if (tokens && loginByUser !== null) {
      return tokens;
    }
    try {
      if (loginByUser) {
        result = await ENDPOINT.login({
          username,
          pin,
          deviceId
        });
      } else if (loginByUser === null) {
        if (isNumChange) {
          result = await ENDPOINT.register(params);
        } else {
          result = await ENDPOINT.updateRegister(params);
          console.log(result);
        }
      } else {
        result = await ENDPOINT.loginEmployee({
          username,
          pin
        });
      }
      if (result.success && result.message !== 'Account re registration') {
        tokens = result.data;
        await this.tokens.save(tokens);
        await this._notifySubscribers(AuthenticationStatus.LoggedIn);
        return result;
      }
      this._notifySubscribers(AuthenticationStatus.Unauthorized, result);
      return result;
    } catch (error) {
      this._notifySubscribers(AuthenticationStatus.Unauthorized, error);
      throw error;
    }
  }

  /**
   * Logout by removing users credentials from local storage / session
   */
  async logout() {
    await this.tokens.clear();

    this._notifySubscribers(AuthenticationStatus.LoggedOut);
  }

  /**
   * Subscribe to changes in authentication state
   * @param {Function} subscriber - (authenticationState, error) => ...
   */
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  /**
   * Remove original subscriber
   * @param {Function} subscriber - function that was used to subscribe for changes
   */
  unsubscribe(subscriber) {
    const index = this.subscribers.indexOf(subscriber);

    if (index > -1) {
      this.subscribers.splice(index, 1);
    }
  }

  _notifySubscribers(state, error) {
    this.subscribers.forEach(subscriber => subscriber({ state, error }));
  }
}

export { Auth };
export default new Auth(tokenService);
