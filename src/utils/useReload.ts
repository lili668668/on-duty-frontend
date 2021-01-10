import { useCallback, useState } from 'react'

const useReload = () => {
  const [reloadFlag, setReloadFlag] = useState<boolean>(false)
  const reload = useCallback(() => setReloadFlag((value) => !value), [])
  return { reloadFlag, reload }
}

export default useReload