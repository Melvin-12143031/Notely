import { useState } from "react"
import ConfirmDialog from "./ConfirmDialog"

const DeleteNoteDialog = ({
    note,
    onConfirm,
    onCancel,
}) => {

    const [deleting, setDeleting] = useState(false)

    const handleConfirm = () => {
        setDeleting(true)
        onConfirm()
    }

  return (
    <ConfirmDialog
      title="Delete Note?"
      message={`Are you sure you want to delete "${note.title}"?`}
      confirmText={deleting ? 'Deleting...' : 'Delete'}
      confirmDisabled={deleting}
      onConfirm={handleConfirm}
      onCancel={onCancel}
    />
  )
}

export default DeleteNoteDialog
