import { Modal } from "@shopify/polaris";
import { useUI } from "../../contexts/ui.context";
import { CreateStore } from "../form/CreateStore";

export function ModalArea() {
  const { modal, setCloseModal } = useUI();
  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={modal?.isOpen}
        onClose={setCloseModal}
        title={modal?.data?.title || "Modal"}
      >
        <Modal.Section>
          {modal?.view === "CREATE_STORE" && <CreateStore />}
        </Modal.Section>
      </Modal>
    </div>
  );
}
