import React, { useCallback, useEffect, useState } from "react";
// import { useCreateCustomStatus, useUpdateCustomStatus } from "../../hooks";
import { FormLayout, Button, Form } from "@shopify/polaris";
import { useUI } from "../../contexts/ui.context";
import { InputField } from "../ui/InputField";

export function CreateStore() {
  const { shop, modal } = useUI();
  // const { mutate: createStatus, isError } = useCreateCustomStatus();
  // const { mutate: updateStatus, isError: isEditError } =
  //   useUpdateCustomStatus();
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    othersInfo: "",
  });

  const [errors, setErrors] = useState({
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

  const handleSubmit = useCallback((obj) => {
    if (obj?.title === "" || obj?.title?.length <= 3) {
      return setErrors({
        ...errors,
        title: `${t("form.create_status_required")}`,
      });
    } else if (obj?.categoryId === "") {
      return setErrors({
        ...errors,
        categoryId: `${t("form.category_required")}`,
      });
    }

    if (statusId) {
      // updateStatus(obj);
    } else {
      const newObj = {
        ...obj,
        shopDomain: shop?.myshopify_domain,
        shopId: shop?.id,
      };
      // createStatus(newObj);
    }
  }, []);

  const handleChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <>
      {/* {(isError || isEditError) && (
        <InlineError message={t("errors.something_wrong")} />
      )} */}
      <Form onSubmit={() => handleSubmit(formData)}>
        <FormLayout>
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
            label={"Enter location others information"}
            type="text"
            name="othersInfo"
            placeholder={"Location others information"}
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
