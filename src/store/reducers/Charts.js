import * as actions from '../actions';

const initialState = {
  measurements: {},
  metrics: [],
  selectedMetrics: [],
};

const getMetricsDataRecevied = (state, action) => {
  const { getMetrics } = action;

  return {
    ...state,
    metrics: getMetrics,
  };
};
const setSelectedMetrics = (state, action) => {
  const { selectedMetrics } = action;

  return {
    ...state,
    selectedMetrics,
  };
};

const singleMeasurementsDataRecevied = (state, action) => {
  const { getMeasurements } = action;

  return {
    ...state,
    measurements: {
      ...state.measurements,
      [getMeasurements[0].metric]: getMeasurements,
    },
  };
};

const handlers = {
  [actions.GET_METRICS_DATA_RECEIVED]: getMetricsDataRecevied,
  [actions.SET_SELECTED_METRICS]: setSelectedMetrics,
  [actions.GET_MEASUREMENTS_DATA_RECEIVED]: singleMeasurementsDataRecevied,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];

  if (typeof handler === 'undefined') return state;

  return handler(state, action);
};
