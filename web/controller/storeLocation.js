import shopify from "../shopify.js";
import { v4 as uuidv4 } from "uuid";

export const getAllStoreLocation = async (req, res) => {
  try {
    const locationList = await getLocationList(req, res);

    return res.status(200).json(locationList);
  } catch (error) {
    console.log(
      "🚀 ~ file: description.js:73 ~ descriptionController ~ err:",
      error
    );
    res.status(400).json({ error });
  }
};

export const createStoreLocation = async (req, res) => {
  try {
    const locationBody = {
      id: uuidv4(),
      ...req.body,
    };
    const locationList = await getLocationList(req, res);

    const locationObj = [locationBody, ...locationList];
    const metafield = new shopify.api.rest.Metafield({
      session: res.locals.shopify.session,
    });
    metafield.namespace = "bs_store_location";
    metafield.key = "bs_store_location_items";
    metafield.value = JSON.stringify(locationObj);
    metafield.type = "json";
    await metafield.save({
      update: true,
    });
    return res.status(200).json({
      message: "Location created successfully",
    });
  } catch (error) {
    console.log("🚀 ~ createStoreLocation ~ error:", error);
  }
};

async function getLocationList(req, res) {
  const shopMetafield = await shopify.api.rest.Metafield.all({
    session: res.locals.shopify.session,
  });

  const storeLocationMetadata = shopMetafield?.data?.find(
    (data) =>
      data.namespace === "bs_store_location" &&
      data.key === "bs_store_location_items"
  );

  const locationList = storeLocationMetadata
    ? JSON.parse(storeLocationMetadata.value)
    : [];
  return locationList;
}
