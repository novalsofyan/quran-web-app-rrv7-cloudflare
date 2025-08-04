import { Link } from "react-router";
import ButtonLink from "./ButtonLink";

export default function Hero() {
  return (
    <div className="max-w-[1920px] flex flex-col justify-center items-center gap-4 md:flex-row md:w-[90%] md:gap-0">
      <div className="flex flex-col items-center md:justify-center md:w-[80%]">
        <img
          className="w-[230px] h-[auto] md:w-[300px] md:h-[auto] lg:w-[400px] lg:h-[auto] select-none"
          src="/img/quran-logo.svg"
          alt="Qur'an Logo"
          loading="lazy"
          draggable="false"
        />
        <p className="text-md text-gray-500 pt-4">
          Logo &quot;Qur&apos;an Kareem&quot; by{" "}
          <Link
            to={"https://commons.wikimedia.org/wiki/File:Quran_Kareem_logo.png"}
            target="_blank"
            rel="noopener noreferrer"
            className="link-text text-xs"
          >
            محمد الحراق
          </Link>
        </p>
      </div>
      <div className="flex flex-col items-center text-justify px-4 md:text-2xl">
        <p>
          Temukan kemudahan membaca dan memahami Al-Qur&apos;an. Aplikasi ini hadir untuk membantumu menjelajahi
          ayat-ayat suci, di mana pun dan kapan pun kamu inginkan.
        </p>
        <ButtonLink input="Mulai Baca" url={"/quran-apps?page=1"} isSelfCentered />
      </div>
    </div>
  );
}
