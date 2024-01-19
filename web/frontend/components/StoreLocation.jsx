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
  const { isLoading } = useStoreLocation({
    url: "/api/location-list",
  });

  const { setOpenModal, locations } = useUI();

  const rowMarkup =
    locations?.map((info, index) => (
      <IndexTable.Row id={index} key={index} position={index}>
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {info?.title}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text alignment="center" as="span">
            {info?.latitude}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text alignment="center" as="span">
            {info?.longitude}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span">{info?.othersInfo}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Text alignment="end" as="span">
            <HorizontalStack gap="4" align="end">
              <div
                className="cursor_pointer"
                onClick={() =>
                  setOpenModal({
                    view: "DELETE_LOCATION",
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
                    view: "CREATE_STORE",
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
    { title: "Location" },
    { title: "Latitude", alignment: "center" },
    { title: "longitude", alignment: "center" },
    { title: "Map Information" },
    { title: "Actions", alignment: "end" },
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
