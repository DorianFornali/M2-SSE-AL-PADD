import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  Typography,
} from '@mui/material'
import { User } from '../../types/types'
import Modal, { ModalProps } from './Modal'
import { useTranslation } from 'react-i18next'

type AddPatientModalProps = ModalProps & {
  patient: User | null
  nurses?: User[]
  relatives?: User[]
  onAddPatient: (patientId: number, nurseId: number, relativeId: number) => void
}

const AddPatientModal: React.FC<AddPatientModalProps> = (props) => {
  const { patient, nurses, relatives, onAddPatient, ...modalProps } = props

  const { t } = useTranslation()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    const nurseId = data.get('nurse') as string
    const relativeId = data.get('relative') as string

    if (patient) {
      onAddPatient(patient.id ?? 0, parseInt(nurseId), parseInt(relativeId))
    }
  }

  return (
    <Modal {...modalProps}>
      <Typography variant="body1">
        <strong>Patient :</strong> {patient?.firstName} {patient?.lastName}
      </Typography>
      {nurses && relatives && (
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            marginTop: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="nurse">{t('addPatientModal.nurse')}</FormLabel>
            <Select required name="nurse" label="Nurse" native>
              {nurses.map((nurse) => (
                <option key={nurse.id} value={nurse.id}>
                  {nurse.firstName} {nurse.lastName}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="relative">
              {t('addPatientModal.relative')}
            </FormLabel>
            <Select name="relative" label="Relative" native>
              {relatives.map((relative) => (
                <option key={relative.id} value={relative.id}>
                  {relative.firstName} {relative.lastName}
                </option>
              ))}
            </Select>
          </FormControl>
          <Button type="submit">{t('addPatientModal.submit')}</Button>
        </Box>
      )}
    </Modal>
  )
}

export default AddPatientModal
