const storage = (function () {
  const store: Record<string, unknown> = {};

  return {
    getItem: function (key: string) {
      return store[key] || null;
    },
    setItem: function (key: string, value: unknown) {
      store[key] = value;
    },
    removeItem: function (key: string) {
      delete store[key];
    },
  };
})();

export default storage;
