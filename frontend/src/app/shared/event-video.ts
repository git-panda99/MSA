export class EventVideo {
    event_id: number;
    user_id: number;
    category_id: number;
    title: string;
    poster_url: string;
    description: string;
    price: number;
    begin_date: Date;
    end_date: Date;
    type: string;
    source: string;
    video_url: string;
    tickets: string; //to add array later
    ended: boolean;
}