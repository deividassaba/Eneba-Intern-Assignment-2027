
export interface Product {
  id: number;
  title: string;
  price: string;
  img_src: string;
  region: string;
  platform: string;
  offers?: ProductOffer[];
}

export interface Order{
  id: number
  price: number
  products: ProductOffer[]
  date: string,
  status: string
}
export interface ProductOffer{
  product_id : number
  title: string;
  price: number;
  img_src: string;
  region: string;
  platform: string;
  offer_id : number
  seller_name: string;
  seller_url: string;
  seller_img_src: string;
  product_key: string | null;
  available? : boolean
}
export interface Equipment {
  id: number;
  name: string;
}
export interface RoomFilters {
  minCapacity?: number;
  floor?: number;
  equipment?: number[];
  isActive?: boolean;
}
export interface ReservationFilters {
  userId?: number;
  roomId?: number;
  status?: ReservationStatus;
  fromDate?: string;
  toDate?: string;
}
export interface User {
  id: number;
  email: string;
}
export interface Room {
  id:number;
  name: string;
  capacity: number;
  floor: number;
  equipment: string[];
  status: string;
  reservations? : Reservation[]
}
export interface Reservation {
  id: number;
  room: string;
  organizer: string;
  title: string;
  startDate: string;
  endDate: string;
  attendees: number;
  status: ReservationStatus;
};
export interface ReservationRequest {
  roomId: number;
  organizerId: number;
  title: string;
  startDate: string;
  endDate: string;
  attendees: number;
};
export interface RegisterRequest {
  email: string;
  password: string;
};
export interface LoginRequest {
  email: string;
  password: string;
};
export type ReservationStatus = 'Booked' | 'Completed' | 'Cancelled' | 'Active';



export interface AuthContextType {
  token: string | null;
  email: string | null;
  loading: boolean;
  logout: () => void;
  login: (data: LoginRequest) => Promise<void> 
}