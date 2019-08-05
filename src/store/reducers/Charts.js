import * as actions from '../actions';

const initialState = {
  currentMeasurements: {},
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

const getMeasurementsDataRecevied = (state, action) => {
  const { getMeasurements } = action;

  return {
    ...state,
    measurements: {
      ...state.measurements,
      [getMeasurements[0].metric]: getMeasurements,
    },
  };
};

const getMultipleMeasurementsDataRecevied = (state, action) => {
  const { getMultipleMeasurements } = action;
  const measurementsByMetric = {};

  getMultipleMeasurements.forEach(measurements => {
    measurementsByMetric[measurements.metric] = measurements.measurements;
  });

  return {
    ...state,
    measurements: {
      ...state.measurements,
      ...measurementsByMetric,
    },
  };
};

const subscriptionNewMeasurementReceived = (state, action) => {
  const { newMeasurement } = action;
  const newSubAdded = state.measurements[newMeasurement.metric]
    ? [...state.measurements[newMeasurement.metric].slice(1), newMeasurement]
    : [newMeasurement];

  return {
    ...state,
    currentMeasurements: {
      ...state.currentMeasurements,
      [newMeasurement.metric]: newMeasurement,
    },
    measurements: {
      ...state.measurements,
      [newMeasurement.metric]: newSubAdded,
    },
  };
};

const handlers = {
  [actions.GET_METRICS_DATA_RECEIVED]: getMetricsDataRecevied,
  [actions.SET_SELECTED_METRICS]: setSelectedMetrics,
  [actions.GET_MEASUREMENTS_DATA_RECEIVED]: getMeasurementsDataRecevied,
  [actions.GET_MULTIPLE_MEASUREMENTS_DATA_RECEIVED]: getMultipleMeasurementsDataRecevied,
  [actions.SUBSCRIPTION_NEW_MEASUREMENT_RECEIVED]: subscriptionNewMeasurementReceived,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];

  if (typeof handler === 'undefined') return state;

  return handler(state, action);
};
