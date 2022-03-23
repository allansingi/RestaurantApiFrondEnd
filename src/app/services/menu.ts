export interface Menu {
    id: number;
    menuName: string;
    menuDescription: string;
    menuPrice: number;
    menuStack: number;
    menuActive: boolean;
    startMenuPeriod: Date;
    endMenuPeriod: Date;
    imageUrl: string;
}