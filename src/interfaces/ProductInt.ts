enum TypeProductEnum {
    "hours",
    "allday",
    "days",
    "longer"
}

export interface ProductInt {
    title: string;
    type: TypeProductEnum;
    description: string;
    select: any;
    price: {
        small: number;
        medium: number;
        normal?: number;
    }
}