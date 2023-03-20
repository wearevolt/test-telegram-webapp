import * as uuid from "uuid";

const getDeviceId = () => {
  const deviceIdKeyName = "DEVICE_ID";
  const savedDeviceId = localStorage.getItem(deviceIdKeyName);

  if (!savedDeviceId) {
    const newDeviceId = uuid.v4();
    localStorage.setItem(deviceIdKeyName, newDeviceId);
    return newDeviceId;
  }
  return savedDeviceId;
};

export { getDeviceId };
