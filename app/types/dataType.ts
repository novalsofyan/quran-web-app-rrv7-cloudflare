export interface AudioFull {
  "01": string;
  "02": string;
  "03": string;
  "04": string;
  "05": string;
}

export interface Surat {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: AudioFull;
}

export interface dataType {
  code: number;
  message: string;
  data: Surat[];
}
