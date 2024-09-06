import { ApiResponse } from "@/types/apiResponse";
import { ThemePark } from "@/types/themPark";
import axios, { AxiosResponse } from "axios";

const jsonFilePath = "/data/theme-parks.json";

export const getAllThemeParks = async (): Promise<ApiResponse<ThemePark[]>> => {
  try {
    const response: AxiosResponse<ThemePark[]> = await axios.get(jsonFilePath);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};

export const getThemeParkById = async (
  id: number
): Promise<ApiResponse<ThemePark | null>> => {
  try {
    const response: ApiResponse<ThemePark[]> = await getAllThemeParks();
    const findThemePark =
      response.data.find((themePark) => themePark.id === id) || null;
    return {
      data: findThemePark,
      status: response.status,
    };
  } catch (error) {
    console.error("Error fetching theme park by ID:", error);
    throw error;
  }
};
