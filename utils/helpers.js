module.exports = {
  mapPlainTrue: async (dataObject) => {
    return await dataObject.map((obj) => {
      return obj.get({ plain: true });
    });
  },
};
