const clearList = () => {
  return (dispatch) => {
    dispatch(clearEntityTable());
  };
};

const populateAdditionalEntityTable = (projectTableInfo) => ({
  type: "POPULATE_ADDITIONAL_ENTITY_TABLE",
  additionalEntityListTable: projectTableInfo,
});

const populateEntityTable = (projectTableInfo) => ({
  type: "POPULATE_ENTITY_TABLE",
  entityListTable: projectTableInfo,
});

const clearEntityTable = () => ({
  type: "CLEAR_ENTITY_TABLE",
});

export { populateEntityTable, populateAdditionalEntityTable, clearList };
