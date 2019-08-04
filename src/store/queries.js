export const url = 'https://react.eogresources.com/graphql';

export const HEARTBEAT = `
  query heartBeat {
    heartBeat
  }
`;

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
  query getMultipleMeasurements ($input: MeasurementQuery) {
    getMultipleMeasurements(input: $input) {
      metric
      at
      value
      unit
    }
  }
`;

/*
query getMetrics {
  getMetrics
}

{
  "data": {
    "getMetrics": [
      "tubingPressure",
      "casingPressure",
      "oilTemp",
      "flareTemp",
      "waterTemp",
      "injValveOpen"
    ]
  }
}

***
// NOT NEEDED WITH SUB?
query getLastKnownMeasurement ($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName) {
    metric
    at
    value
  	unit
  }
}

{
  "metricName": "tubingPressure"
}

{
  "data": {
    "getLastKnownMeasurement": {
      "metric": "tubingPressure",
      "at": 1564511829863,
      "value": 1072.67,
      "unit": "PSI"
    }
  }
}

***

query getMeasurements ($input: MeasurementQuery) {
  getMeasurements(input: $input) {
    metric
    at
    value
  	unit
  }
}

{
  "metricName": "tubingPressure"
  "after": Date.now() - (30 * 60 * 1000); // min * sec * milli
  "before": Date.now();
}

***

query getMultipleMeasurements ($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    at
    value
  	unit
  }
}

[
  {
    "metricName": "tubingPressure"
    "after": Date.now() - (30 * 60 * 1000); // min * sec * milli
    "before": Date.now();
  },
  {
    "metricName": "tubingPressure"
    "after": Date.now() - (30 * 60 * 1000); // min * sec * milli
    "before": Date.now();
  }
]
*/
