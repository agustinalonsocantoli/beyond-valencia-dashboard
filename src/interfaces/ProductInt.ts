import { string } from "yup";
import { ProductsEnumTypes } from "../shared/Types/ProductsEnumTypes";

export interface ProductInt {
    title?: string;
    type?: ProductsEnumTypes;
    description?: string;
    select?: string | string[];
    price?: {
        small: number;
        medium: number;
        normal?: number;
    }
}