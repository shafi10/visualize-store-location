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

export const useUpdateStoreLocations = () => {
  const fetch = useAuthenticatedFetch();
  const queryClient = useQueryClient();
  const { setCloseModal, setToggleToast } = useUI();

  async function updateLocation(status) {
    return await fetch(`/api/location-update/${status?.id}`, {
      method: "PUT",
      body: JSON.stringify(status),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return useMutation((status) => updateLocation(status), {
    onSuccess: async (data, status) => {
      if (data.status === 500) {
        setToggleToast({
          active: true,
          message: `Something went wrong`,
        });
      } else {
        queryClient.invalidateQueries("store-location");
        setCloseModal();
        setToggleToast({
          active: true,
          message: `Location successfully updated`,
        });
      }
    },
    refetchOnWindowFocus: false,
  });
};

export const useDeleteCustomStatus = () => {
  const fetch = useAuthenticatedFetch();
  const { setToggleToast, setCloseModal, locations, setLocations } = useUI();

  async function deleteLocation(id) {
    return await fetch(`/api/location-delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return useMutation((id) => deleteLocation(id), {
    onSuccess: (data, id) => {
      const updatedLocations = locations.filter((info) => info.id !== id);
      setLocations(updatedLocations);
      setCloseModal();
      setToggleToast({
        active: true,
        message: `Location deleted successfully`,
      });
    },
    refetchOnWindowFocus: false,
  });
};

// function replaceNewStatus(statusList, status) {
//   const index = statusList.findIndex((item) => item?.id === status?.id);
//   if (index !== -1) {
//     statusList[index] = status;
//   }
//   return statusList;
// }
