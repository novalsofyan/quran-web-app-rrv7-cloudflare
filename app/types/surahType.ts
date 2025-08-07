export interface AudioMap {
  "01": string;
  "02": string;
  "03": string;
  "04": string;
  "05": string;
}

export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: AudioMap;
}

export interface SuratSelanjutnya {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
}

export type SuratSebelumnya =
  | boolean
  | {
      nomor: number;
      nama: string;
      namaLatin: string;
      jumlahAyat: number;
    };

export interface SuratDetail {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: AudioMap;
  ayat: Ayat[];
  suratSelanjutnya: SuratSelanjutnya;
  suratSebelumnya: SuratSebelumnya;
}

export interface surahType {
  code: number;
  message: string;
  data: SuratDetail;
}
