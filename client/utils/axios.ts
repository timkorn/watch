import Router from "next/router";
import axios, { AxiosError } from "axios";
import getCookie from "./getCookie";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API || "http://localhost:8080";
axios.defaults.withCredentials = true;
const req = (method: "post" | "get", endpoint: string, body: any) => {
  const token = getCookie("accessToken");
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
      headers: {
        Authorization: `Bearer ${token}`,
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};

export default req;
