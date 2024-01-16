import { useAuthenticatedFetch } from "./useAuthenticatedFetch";
import { useMemo } from "react";
import { useQuery, useMutation } from "react-query";
import { useUI } from "../contexts/ui.context";

export const useStoreLocation = ({
  url,
  fetchInit = {},
  reactQueryOptions,
}) => {
  const authenticatedFetch = useAuthenticatedFetch();
  const fetch = useMemo(() => {
    return async () => {
      const response = await authenticatedFetch(url, fetchInit);
      return response.json();
    };
  }, [url, JSON.stringify(fetchInit)]);

  return useQuery(url, fetch, {
    ...reactQueryOptions,
    onSuccess: (data) => {},
    refetchOnWindowFocus: false,
    // enabled: customStatus.length === 0,
  });
};

// export const useCreateCustomStatus = () => {
//   const { t } = useTranslation();
//   const fetch = useAuthenticatedFetch();
//   const { setCustomStatus, customStatus, setCloseModal, setToggleToast } =
//     useUI();

//   async function createStatus(status) {
//     return await fetch("/api/createstatus", {
//       method: "POST",
//       body: JSON.stringify(status),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }

//   return useMutation((status) => createStatus(status), {
//     onSuccess: async (data) => {
//       if (data.status === 500) {
//         setToggleToast({
//           active: true,
//           message: `${t("errors.error_status")}`,
//         });
//       } else {
//         const res = await data.json();
//         const statusInfo = [res?.response, ...customStatus];
//         setCustomStatus(statusInfo);
//         setCloseModal();
//         setToggleToast({
//           active: true,
//           message: `${t("success.status_created")}`,
//         });
//       }
//     },
//     refetchOnWindowFocus: false,
//   });
// };

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
