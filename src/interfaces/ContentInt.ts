enum TypeLanding {
    HOME = "home",
    EXPERIENCES = "experiences",
    DAYTRIPS = "daytrips",
    FOOD = "food"
}

export interface ContentInt {
    landing?: TypeLanding;
    link: string;
    img: string;
    imgW?: string;
    type: 'image' | "video";
    h3: string;
    p?: string;
    span?: string;
}