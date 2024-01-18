import React from "react";
import { CalloutCard } from "@shopify/polaris";
import { useUI } from "../../contexts/ui.context";
// import { useDeleteCustomStatus } from "../../hooks";

export function DeleteLocation() {
  // const { mutate: deleteStatus } = useDeleteCustomStatus();
  const { modal } = useUI();
  return (
    <CalloutCard
      title={"Delete Location"}
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{
        content: `Delete`,
        onAction: () => {
          // deleteStatus(modal?.data?.id);
        },
      }}
    ></CalloutCard>
  );
}
