enum TypeLanding {
    HOME = "home",
    EXPERIENCES = "experiences",
    DAYTRIPS = "daytrips",
    FOOD = "food"
}

export interface MultimediaInt {
    navigate?: string;
    src: string;
    h3?: string;
    p?: string;
    span?: string;
    type: 'image' | "video";
    landing?: TypeLanding;
}