export const getDevices = (schema, request) => {
  const { deviceId } = request.requestBody;
  return schema.devices.findBy({ deviceId });
};

export const deviceData = [
  {
    id: "123",
    deviceId: "device1",
    deviceName: "Device A",
    lastSynced: "8",
    meters: [
      {
        count: "67",
        measure: "Average bpm",
      },
      {
        count: "9,250",
        measure: "/10,000",
      },
    ],
  },
];
