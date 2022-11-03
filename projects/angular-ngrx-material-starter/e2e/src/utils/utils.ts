import { browser } from 'protractor';

export const getCurrentRouteUrl = () =>
  browser.getCurrentUrl().then((url) => url.substring(url.lastIndexOf('/') + 1));
