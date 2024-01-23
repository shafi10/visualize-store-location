import {
  Page,
  Layout,
  Banner,
  Text,
  ExceptionList,
  VerticalStack,
} from "@shopify/polaris";
// import { NoteIcon } from "@shopify/polaris-icons";

export default function Documentation() {
  return (
    <Page title="Documentation" fullWidth>
      <Layout>
        <Layout.Section>
          <Banner title="Important">
            <Text variant="headingLg" as="h5">
              App blocks can be activate from the app home page or you can do it
              by your own.
            </Text>
            <br />
            <VerticalStack gap="3">
              <Text variant="headingLg" as="h5" color="critical">
                Copy this link, script and follow the steps:
              </Text>
              <div className="link-copy-pasting">
                <code>
                  &lt;link rel="stylesheet"
                  href="https://unpkg.com/leaflet/dist/leaflet.css"&gt;
                </code>

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
