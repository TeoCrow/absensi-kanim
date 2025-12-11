import { router } from "@/router";
import { CompressionPlugin, RPCHandler } from "@orpc/server/fetch";
import { BatchHandlerPlugin, SimpleCsrfProtectionHandlerPlugin } from "@orpc/server/plugins";

const handler = new RPCHandler(router, {
  strictGetMethodPluginEnabled: true,
  plugins: [new CompressionPlugin(), new BatchHandlerPlugin(), new SimpleCsrfProtectionHandlerPlugin()],
});

async function handleRequest(request: Request) {
  const { response } = await handler.handle(request, {
    prefix: "/api/rpc",
    context: {}, // Provide initial context if needed
  });

  return response ?? new Response("Not found", { status: 404 });
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
