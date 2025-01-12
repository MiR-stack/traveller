export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(request: Request) {
  const url = process.env.BASE_URL || "https://api.earthheavens.com";

  const { status } = await fetch(url, { cache: "no-cache" });

  return new Response(`status: ${status}`);
}
