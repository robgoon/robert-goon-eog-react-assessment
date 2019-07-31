import * as actions from '../actions';

const initialState = {
  measurements: {},
};

const singleMeasurementsDataRecevied = (state, action) => {
  const { getMeasurements } = action;

  return {
    ...state,
    measurements: {
      [getMeasurements[0].metric]: getMeasurements,
    },
  };
};

const handlers = {
  [actions.GET_MEASUREMENTS_DATA_RECEIVED]: singleMeasurementsDataRecevied,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];

  if (typeof handler === 'undefined') return state;

  return handler(state, action);
};
