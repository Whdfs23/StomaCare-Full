export type MealTime = 'Pagi' | 'Siang' | 'Malam' | 'Camilan';

export interface FoodLog {
  id: string;
  userId: string;
  tanggal: string;
  waktu: MealTime;
  makanan: string;
  minuman?: string;
  porsi?: string;
  gejala: string[];
  nyeri: number;
  kondisi?: string;
  catatan?: string;
  createdAt: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'user';
}

export interface SymptomInfo {
  id: string;
  title: string;
  description: string;
  symptoms: string[];
  icon: string;
}
