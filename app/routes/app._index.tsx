import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";

import Pagination from "~/components/Pagination";
import ButtonLink from "~/components/ButtonLink";
import fetchData from "~/utils/fetchData";
import type { Surat, dataType } from "~/types/dataType";
import { sanitizeHTML } from "~/utils/sanitizeHTML";

// Loader data type untuk disambungin,disalurin terserah dah apa namanya ke komponen
type LoaderData = {
  suratUntukHalamanIni: Surat[];
  TOTAL_HALAMAN: number;
  TOTAL_SURAT: number;
  halamanAktif: number;
};

// Meta data halaman
export const meta: MetaFunction = () => {
  return [
    { title: "App | Qur'an Web" },
    { name: "description", content: "Qur'an App by Lucid Dreamworks Lucid Dreamworks Dev ✨." },
  ];
};

// Loader (server-side)
export async function loader({ request }: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const dataSuratLengkap: dataType = await fetchData();
  const daftarSurat = dataSuratLengkap.data;

  const TOTAL_SURAT = daftarSurat.length;
  const MAKSIMAL_SURAT_PER_HALAMAN = 10;
  const TOTAL_HALAMAN = Math.ceil(TOTAL_SURAT / MAKSIMAL_SURAT_PER_HALAMAN);

  let halamanAktif = parseInt(searchParams.get("page") || "1");

  if (isNaN(halamanAktif) || halamanAktif < 1) {
    halamanAktif = 1;
  } else if (halamanAktif > TOTAL_HALAMAN) {
    halamanAktif = TOTAL_HALAMAN;
  }

  const indexAwal = (halamanAktif - 1) * MAKSIMAL_SURAT_PER_HALAMAN;
  const indexAkhir = indexAwal + MAKSIMAL_SURAT_PER_HALAMAN;
  const suratUntukHalamanIni = daftarSurat.slice(indexAwal, indexAkhir);

  return {
    suratUntukHalamanIni,
    TOTAL_HALAMAN,
    TOTAL_SURAT,
    halamanAktif,
  };
}

// Komponen utama halaman
export default function App() {
  const { suratUntukHalamanIni, TOTAL_HALAMAN, TOTAL_SURAT, halamanAktif } = useLoaderData() as LoaderData;

  return (
    <div className="container font-size-text-md flex flex-col items-center pt-16 mt-4 mb-4 grow self-center">
      <h1 className="font-size-text-lg font-bold text-center">Total Surat di Al-Qur&apos;an: {TOTAL_SURAT}</h1>

      {suratUntukHalamanIni.map((surat: Surat) => (
        <div
          key={surat.nomor}
          className="card-surat flex flex-col w-4/5 max-w-[700px] p-4 mt-4 bg-white shadow-md rounded-md border border-gray-200"
        >
          <h2 className="font-size-text-lg font-semibold mb-2 text-center">
            {surat.nomor}. {surat.namaLatin}
          </h2>
          <p>Nama Arab: {surat.nama}</p>
          <p>Arti: {surat.arti}</p>
          <p>Jumlah Ayat: {surat.jumlahAyat}</p>
          <p>Tempat Turun: {surat.tempatTurun}</p>
          <div
            className="font-size-text-sm text-gray-600 mt-2 mb-2"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(surat.deskripsi) }}
          />

          <ButtonLink input="📖 Baca Surat" url={`app/${surat.nomor}`} isSelfCentered />
        </div>
      ))}

      <Pagination totalPage={TOTAL_HALAMAN} currentPage={halamanAktif} />
    </div>
  );
}
