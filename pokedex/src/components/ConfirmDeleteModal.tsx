import { Modal } from "./Modal";

interface ConfirmDeleteModalProps {
  id: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteModal({ onConfirm, onCancel }: ConfirmDeleteModalProps) {
  return (
    <Modal isOpen={true} onClose={onCancel} title="Delete Entry">
      <div>
        <p>Are you sure you want to delete this entry?</p>
        <button onClick={onConfirm}>Delete</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </Modal>
  );
}
