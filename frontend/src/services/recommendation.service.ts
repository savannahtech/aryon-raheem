import apiInstance from "./api.service";
import {AxiosResponse} from "axios";
import {RecommendationsDataResponse, RecommendationsFilter, SuccessResponse} from "../types";

class RecommendationService {
  getRecommendations(filter: RecommendationsFilter = {}): Promise<RecommendationsDataResponse> {
    return new Promise((resolve, reject) => {
      apiInstance.get("/recommendations" + (filter.archive ? "/archive" : ""), {
        params: {
          limit: filter.limit ?? 20,
          search: filter.search,
          tags: !!filter.tags && filter.tags.length > 0 ? filter.tags.join(",") : null,
          cursor: filter.cursor,
        }
      })
        .then((res: AxiosResponse<RecommendationsDataResponse>) => {
          resolve(res.data);
        })
        .catch(err => reject(err));
    })
  }

  archive(id: string) {
    return new Promise((resolve, reject) => {
      apiInstance.post(`/recommendations/${id}/archive`)
        .then((res: AxiosResponse<SuccessResponse>) => {
          resolve(res.data);
        })
        .catch(err => reject(err));
    })
  }

  unarchive(id: string) {
    return new Promise((resolve, reject) => {
      apiInstance.post(`/recommendations/${id}/unarchive`)
        .then((res: AxiosResponse<SuccessResponse>) => {
          resolve(res.data);
        })
        .catch(err => reject(err));
    })
  }
}

const recommendationService = new RecommendationService();
export default recommendationService;
