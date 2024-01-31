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

export default function HomePage() {
  const { setOpenModal } = useUI();

  return (
    <Page fullWidth>
      <TitleBar title={"Store location information"} primaryAction={null} />
      <VerticalStack gap="4">
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
