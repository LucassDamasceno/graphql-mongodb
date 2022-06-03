import { Reservation } from "./reservation";

export type Spectacle = {
  description: string;
  _id: number;
  name: string;
  reservationLimit: number;
  reservationPrice: number;
  reservations: Reservation[];
};
