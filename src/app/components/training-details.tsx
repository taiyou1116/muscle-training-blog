import Modal from './Modal'

type TrainingDetailsProps = {
    onClose: () => void,
    open: boolean,
}

function TrainingDetails(props: TrainingDetailsProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  }

  return (
    <Modal open={open} onClose={() => handleClose()} title="詳細">
      <div>
        aa
      </div>
    </Modal>
  )
}

export default TrainingDetails