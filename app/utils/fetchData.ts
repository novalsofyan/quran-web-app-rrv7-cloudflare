import type { dataType } from "~/types/dataType";

// Fungsi ambil data dari API surat
export default async function fetchData(): Promise<dataType> {
  const URL = import.meta.env.VITE_API_SURAT;
  if (!URL) throw new Error("URL tidak ada di environment");

  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    throw new Error(`Gagal fetch semua surat: ${err}`);
  }
}
