export const NEW_MEASUREMENT = `
  subscription newMeasurement {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;
