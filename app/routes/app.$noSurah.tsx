import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { redirect } from "react-router";

import fetchSurah from "~/utils/fetchSurah";
import fetchData from "~/utils/fetchData";
import type { surahType } from "~/types/surahType";
import type { dataType } from "~/types/dataType";

// Meta data halaman
export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Surat tidak ditemukan" }];

  const { surat } = data;
  return [
    { title: `${surat.namaLatin} | ${surat.nama} - Qur'an Web` },
    {
      name: "description",
      content: `Baca surat ${surat.namaLatin} dengan ${surat.jumlahAyat} ayat lengkap dengan teks Arab, Latin, dan terjemahan Indonesia.`,
    },
  ];
};

// Loader (server-side)
export async function loader({ params }: LoaderFunctionArgs) {
  const nomorSuratDariURL = params.noSurah;

  // Validasi parameter
  if (!nomorSuratDariURL) {
    throw redirect("/app");
  }

  const nomorSuratParsed = parseInt(nomorSuratDariURL);

  // Ambil total surat untuk validasi
  const dataSuratSemua: dataType = await fetchData();
  const TOTAL_SURAT = dataSuratSemua.data.length;

  // Cek apakah bukan angka, atau kurang dari 1, atau lebih dari total surat
  if (isNaN(nomorSuratParsed) || nomorSuratParsed < 1 || nomorSuratParsed > TOTAL_SURAT) {
    throw redirect("/app");
  }

  try {
    // Fetch data surat dari API
    const dataSurat: surahType = await fetchSurah(nomorSuratParsed);
    const surat = dataSurat.data;

    // Jika data tidak ditemukan
    if (!surat) {
      throw redirect("/app");
    }

    return { surat };
  } catch (error) {
    throw redirect("/app");
  }
}

// Komponen utama halaman detail surat
export default function AppSurah() {
  const { surat } = useLoaderData<typeof loader>();

  return (
    <div className="container flex flex-col items-center pt-16 mt-4 mb-4 grow self-center">
      {/* Judul surat */}
      <h1 className="text-3xl md:text-5xl pb-4 w-full text-center">
        {surat.namaLatin} | <span className="font-quran">{surat.nama}</span>
        <br />
        <br />
        {surat.jumlahAyat} Ayat
      </h1>

      {/* Daftar ayat */}
      <div className="w-4/5 max-w-[700px] mt-4 space-y-4">
        {/* Render ayat - ayat sesuai surat */}
        {surat.ayat.map((ayat) => (
          <div key={ayat.nomorAyat} className="p-4 border-t border-gray-400">
            <div className="flex items-start">
              <p className="nomor-ayat text-gray-500 text-md mr-2 mt-2 flex-shrink-0">{ayat.nomorAyat}.</p>
              <p
                className="font-quran antialiased text-3xl md:text-5xl leading-24 md:leading-36 flex-grow text-right"
                dir="rtl"
              >
                {ayat.teksArab}
              </p>
            </div>
            <p className="mb-4 text-base text-green-700 md:text-xl">{ayat.teksLatin}</p>
            <p className="text-base md:text-xl">{ayat.teksIndonesia}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
