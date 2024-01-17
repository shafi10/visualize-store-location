import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useUI } from "../contexts/ui.context";

export const useStoreLocation = ({
  url,
  fetchInit = {},
  reactQueryOptions,
}) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const { setLocations } = useUI();
  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch(url, fetchInit);
      return response.json();
    };
  }, [url, JSON.stringify(fetchInit)]);

  return useQuery("store-location", fetch, {
    ...reactQueryOptions,
    onSuccess: async (data) => {
      setLocations(data);
    },
    refetchOnWindowFocus: false,
    // enabled: customStatus.length === 0,
  });
};

export const useCreateStoreLocation = () => {
  const fetch = useAuthenticatedFetch();
  const { setCloseModal, setToggleToast, setLocations } = useUI();
  const queryClient = useQueryClient();
  async function createLocation(location) {
    return await fetch("/api/location-create", {
      method: "POST",
      body: JSON.stringify(location),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return useMutation((location) => createLocation(location), {
    onSuccess: async (data) => {
      if (data.status === 500) {
        setToggleToast({
          active: true,
          message: "Something went wrong",
        });
      } else {
        queryClient.invalidateQueries("store-location");
        setCloseModal();
        setToggleToast({
          active: true,
          message: `Location created successfully`,
        });
      }
    },
    refetchOnWindowFocus: false,
  });
};

// export const useUpdateCustomStatus = () => {
//   const { t } = useTranslation();
//   const fetch = useAuthenticatedFetch();
//   const { setCustomStatus, customStatus, setCloseModal, setToggleToast } =
//     useUI();

//   async function updateStatus(status) {
//     return await fetch(`/api/updatestatus/${status?.id}`, {
//       method: "PATCH",
//       body: JSON.stringify(status),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }

//   return useMutation((status) => updateStatus(status), {
//     onSuccess: async (data, status) => {
//       if (data.status === 500) {
//         setToggleToast({
//           active: true,
//           message: `${t("errors.error_status")}`,
//         });
//       } else {
//         const statusInfo = replaceNewStatus(customStatus, status);
//         setCustomStatus(statusInfo);
//         setCloseModal();
//         setToggleToast({
//           active: true,
//           message: `${t("success.status_update")}`,
//         });
//       }
//     },
//     refetchOnWindowFocus: false,
//   });
// };

// export const useDeleteCustomStatus = () => {
//   const { t } = useTranslation();
//   const fetch = useAuthenticatedFetch();
//   const { setCustomStatus, customStatus, setToggleToast, setCloseModal } =
//     useUI();

//   async function deleteStatus(id) {
//     return await fetch(`/api/customstatus/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }

//   return useMutation((id) => deleteStatus(id), {
//     onSuccess: (data, id) => {
//       const statusInfo = customStatus.filter((info) => info.id !== id);
//       setCustomStatus(statusInfo);
//       setCloseModal();
//       setToggleToast({
//         active: true,
//         message: `${t("success.status_delete")}`,
//       });
//     },
//     refetchOnWindowFocus: false,
//   });
// };

// function replaceNewStatus(statusList, status) {
//   const index = statusList.findIndex((item) => item?.id === status?.id);
//   if (index !== -1) {
//     statusList[index] = status;
//   }
//   return statusList;
// }
