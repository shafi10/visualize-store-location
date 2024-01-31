import {
  Page,
  Layout,
  Banner,
  Text,
  ExceptionList,
  VerticalStack,
  Button,
} from "@shopify/polaris";
import { useShopQuery } from "../hooks";
// import { NoteIcon } from "@shopify/polaris-icons";

export default function Documentation() {
  const { data: shopData } = useShopQuery({
    url: "/api/shop",
  });

  return (
    <Page title="Documentation" fullWidth>
      <Layout>
        <Layout.Section>
          <Button
            primary
            onClick={() => {
              const urlToOpen = `https://${shopData?.domain}/admin/themes/current/editor?
            addAppBlockId=746b8e04-a3e1-466d-9892-b16e17e619b7/store-locator`;
              window.open(urlToOpen, "_blank");
            }}
          >
            Activate app block
          </Button>
        </Layout.Section>
        <Layout.Section>
          <Banner title="Important">
            <Text variant="headingLg" as="h5">
              App blocks can be activate from the app home page or you can do it
              by your own.
            </Text>
            <br />
            <VerticalStack gap="3">
              <Text variant="headingLg" as="h5" color="critical">
                Copy this script and follow the steps:
              </Text>
              <div className="link-copy-pasting">
                <code>
                  &lt;script src="https://unpkg.com/leaflet/dist/leaflet.js"
                  defer="defer"&gt;&lt;/script&gt;
                </code>
              </div>

              <ExceptionList
                items={[
                  {
                    description:
                      "Go to Admin store > Online Store > Themes > Actions > Edit code",
                  },
                  {
                    description:
                      "Open theme.liquid file under the Layout folder.",
                  },
                  {
                    description:
                      "Inside the file search for </head>, the place the script and link above it.",
                  },
                ]}
              />
            </VerticalStack>
          </Banner>
        </Layout.Section>
        {/* <Layout.Section>
          <Card>
            <MediaCard
              title="Create highlight feature"
              description="Create the highlight feature for
              your app by selecting product."
            >
              <img
                alt=""
                width="100%"
                height="100%"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={create}
              />
            </MediaCard>
          </Card>
        </Layout.Section> */}
      </Layout>
    </Page>
  );
}
