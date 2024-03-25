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
import { useState } from "react";
// import { NoteIcon } from "@shopify/polaris-icons";

export default function Documentation() {
  const { data: shopData } = useShopQuery({
    url: "/api/shop",
  });

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(
        `<script src="https://unpkg.com/leaflet/dist/leaflet.js" defer="defer"></script>`
      );
      setIsCopied(true);

      // Reset the "copied" state after a brief period
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (error) {
      console.error("Unable to copy to clipboard:", error);
    }
  };

  return (
    <Page title="Documentation" fullWidth>
      <Layout>
        <Layout.Section>
          <Button
            primary
            onClick={() => {
              const urlToOpen = `https://${shopData?.domain}/admin/themes/current/editor?
            addAppBlockId=b4b1d6cf-9574-497e-bd89-d6fd149881f9/store-locator`;
              window.open(urlToOpen, "_blank");
            }}
          >
            Activate app block
          </Button>
        </Layout.Section>
        <Layout.Section>
          <Banner title="Important">
            <Text variant="headingLg" as="h5">
              App blocks can be activate by clicking activate app block or you
              can do it by your own.
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
              <div>
                <button onClick={handleCopyClick}>
                  {isCopied ? "Copied!" : "Copy to Clipboard"}
                </button>
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
                      "Inside the file search for </head>, then place the script above the </head>.",
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
