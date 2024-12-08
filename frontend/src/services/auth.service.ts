import {ILoginRequest, LoginResponse} from "../types";
import apiInstance from "./api.service";
import {AxiosResponse} from "axios";

class AuthService {
  login(data: ILoginRequest): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      apiInstance.post("/login", data)
        .then((res: AxiosResponse<LoginResponse>) => {
          resolve(res.data);
        })
        .catch(err => reject(err));
    })
  }
}

const authService = new AuthService();
export default authService;
