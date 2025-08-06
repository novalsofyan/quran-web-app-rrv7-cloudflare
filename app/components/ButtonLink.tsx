import { Link } from "react-router";

interface IInput {
  input: string;
  url: string;
  isSelfCentered?: boolean;
  isBlank?: boolean;
}

export default function ButtonLink({ input, url, isSelfCentered, isBlank }: IInput) {
  return (
    <Link
      className={`${isSelfCentered ? "self-center" : "self-start"}`}
      to={url}
      target={isBlank ? "_blank" : "_self"}
      rel="noopener noreferrer"
    >
      <button className="button select-none">{input}</button>
    </Link>
  );
}
