export default {
  fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.bitcoinbaltics.com") {
      url.hostname = "bitcoinbaltics.com";
      url.protocol = "https:";
      return Response.redirect(url.href, 301);
    }
    return env.ASSETS.fetch(request);
  },
};
