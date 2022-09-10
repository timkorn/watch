import Router from "next/router";
import axios, { AxiosError } from "axios";
axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;
const req = (method: "post" | "get", endpoint: string, body: any) => {
  if (method == "get") {
    return axios({
      method: method,
      url: endpoint,
      validateStatus: function (status) {
        if (status == 401) {
          Router.push("/login");
        }
        return status === 200;
      },
    });
  } else {
    return axios({
      method: method,
      url: endpoint,
      data: body,
      validateStatus: function (status) {
        if (status == 401) {
          Router.push("/login");
        }
        return status === 200;
      },
    });
  }
};

export default req;
