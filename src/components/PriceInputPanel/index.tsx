import { Currency, CurrencyAmount, Token } from '@uniswap/sdk-core'
import { Pair } from '@uniswap/v2-sdk'
import { loadingOpacityMixin } from 'components/Loader/styled'
import { ReactNode } from 'react'
import styled from 'styled-components/macro'

import { useActiveWeb3React } from '../../hooks/web3'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { Input as NumericalInput } from '../NumericalInput'

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '16px' : '20px')};
  background-color: ${({ theme, hideInput }) => (hideInput ? 'transparent' : theme.bg2)};
  z-index: 1;
  width: ${({ hideInput }) => (hideInput ? '100%' : 'initial')};
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: ${({ hideInput }) => (hideInput ? '16px' : '20px')};
  border: 1px solid ${({ theme, hideInput }) => (hideInput ? ' transparent' : theme.bg2)};
  background-color: ${({ theme }) => theme.bg1};
  width: ${({ hideInput }) => (hideInput ? '100%' : 'initial')};
  :focus,
  :hover {
    border: 1px solid ${({ theme, hideInput }) => (hideInput ? ' transparent' : theme.bg3)};
  }
`

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: space-between;
  padding: ${({ selected }) => (selected ? ' 1rem 1rem 0.75rem 1rem' : '1rem 1rem 0.75rem 1rem')};
`

const StyledNumericalInput = styled(NumericalInput)<{ $loading: boolean }>`
  ${loadingOpacityMixin}
`

interface PriceInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  label?: ReactNode
  currency?: Currency | null
  pair?: Pair | null
  otherCurrency?: Currency | null
  fiatValue?: CurrencyAmount<Token> | null
  id: string
  loading?: boolean
}

export default function PriceInputPanel({
  value,
  onUserInput,
  onMax,
  currency,
  id,
  loading = false,
  ...rest
}: PriceInputPanelProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  return (
    <InputPanel id={id} {...rest}>
      <Container hideInput={false}>
        <InputRow selected={false}>
          <StyledNumericalInput
            className="token-amount-input"
            value={value}
            onUserInput={onUserInput}
            $loading={loading}
          />
        </InputRow>
      </Container>
    </InputPanel>
  )
}
