import test from "node:test";
import assert from "node:assert/strict";
import worker from "../worker.mjs";
test("www redirects preserve paths and query parameters", async () => {
  for (const path of ["/", "/about/?mode=dark&view=community", "/llms.txt"]) {
    const response = await worker.fetch(new Request("https://www.bitcoinbaltics.com" + path), {});
    assert.equal(response.status, 301);
    assert.equal(response.headers.get("location"), "https://bitcoinbaltics.com" + path);
  }
});
test("canonical domain serves assets without a redirect loop", async () => {
  const request = new Request("https://bitcoinbaltics.com/about/");
  const response = await worker.fetch(request, { ASSETS: { fetch(received) {
    assert.equal(received, request);
    return new Response("About");
  }}});
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "About");
});
