/* eslint-disable no-console */
import React, { FC, ReactElement } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  RenderHookOptions,
  RenderHookResult,
  render,
  renderHook,
} from '@testing-library/react-native'

type Options = Parameters<typeof render>[1]

const queryCliente = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {},
  },
})

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => (
  <QueryClientProvider client={queryCliente}>{children}</QueryClientProvider>
)

const customRender = (ui: ReactElement, options?: Options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

const customRenderHook = <Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: RenderHookOptions<Props>
): RenderHookResult<Result, Props> =>
  renderHook(renderCallback, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react-native'
export { customRender as render }
export { customRenderHook as renderHook }
