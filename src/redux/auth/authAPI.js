import axios from "axios";

export function createUser(user) {
  return axios.post("http://localhost:8080/users", user);
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;

    try {
      const response = await axios.get(
        `http://localhost:8080/user?email=` + email
      );
      const data = response.data;

      console.log(data);

      if (data.length) {
        if (password === data[0].password) {
          resolve({ data: data[0] });
        } else {
          reject({ message: "Incorrect password" });
        }
      } else {
        reject({ message: "User not found" });
      }
    } catch (error) {
      reject({ message: "Error fetching user data" });
    }
  });
}