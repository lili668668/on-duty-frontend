import React, { Dispatch, PropsWithChildren, SetStateAction, useEffect, useMemo, useState } from 'react'
import Employee from '../../types/Employee'

type DutyDateTuple = Array<{
  id: number
  duty_date: number
}>

export const Context = React.createContext<[DutyDateTuple, Dispatch<SetStateAction<DutyDateTuple>>]>([
  [],
  () => {}
])

interface PropTypes {
  employees: Employee[]
}

const DutyDateContext: React.FC<PropsWithChildren<PropTypes>> = (props) => {
  const { children, employees } = props
  const data = useMemo(() => {
    return employees.map((employee) => ({
      id: employee.id,
      duty_date: employee.duty_date
    }))
  }, [employees])
  const value = useState<DutyDateTuple>(data)
  const [, setter] = value
  useEffect(() => {
    setter(data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default React.memo(DutyDateContext)