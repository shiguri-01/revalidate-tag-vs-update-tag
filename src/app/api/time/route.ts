export async function GET() {
  return Response.json({
    time: new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
  });
}
