
import API from "../../services/API/axios";

export function FetchDevices(SET,URL) {
    const fetchNodes = async () => {
        try {
          const res = await API.get(URL);
          SET(res.data.nodes);
        } catch (error) {
          console.error("Failed to fetch nodes:", error);
        }
      };
      fetchNodes()
}
export function FetchDevicesByUid(SET,URL,ID) {
    const fetchNodes = async () => {
        try {
          const res = await API.get(`${URL}/${ID}`);
          SET(res.data.devices);
        } catch (error) {
          console.error("Failed to fetch nodes:", error);
        }
      };
      fetchNodes()
}
export function FetchSensers (SET,URL,ID) {
    const fetchSensers = async () => {
    try {
      const res = await API.get(`${URL}/${ID}`);
      SET(res.data.senser || []);
    } catch (error) {
      console.error("Failed to fetch senser:", error);
    }
  };
  fetchSensers()
}
export function FetchChart (SET,URL,ID) {
    const fetchChart = async () => {
    try {
      const res = await API.get(`${URL}/${ID}`);
      SET(res.data.chart || []);
    } catch (error) {
      console.error("Failed to fetch senser:", error);
    }
  };
  fetchChart()
}
export function FetchOneChart (SET,URL,data,ID) {
    const fetchOneChart = async () => {
    try {
      const res = await API.get(`${URL}/${ID}/${data}`);
      SET(res.data.oneChart || []);
    } catch (error) {
      console.error("Failed to fetch senser:", error);
    }
  };
  fetchOneChart()
}

