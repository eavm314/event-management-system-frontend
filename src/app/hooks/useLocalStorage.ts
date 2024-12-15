interface ActionsLocalStorage {
  saveDataLS: (keyValue: string, value: any) => void;
  getDataLS: (key: string) => any;
};

const useLocalStorage = (): ActionsLocalStorage => {
  const isClient = typeof window === 'object';

  const stringToValue = (key: string) => {
    if (isClient) {
      return JSON.parse(localStorage.getItem(key) || "null");
    }
    return null;
  };

  const getDataLS = (key: string) => {
    const DATA_PAGE = stringToValue(key);
    return DATA_PAGE;
  };

  const saveDataLS = (keyValue: string, value: any) => {
    if (isClient) {
      if (!localStorage.getItem(keyValue)) {
        localStorage.setItem(keyValue, JSON.stringify({}));
      }

      const STORAGE_VALUE = stringToValue(keyValue);
      localStorage.setItem(keyValue, JSON.stringify({ ...STORAGE_VALUE, ...value }));
    }
  };

  return {
    saveDataLS,
    getDataLS
  };
};

export default useLocalStorage;
