export const setAccessTokenToLocalStorage = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};

export const clearAccessTokenFromLocalStorage = () => {
  localStorage.removeItem("access_token");
};

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem("access_token") || "";
};

export const LocalStorageEventTarget = new EventTarget();
export const clearLS = () => {
  localStorage.clear();

  /** Dispatch event when token is expired
   *  We need global state: isAuthenticated will be false)
   *  So I dispatch and listen this event in App
   */
  const clearLocalStorageEvent = new Event("clearLS");
  LocalStorageEventTarget.dispatchEvent(clearLocalStorageEvent);
};
