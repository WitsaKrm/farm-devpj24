import { useEffect } from "react";
import endpoint from "./axios";

export function APIdataUsers(setUsers, USERS_URL, setLoading) {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await endpoint.get(USERS_URL);
        setUsers(res.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setLoading(false); // Make sure to set loading to false even in case of an error
      }
    };

    fetchUsers();
  }, [setUsers, USERS_URL, setLoading]);
}

// export function UpdateUser({ userId, newDataGroup, setSucc, USERS_URL }) {
//   console.log("UpdateUser");
//   useEffect(() => {
//     const updateUserRequest = async () => {
//       try {
//         const res = await endpoint.put(`${USERS_URL}/${userId}`, newDataGroup);
//         // Assuming the endpoint URL should include the `userId` and the data to update
//         setSucc(true); // Set to true upon successful update
//       } catch (error) {
//         console.error("Failed to update user:", error);
//         setSucc(false); // Set to false in case of an error
//       }
//     };

//     updateUserRequest();
//   }, [userId, newDataGroup, USERS_URL, setSucc]);

//   // This component doesn't need to render anything, so you can return null.
//   return null;
// }

export function APIdeleteUser (USERS_URL, userID, selectedUser){
  useEffect(() => {
    const DeleteUser = async () => {
      if(userID === selectedUser.user_id){
        console.log(userID , selectedUser.user_id);
        // try {
        //   const res = await endpoint.delete(USERS_URL);
  
        // } catch (error) {
        //   console.error("Failed to fetch users:", error);
        // }
      }
    };

    DeleteUser();
  }, [USERS_URL, userID, selectedUser]);

}

export function GetUserById(SET, USER_URL, ID) {
  // useEffect(()=>{
    const fetchUser = async () => {
      console.log("fetchUser");
      try {
        const res = await endpoint.get(`${USER_URL}/${ID}`);
        SET(res.data.users);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    if (ID) {
      fetchUser();
    }
  // })

}