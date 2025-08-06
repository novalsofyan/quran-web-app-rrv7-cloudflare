import ButtonLink from "~/components/ButtonLink";

export default function NotFound() {
  return (
    <main className="pt-16 px-4 grow flex flex-col justify-center items-center box-border">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">404 - Page Not Found</h1>
      <p className="text-base text-gray-700 text-center mb-4">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <ButtonLink input="Back to Home" url="/" isSelfCentered />
    </main>
  );
}
