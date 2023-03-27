import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Box,
  H2,
  Text,
  Illustration,
  IllustrationProps,
  H5
} from '@adminjs/design-system'
import { ApiClient, useTranslation } from 'adminjs'
import { UserRegisterByMonthChart } from './dashboard/charts/userRegisterByMonth'
import { Users } from '@prisma/client'

const pageHeaderHeight = 284
const pageHeaderPaddingY = 74
const pageHeaderPaddingX = 250

export const DashboardHeader: React.FC = () => {
  const { translateMessage } = useTranslation()
  return (
    <Box position="relative" overflow="hidden" data-css="default-dashboard">
      <Box
        position="absolute"
        top={50}
        left={-10}
        opacity={[0.2, 0.4, 1]}
        animate
      >
        <Illustration variant="Rocket" />
      </Box>
      <Box
        position="absolute"
        top={-70}
        right={-15}
        opacity={[0.2, 0.4, 1]}
        animate
      >
        <Illustration variant="Moon" />
      </Box>
      <Box
        bg="grey100"
        height={pageHeaderHeight}
        py={pageHeaderPaddingY}
        px={['default', 'lg', pageHeaderPaddingX]}
      >
        <Text textAlign="center" color="white">
          <H2>{translateMessage('welcomeOnBoard_title')}</H2>
          <Text opacity={0.8}>
            {translateMessage('welcomeOnBoard_subtitle')}
          </Text>
        </Text>
        
      </Box>
    </Box>
  )
}

type BoxType = {
  variant: string;
  title: string;
  subtitle: string;
  href: string;
}

const boxes = ({ translateMessage }): Array<BoxType> => [{
  variant: 'Astronaut',
  title: translateMessage('users_title'),
  subtitle: translateMessage('users_subtitle'),
  href: '/admin/resources/Users',
}, {
  variant: 'GithubLogo',
  title: translateMessage('Github_title'),
  subtitle: translateMessage('Github_subtitle'),
  href: 'https://github.com/cleissonbarbosa/api-rest-typescript',
}, {
  variant: 'DocumentSearch',
  title: translateMessage('customizeActions_title'),
  subtitle: translateMessage('customizeActions_subtitle'),
  href: 'https://adminjs.co/tutorial-actions.html',
}]

const Card = styled(Box)`
  display: ${({ flex }): string => (flex ? 'flex' : 'block')};
  color: ${({ theme }): string => theme.colors.grey100};
  text-decoration: none;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid ${({ theme }): string => theme.colors.primary100};
    box-shadow: ${({ theme }): string => theme.shadows.cardHover};
  }
`

Card.defaultProps = {
  variant: 'white',
  boxShadow: 'card',
}

const Chart: React.FC = () => {
  const [data, setData] = useState<Users[] | null>(null)
  const api = new ApiClient()

  useEffect(() => {
    api.getDashboard()
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        // Handle errors here
      })
  }, [])
  return (
    <UserRegisterByMonthChart data={data} />
  )
}

export const Dashboard: React.FC = () => {
  const { translateMessage, translateButton } = useTranslation()
  return (
    <Box>
      <DashboardHeader />
      <Box
        mt={['xl', 'xl', '-100px']}
        mb="xl"
        mx={[0, 0, 0, 'auto']}
        px={['default', 'lg', 'xxl', '0']}
        position="relative"
        flex
        flexDirection="row"
        flexWrap="wrap"
        width={[1, 1, 1, 1024]}
      >
        <Box width={[1, 1, 1 / 2]} p="lg">
          <Card as="a" flex>
            <Chart />
          </Card>
        </Box>
        {boxes({ translateMessage }).map((box, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={index} width={[1, 1, 1 / 2]} p="lg">
              <Card as="a" href={box.href} target="_blank">
                <Text textAlign="center">
                  <Illustration
                    variant={box.variant as IllustrationProps['variant']}
                    width={100}
                    height={70}
                  />
                  <H5 mt="lg">{box.title}</H5>
                  <Text>{box.subtitle}</Text>
                </Text>
              </Card>
            </Box>
          ))}
      </Box>
    </Box>
  )
}

export default Dashboard