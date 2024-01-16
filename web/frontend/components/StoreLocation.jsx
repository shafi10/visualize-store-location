import {
  LegacyCard,
  IndexTable,
  Text,
  Icon,
  HorizontalStack,
} from "@shopify/polaris";
import { useUI } from "../contexts/ui.context";
import { EditMajor, DeleteMajor } from "@shopify/polaris-icons";
import { useStoreLocation } from "../hooks/useStoreLocation";
import { IndexTableData } from "./ui/IndexTable";

export function StoreLocation() {
  const { isLoading, data } = useStoreLocation({
    url: "/api/customstatus",
  });

  const { setOpenModal } = useUI();

  const rowMarkup =
    data?.map((info, index) => (
      <IndexTable.Row id={index} key={index} position={index}>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {info?.title}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text alignment="center" as="span">
            {/* <Icons info={info} /> */}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text alignment="end" as="span">
            <HorizontalStack gap="4" align="end">
              <div
                className="cursor_pointer"
                onClick={() =>
                  setOpenModal({
                    view: "DELETE_STATUS",
                    isOpen: true,
                    data: {
                      title: info?.title,
                      id: info?.id,
                    },
                  })
                }
              >
                <Icon source={DeleteMajor} color="critical" />
              </div>
              <div
                className="cursor_pointer"
                onClick={() =>
                  setOpenModal({
                    view: "CREATE_STATUS",
                    isOpen: true,
                    data: {
                      title: `Update Location Information`,
                      status: info,
                    },
                  })
                }
              >
                <Icon source={EditMajor} color="highlight" />
              </div>
            </HorizontalStack>
          </Text>
        </IndexTable.Cell>
      </IndexTable.Row>
    )) || [];

  const headings = [
    { title: "Location Title" },
    { title: "Latitude", alignment: "center" },
    { title: "longitude", alignment: "center" },
    { title: "Others Information" },
  ];

  const resourceName = {
    singular: "Location",
    plural: "Locations",
  };

  return (
    <LegacyCard.Section>
      <IndexTableData
        rowMarkup={rowMarkup}
        headings={headings}
        isLoading={isLoading}
        resourceName={resourceName}
      />
    </LegacyCard.Section>
  );
}
