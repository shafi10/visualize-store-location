import React, { useCallback, useEffect, useState } from "react";
import { FormLayout, Button, Form } from "@shopify/polaris";
import { useUI } from "../../contexts/ui.context";
import { InputField } from "../ui/InputField";
import {
  useCreateStoreLocation,
  useUpdateStoreLocations,
} from "../../hooks/useStoreLocation";

export function CreateStore() {
  const { modal } = useUI();
  const { mutate: createLocation, isError } = useCreateStoreLocation();
  const { mutate: updateLocation, isError: isEditError } =
    useUpdateStoreLocations();
  const [formData, setFormData] = useState({
    title: "",
    latitude: "",
    longitude: "",
    othersInfo: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    latitude: "",
    longitude: "",
    othersInfo: "",
  });

  const statusId = modal?.data?.status?.id;

  useEffect(() => {
    if (statusId) {
      setFormData(modal?.data?.status);
    }
  }, [statusId]);

  function validateLatitude(latitude) {
    // Latitude ranges from -90 to 90
    return parseFloat(latitude) >= -90 && parseFloat(latitude) <= 90;
  }

  function validateLongitude(longitude) {
    // Longitude ranges from -180 to 180
    return parseFloat(longitude) >= -180 && parseFloat(longitude) <= 180;
  }

  const handleSubmit = useCallback((obj) => {
    if (obj?.title === "" || obj?.title?.length < 3) {
      return setErrors({
        ...errors,
        title: "Location title is required",
      });
    } else if (obj?.latitude === "" || !validateLatitude(obj?.latitude)) {
      return setErrors({
        ...errors,
        latitude: "Valid location latitude is required",
      });
    } else if (obj?.longitude === "" || !validateLongitude(obj?.longitude)) {
      return setErrors({
        ...errors,
        longitude: "Valid location longitude is required",
      });
    }

    if (statusId) {
      updateLocation(obj);
    } else {
      createLocation(obj);
    }
  }, []);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <>
      {isError && <InlineError message={"Something went wrong"} />}
      <Form onSubmit={() => handleSubmit(formData)}>
        <FormLayout>
          <InputField
            value={formData?.title}
            onChange={handleChange}
            label={"Enter location title"}
            type="text"
            name="title"
            placeholder={"Location title"}
            error={errors?.title}
          />
          <InputField
            value={formData?.latitude}
            onChange={handleChange}
            label={"Enter location latitude"}
            type="text"
            name="latitude"
            placeholder={"Location latitude"}
            error={errors?.latitude}
          />
          <InputField
            value={formData?.longitude}
            onChange={handleChange}
            label={"Enter location longitude"}
            type="text"
            name="longitude"
            placeholder={"Location longitude"}
            error={errors?.longitude}
          />
          <InputField
            value={formData?.othersInfo}
            onChange={handleChange}
            label={"Enter location map information"}
            type="text"
            name="othersInfo"
            placeholder={"Location map information"}
            error={errors?.othersInfo}
          />
          <Button primary submit>
            Submit
          </Button>
        </FormLayout>
      </Form>
    </>
  );
}
