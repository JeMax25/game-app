export interface ScreenShoot {
    count:    number;
    next:     null;
    previous: null;
    results:  Result[];
}

export interface Result {
    id:         number;
    image:      string;
    width:      number;
    height:     number;
    is_deleted: boolean;
}
