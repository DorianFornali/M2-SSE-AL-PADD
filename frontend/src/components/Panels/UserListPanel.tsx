import { useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../store/store'
import { useQuery } from '@tanstack/react-query'
import { getMyRelations } from '../../api/relations'
import { Box, CircularProgress, Typography } from '@mui/material'
import UserCard from '../UserCard'
import { routes } from '../../router/definitions'
import { UserRelation } from '../../types/types'

const UserSection: React.FC<{
  title: string
  user: UserRelation | UserRelation[] | undefined
  noUserText: string
}> = ({ title, user, noUserText }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h3">{t(title)}</Typography>
      <Box>
        {user ? (
          Array.isArray(user) ? (
            user.map((relative) => (
              <UserCard
                key={relative.id}
                name={`${relative?.relatedUser?.firstName} ${relative?.relatedUser?.lastName}`}
                actionButtonProps={{
                  onClick: () => {
                    navigate({
                      to: routes.userView.path,
                      params: {
                        id: relative?.relatedUser?.id?.toString(),
                      },
                    })
                  },
                  children: t('patientPanel.see'),
                }}
              />
            ))
          ) : (
            <UserCard
              name={`${user?.relatedUser?.firstName} ${user?.relatedUser?.lastName}`}
              actionButtonProps={{
                onClick: () => {
                  navigate({
                    to: routes.userView.path,
                    params: {
                      id: user?.relatedUser?.id?.toString(),
                    },
                  })
                },
                children: t('patientPanel.see'),
              }}
            />
          )
        ) : (
          <Typography>{t(noUserText)}</Typography>
        )}
      </Box>
    </Box>
  )
}

const UserListPanel: React.FC = () => {
  const user = useAuthStore((state) => state.user)
  const { data, isLoading } = useQuery({
    queryKey: ['relations', user?.id],
    queryFn: () => getMyRelations({ id: user?.id }),
  })

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <UserSection
            title="userListPanel.doctor"
            user={data?.doctor}
            noUserText="userListPanel.noDoctor"
          />
          <UserSection
            title="userListPanel.nurse"
            user={data?.nurse}
            noUserText="userListPanel.noNurse"
          />
          {/* @ts-expect-error - error in typing */}
          {user?.role === 'PATIENT' && (
            <UserSection
              title="userListPanel.relative"
              user={data?.relatives}
              noUserText="userListPanel.noRelative"
            />
          )}
        </Box>
      )}
    </Box>
  )
}

export default UserListPanel
