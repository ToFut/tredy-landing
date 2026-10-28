import { llmsFullText } from "@/lib/llms";

export function GET() {
  return new Response(llmsFullText(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
