import { ApiResponse } from "@/types/apiResponse";
import { Product } from "@/types/product";
import axios, { AxiosResponse } from "axios";

const jsonFilePath = "/data/products.json";

export const getAllProducts = async (): Promise<ApiResponse<Product[]>> => {
  try {
    const response: AxiosResponse<Product[]> = await axios.get(jsonFilePath);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (
  id: number
): Promise<ApiResponse<Product | null>> => {
  try {
    const response: ApiResponse<Product[]> = await getAllProducts();
    const product = response.data.find((product) => product.id === id) || null;
    return {
      data: product,
      status: response.status,
    };
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};

export const getProductByCategory = async (
  category: string
): Promise<ApiResponse<Product[] | null>> => {
  try {
    const response: ApiResponse<Product[]> = await getAllProducts();

    const products = response.data.filter(
      (product) => product.category === category
    );

    return {
      data: products.length > 0 ? products : null,
      status: response.status,
    };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};
