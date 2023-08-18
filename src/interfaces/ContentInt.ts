import { LandingEnumTypes } from "../shared/Types/LadingEnumTypes";

export interface ContentInt {
    _id?: string;
    landing?: LandingEnumTypes;
    link: string;
    img: string;
    imgW?: string;
    type: 'image' | "video";
    h3: string;
    p?: string;
    span?: string;
}