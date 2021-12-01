import { Trans } from '@lingui/macro'
import styled from 'styled-components/macro'

import { ThemedText } from '../../theme'
import { RowBetween, RowFixed } from '../Row'
import Toggle from '../Toggle'

const StyledLimitOrdersHeader = styled.div`
  padding: 1rem 1.25rem 0.5rem 1.25rem;
  width: 100%;
  color: ${({ theme }) => theme.text2};
`

export default function LimitOrdersHeader({
  isSell,
  toggleOrderType,
}: {
  isSell: boolean
  toggleOrderType: () => void
}) {
  return (
    <StyledLimitOrdersHeader>
      <RowBetween>
        <RowFixed>
          <ThemedText.Black fontWeight={500} fontSize={16} style={{ marginRight: '8px' }}>
            <Trans>Limit Orders</Trans>
          </ThemedText.Black>
        </RowFixed>
        <RowFixed>
          <Toggle
            isActive={isSell}
            toggle={toggleOrderType}
            checked={<Trans>Sell</Trans>}
            unchecked={<Trans>Buy</Trans>}
          />
        </RowFixed>
      </RowBetween>
    </StyledLimitOrdersHeader>
  )
}
