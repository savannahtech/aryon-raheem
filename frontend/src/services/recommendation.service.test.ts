import apiInstance from "./api.service";
import recommendationService from "./recommendation.service";
import {AxiosRequestHeaders, AxiosResponse} from "axios";
import {RecommendationsDataResponse, RecommendationsFilter, SuccessResponse} from "../types";

jest.mock("./api.service");

describe("RecommendationService", () => {
  const mockedGet = jest.spyOn(apiInstance, "get");
  const mockedPost = jest.spyOn(apiInstance, "post");

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getRecommendations", () => {
    it("should fetch recommendations successfully", async () => {
      const mockResponse: AxiosResponse<RecommendationsDataResponse> = {
        data: {
          data: [], pagination: {
            cursor: {
              next: "",
            },
            totalItems: 0,
          }
        },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders
        },
      };

      mockedGet.mockResolvedValue(mockResponse);

      const filter: RecommendationsFilter = {limit: 10, search: "test"};
      const result = await recommendationService.getRecommendations(filter);

      expect(mockedGet).toHaveBeenCalledWith("/recommendations", {
        params: {
          limit: 10,
          search: "test",
          tags: null,
          cursor: undefined,
        },
      });
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle API errors when fetching recommendations", async () => {
      mockedGet.mockRejectedValue(new Error("API Error"));

      await expect(recommendationService.getRecommendations()).rejects.toThrow(
        "API Error"
      );
      expect(mockedGet).toHaveBeenCalledWith("/recommendations", {
        params: {
          limit: 20,
          search: undefined,
          tags: null,
          cursor: undefined,
        },
      });
    });
  });

  describe("archive", () => {
    it("should archive a recommendation successfully", async () => {
      const mockResponse: AxiosResponse<SuccessResponse> = {
        data: {success: true},
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders
        },
      };

      mockedPost.mockResolvedValue(mockResponse);

      const result = await recommendationService.archive("123");

      expect(mockedPost).toHaveBeenCalledWith("/recommendations/123/archive");
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle API errors when archiving a recommendation", async () => {
      mockedPost.mockRejectedValue(new Error("API Error"));

      await expect(recommendationService.archive("123")).rejects.toThrow(
        "API Error"
      );
      expect(mockedPost).toHaveBeenCalledWith("/recommendations/123/archive");
    });
  });

  describe("unarchive", () => {
    it("should unarchive a recommendation successfully", async () => {
      const mockResponse: AxiosResponse<SuccessResponse> = {
        data: {success: true},
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders
        },
      };

      mockedPost.mockResolvedValue(mockResponse);

      const result = await recommendationService.unarchive("123");

      expect(mockedPost).toHaveBeenCalledWith("/recommendations/123/unarchive");
      expect(result).toEqual(mockResponse.data);
    });

    it("should handle API errors when unarchiving a recommendation", async () => {
      mockedPost.mockRejectedValue(new Error("API Error"));

      await expect(recommendationService.unarchive("123")).rejects.toThrow(
        "API Error"
      );
      expect(mockedPost).toHaveBeenCalledWith("/recommendations/123/unarchive");
    });
  });
});
