import type { surahType } from "~/types/surahType";

export default async function FetchSurat(nomorSurat: number | string): Promise<surahType> {
  const URL = `${import.meta.env.VITE_API_SURAT}/${nomorSurat}`;
  if (!URL) throw new Error("URL tidak ada di environment");

  try {
    const res = await fetch(URL);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    throw new Error(`Gagal fetch surat: ${err}`);
  }
}
