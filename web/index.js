import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import shopify from "./shopify.js";
import GDPRWebhookHandlers from "./gdpr.js";
import {
  createStoreLocation,
  deleteStoreLocation,
  getAllStoreLocation,
  updateStoreLocation,
} from "./controller/storeLocation.js";
import { findBlockByType } from "./utils.js";

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/shop", async (_req, res) => {
  // createScript(_req, res);

  const response = await shopify.api.rest.Shop.all({
    session: res.locals.shopify.session,
  });

  // theme info
  // const themeInfo = await shopify.api.rest.Theme.all({
  //   session: res.locals.shopify.session,
  // });

  // const mainTheme = themeInfo.data.find((data) => data.role === "main");
  // const assetsInfo = await shopify.api.rest.Asset.all({
  //   session: res.locals.shopify.session,
  //   theme_id: mainTheme.id,
  //   asset: { key: "templates/product.json" },
  // });
  // const appInfo = JSON.parse(assetsInfo?.data[0]?.value);
  // const isActive = findBlockByType(
  //   appInfo,
  //   "shopify://apps/featureframe/blocks/feature_highlight/fa59bcff-47fd-4d8d-89b1-f3dd33564b6e"
  // );
  let shop = {
    id: response?.data[0]?.id,
    name: response.data[0]?.name,
    email: response.data[0]?.email,
    currencyCode: response.data[0]?.currency,
    domain: response?.data[0]?.domain,
    // assetsInfo: isActive,
  };

  res.status(200).send(shop);
});

app.get("/api/location-list", getAllStoreLocation);
app.post("/api/location-create", createStoreLocation);
app.delete("/api/location-delete/:id", deleteStoreLocation);
app.put("/api/location-update/:id", updateStoreLocation);

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);

// async function createScript(req, res) {
//   try {
//     const script_tag = new shopify.api.rest.ScriptTag({
//       session: res.locals.shopify.session,
//     });
//     script_tag.event = "onload";
//     script_tag.src = "https://unpkg.com/leaflet/dist/leaflet.js";
//     script_tag.display_scope = "online_store";
//     script_tag.cache = true;
//     await script_tag.save({
//       update: true,
//     });
//     console.log("🚀 ~ createScript ~ script_tag:", script_tag);
//     return true;
//   } catch (error) {
//     console.log("🚀 ~ createScript ~ error:", error);
//     return true;
//   }
// }
