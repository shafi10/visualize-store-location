import {
  IndexTable,
  LegacyCard,
  Pagination,
  useIndexResourceState,
} from "@shopify/polaris";
import React, { useState } from "react";
import { useUI } from "../../contexts/ui.context";
import { Spinners } from "./Spinner";

export function IndexTableData({
  itemList = [],
  rowMarkup,
  headings,
  itemsPerPage = 10,
  selectable = false,
  totalCount = 1,
  fetchList,
  resourceName = {
    singular: "customer",
    plural: "customers",
  },
  isLoading,
  isPagination = false,
  selectedResources = [],
  allResourcesSelected = false,
  handleSelectionChange = () => {},
}) {
  const { query, setQuery } = useUI();

  // Pagination state variables
  const [currentPage, setCurrentPage] = useState(1);
  const [usePagination, setUsePagination] = useState(false);
  const [usePrev, setUsePrev] = useState(false);

  const handlePrevious = () => {
    if (currentPage > 1) {
      const length = query?.offset.length;
      setCurrentPage((prev) => prev - 1);
      fetchList({
        limit: query?.limit,
        offset:
          currentPage - 1 === 1
            ? 0
            : usePrev
            ? query?.offset[length - 1]
            : query?.offset[length - 2],
      });
      if (usePrev) {
        query?.offset.splice(length - 1, 1);
      } else {
        query?.offset.splice(length - 2, 2);
      }
      setUsePrev(true);
      setQuery(query?.offset);
      setUsePagination(true);
    }
  };

  const handleNext = () => {
    const totalPages = Math?.ceil(totalCount / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      setQuery([...query?.offset, itemList?.[itemList?.length - 1]?.id]);
      fetchList({
        limit: query?.limit,
        offset: itemList?.[itemList?.length - 1]?.id,
      });
      setUsePagination(true);
    }
  };

  return (
    <>
      {isLoading && !usePagination ? (
        <Spinners />
      ) : (
        <>
          <LegacyCard>
            <IndexTable
              resourceName={resourceName}
              itemCount={rowMarkup?.length}
              selectable={selectable}
              headings={headings}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
            >
              {rowMarkup}
            </IndexTable>
          </LegacyCard>
          {totalCount > 10 && isPagination && (
            <div className="center__align content__margin_top">
              {isLoading && usePagination ? (
                <Spinners />
              ) : (
                <Pagination
                  hasPrevious={currentPage > 1}
                  onPrevious={handlePrevious}
                  hasNext={currentPage < Math.ceil(totalCount / itemsPerPage)}
                  onNext={handleNext}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
