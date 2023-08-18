import { LandingEnumTypes } from "../shared/Types/LadingEnumTypes";

export interface MultimediaInt {
    _id?: string;
    navigate?: string;
    src: string;
    h3?: string;
    p?: string;
    span?: string;
    type: 'image' | "video";
    landing?: LandingEnumTypes;
}