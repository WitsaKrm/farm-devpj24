import API from "../../services/API/axios";

export async function SetModeNewStation(SET, URL, ID) {
  const setModenewStation = async () => {
    try {
      const res = await API.post(`${URL}/${ID}`);

    } catch (error) {
      console.error("Failed to fetch sensor:", error);
    }
  };
  await setModenewStation();
}


export function FetchMode (SET,URL,ID) {
  const fetchMode = async () => {
  try {
    const res = await API.get(`${URL}/${ID}`);
    SET(res.data.mode[0]);
  } catch (error) {
    console.error("Failed to fetch senser:", error);
  }
};
fetchMode()
}

export function SetMode (SET,URL,ID,newLevel,currentLevel) {
  const setMode = async () => {
  try {
    const res = await API.put(`${URL}/${ID}`);
    SET(res.data.mode[0]);
  } catch (error) {
    console.error("Failed to fetch senser:", error);
  }
};
setMode()
}