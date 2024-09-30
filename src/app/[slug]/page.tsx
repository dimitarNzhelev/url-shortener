import { redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: { slug: string };
}) {
  const targetUrl = null;

  if (!targetUrl) {
    return (
      <main className="container m-auto flex justify-center px-4 py-8 text-center align-middle">
        <p className="text-xl font-semibold">URL not found</p>
      </main>
    );
  }

  redirect(targetUrl);
}
