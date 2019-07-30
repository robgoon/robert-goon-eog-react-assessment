export const GET_METRICS = `
  query getMetrics {
    getMetrics
  }
`;

export const GET_LAST_KNOWN_MEASUREMENT = `
  query getLastKnownMeasurement ($metricName: String!) {
    getLastKnownMeasurement(metricName: $metricName) {
      metric
      at
      value
      unit
    }
  }
`;

export const GET_MEASUREMENTS = `
  query getMeasurements ($input: MeasurementQuery) {
    getMeasurements(input: $input) {
      metric
      at
      value
      unit
    }
  }
`;

export const GET_MULTIPLE_MEASUREMENTS = `
  query getMultipleMeasurements ($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      at
      value
      unit
    }
  }
`;
