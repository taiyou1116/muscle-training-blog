import { ExerciseData } from '../types/exercise-data';
import Modal from './Modal'

type TrainingDetailsProps = {
    onClose: () => void,
    open: boolean,
    data: ExerciseData,
}

function TrainingDetails(props: TrainingDetailsProps) {
  const { onClose, open, data } = props;

  const handleClose = () => {
    onClose();
  }

  return (
    <Modal open={open} onClose={() => handleClose()} title={data.selectedExercise}>
      <div className=''>
        <div className=' border-2 rounded-lg py-10 px-20 '>
          {/* 削除と追加 */}
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 font-normal">セット</th>
                <th className="px-4 font-normal">レップス</th>
                <th className="px-4 font-normal">重量(kg)</th>
              </tr>
            </thead>
            <tbody>
              {data.sets.map((set, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 text-center">{index + 1}</td>
                  <td className="px-4 text-center">{set.reps}</td>
                  <td className="px-4 text-center">{set.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  )
}

export default TrainingDetails