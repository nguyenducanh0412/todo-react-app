export const KEY_TODO = "TODO_APP_ITEM";

export const LOCAL_STORAGE = {
  getItem: (key) => {
    return window.localStorage.getItem(key);
  },
  setItem: (key, value) => {
    return window.localStorage.setItem(key, value);
  },
};
