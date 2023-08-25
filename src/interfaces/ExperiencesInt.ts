interface MultimediaTypes {
    src: string;
    type: string;
}

export interface OrdersGroupsInt {
    title: string;
    type: string;
    prices: PricesInt
    deapertureTime: string[];
}

export interface PricesInt {
    adults: number;
    children: number | null;
}

export interface ExperiencesInt {
    _id?: string;
    slug: string;
    title: string;
    subtitle: {
        label: string;
        text: string;
    }
    headline: string;
    description: string;
    information: string;
    multimedia: MultimediaTypes[];
    highlights: string[];
    details: {
        age: string;
        duration: string;
        ticket: string;
        meetengPoint: {
            link: string,
            label: string,
        };
        language: string;
        accessibility: string;
        mobility: string;
        availably: string;
    };
    included:
        {
            text: string;
            state: boolean;
        }[] | null;
    takeWithYou: string[];
    groups: OrdersGroupsInt[];
    policies: string;
    conditions: string;
    published: boolean;
}