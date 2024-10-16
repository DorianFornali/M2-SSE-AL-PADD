import React, { FC } from 'react'
import {
  Box,
  Button,
  ButtonProps,
  Modal as MuiModal,
  Typography,
} from '@mui/material'

export type ModalProps = {
  title: string
  closeButtonProps: ButtonProps
  open?: boolean
  handleClose?: () => void
  id?: string
  children?: React.ReactNode
}

const Modal: FC<ModalProps> = (props) => {
  const { title, closeButtonProps, open, handleClose, id, children } = props

  return (
    <Box>
      <MuiModal open={open ?? false} id={id} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box>
            <Typography variant="h4">{title}</Typography>
            <Button {...closeButtonProps} onClick={handleClose} />
          </Box>
          {children}
        </Box>
      </MuiModal>
    </Box>
  )
}

export default Modal
