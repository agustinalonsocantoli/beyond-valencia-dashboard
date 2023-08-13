interface MultimediaInt {
    src: string;
    type: string;
}

interface OrdersGroupsInt {
    title: string;
    type: string;
    prices: PricesInt
    deapertureTime: string[];
}

interface PricesInt {
    adults: number;
    children: number | null;
}

export interface EventsInt {
    slug: string;
    title: string;
    subtitle: {
        label: string;
        text: string;
    }
    headline: string;
    description: string;
    information: string;
    multimedia: MultimediaInt[];
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
    eventDate: Date;
}