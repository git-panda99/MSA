export class EventVideo {
    id: number;
    user_id: number;
    category_id: number;
    title: string;
    posterUrl: string;
    description: string;
    price: number;
    beginDate: Date;
    endDate: Date;
    type: string;
    source: string;
    videoUrl: string;
    tickets: string; //to add array later
    ended: boolean;
}