import {
  Page,
  Layout,
  LegacyCard,
  Button,
  Banner,
  VerticalStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useUI } from "../contexts/ui.context";
import { StoreLocation } from "../components/StoreLocation";
import { useShopQuery } from "../hooks";
import { useState } from "react";

export default function HomePage() {
  const [appIsActive, setAppIsActive] = useState(true);
  const { setOpenModal } = useUI();
  const { data: shopData, isLoading: isShopLoading } = useShopQuery({
    url: "/api/shop",
  });
  return (
    <Page fullWidth>
      <TitleBar title={"Store location information"} primaryAction={null} />
      <VerticalStack gap="4">
        {/* {shopData?.assetsInfo == null && appIsActive && !isShopLoading && (
          <Banner
            title="App extension preview unavailable activate the app to view the preview."
            status="warning"
            action={{
              content: "Activate",
              onAction: () => {
                setAppIsActive(false);
                const urlToOpen = `https://${shopData?.domain}/admin/themes/current/editor?template=product&
                  addAppBlockId=fa59bcff-47fd-4d8d-89b1-f3dd33564b6e/feature_highlight`;
                window.open(urlToOpen, "_blank");
              },
            }}
            secondaryAction={{
              content: "I will do it!",
              onAction: () => {
                setAppIsActive(false);
              },
            }}
            onDismiss={() => {
              setAppIsActive(false);
            }}
          ></Banner>
        )} */}
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <div className="space__to_end">
                <Button
                  primary
                  onClick={() =>
                    setOpenModal({
                      view: "VIEW_LOCATION",
                      isOpen: true,
                      data: {
                        title: `A visual journey for store locations`,
                      },
                    })
                  }
                >
                  View location map
                </Button>
                <Button
                  primary
                  onClick={() =>
                    setOpenModal({
                      view: "CREATE_STORE",
                      isOpen: true,
                      data: {
                        title: `Create store location`,
                      },
                    })
                  }
                >
                  Create Location
                </Button>
              </div>
              <StoreLocation />
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </VerticalStack>
    </Page>
  );
}
