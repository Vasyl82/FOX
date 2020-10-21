import FoxApiService from './FoxAPIService'
import { populateAdditionalEntityTable, populateEntityTable, } from '../actions'


const foxApi = new FoxApiService();

class RepresentationService {
  displaySimpleList = (entity, params = null, additional = false, signal = null) => {
    return async dispatch => {
      await foxApi.getEntityList(entity, params, signal)
        .then(data => {
          if (data.length > 0) {
            const entityTableInfo = this._generateTableInfo(data);
            this._renderList(additional, dispatch, entityTableInfo);
          }
        })
      // .then(() => Promise.resolve("Success: List received!"))
    }
  }

  displayDeleteList = (entity, params = null, additional = false, signal = null) => {
    return async dispatch => {
      await foxApi.getEntityList(entity, params, signal)
        .then(data => {
          if (data.length > 0) {
            const entityTableInfo = this._generateTableInfo(data);
            entityTableInfo.fields.push({
              key: 'delete_item',
              label: '',
              sorter: false,
              filter: false
            });
            this._renderList(additional, dispatch, entityTableInfo);
          }
        })
      // .then(() => Promise.resolve("Success: List received!"))

    }
  }

  displaySimpleListWithoutStatus = (entity, params = null, additional = false, signal = null) => {
    return async dispatch => {
      await foxApi.getEntityList(entity, params, signal)
        .then(data => {
          if (data.length > 0) {
            const entityTableInfo = this._generateTableInfo(data);
            entityTableInfo.fields.splice(entityTableInfo.fields.indexOf('status'), 1);
            this._renderList(additional, dispatch, entityTableInfo);
          }
        })
      // .then(() => Promise.resolve("Success: List received!"))

    }
  }

  displayDeleteListWithoutStatus = (entity, params = null, additional = false, signal = null) => {
    return async dispatch => {
      await foxApi.getEntityList(entity, params, signal)
        .then(data => {
          if (data.length > 0) {
            const entityTableInfo = this._generateTableInfo(data);
            entityTableInfo.fields.splice(entityTableInfo.fields.indexOf('status'), 1);
            entityTableInfo.fields.push({
              key: 'delete_item',
              label: '',
              sorter: false,
              filter: false
            });
            this._renderList(additional, dispatch, entityTableInfo);
          }
        })
      // .then(() => Promise.resolve("Success: List received!"))

    }
  }

  clearList = dispatch => {
    return dispatch(this.clearEntityTable())
  }

  populateAdditionalEntityTable = projectTableInfo => ({
    type: 'POPULATE_ADDITIONAL_ENTITY_TABLE',
    additionalEntityListTable: projectTableInfo
  })

  populateEntityTable = projectTableInfo => ({
    type: 'POPULATE_ENTITY_TABLE',
    entityListTable: projectTableInfo
  })

  clearEntityTable = () => ({
    type: 'CLEAR_ENTITY_TABLE',
  })

  _generateTableInfo(data) {
    const entityTableInfo = {};
    entityTableInfo.tableData = data;
    let first_row = data[0];
    entityTableInfo.fields = Object.keys(first_row);
    entityTableInfo.fields.shift();
    return entityTableInfo;
  }
  _renderList = (additional, dispatch, entityTableInfo) => {
    if (additional === true) {
      dispatch(populateAdditionalEntityTable(entityTableInfo))
      console.log("after list dispatch");
      return Promise.resolve("Success: List received!")
    }
    else {
      dispatch(populateEntityTable(entityTableInfo))
      console.log("after list dispatch");

      return Promise.resolve("Success: List received!")
    }
  }
}

export default RepresentationService
