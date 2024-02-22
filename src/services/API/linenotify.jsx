// import API from "../../services/API/axios";

export async function notifyRegis(userId) {
  try {
    console.log('on notifyRegis userId: = ' ,userId);

    const clientId = 'PvjrBLwlp118pmtfbi8Oii';
    const engine = 'https://powerful-crab-khakis.cyclic.app';
    
    const userID = userId;

    const urlAuth = `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${engine}/line/redirect&scope=notify&state=${userID}`;

    // Open the Line Notify authorization URL in a new window
    window.open(urlAuth, '_blank');

    // If your backend registration logic requires an API call, you can include it here
    // const response = await API.post(URL, { urlAuth });
    // console.log('Line Notify registration successful:', response.data);
  } catch (error) {
    console.error('Error registering Line Notify:', error.message);
    throw error; // Re-throw the error for further handling if needed
  }
}
