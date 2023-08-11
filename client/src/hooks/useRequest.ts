import { AxiosError, AxiosResponse } from 'axios'
import { useCallback, useState } from 'react'
import { RequestReturnType } from '../lib/axios'

type UseRequestType<T> = {
  isLoading: boolean
  response: T | undefined
  responseFull: AxiosResponse<T> | undefined
  error: AxiosError | undefined
  sendRequest: (...args: any) => void
}

const useRequest = <T = unknown>(
  request: (...args: any) => RequestReturnType<T>,
  onSuccess?: (response: T) => void,
  onError?: (error: AxiosError) => void
): UseRequestType<T> => {
  const [isLoading, setLoading] = useState(false)
  const [response, setResponse] = useState<AxiosResponse>()
  const [error, setError] = useState<AxiosError>()

  const sendRequest = useCallback(
    async (...args: any) => {
      try {
        setLoading(true)
        const response = await request(...args)
        setResponse(response)
        onSuccess?.(response.data)
      } catch (error) {
        setResponse(undefined)
        setError(error as AxiosError)
        onError?.(error as AxiosError)
      }
      setLoading(false)
    },
    [request]
  )

  return {
    isLoading,
    response: response?.data,
    responseFull: response,
    error,
    sendRequest,
  }
}

export default useRequest
