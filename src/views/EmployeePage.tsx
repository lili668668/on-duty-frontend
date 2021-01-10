import React from 'react'
import CreateEmployee from '../components/employee/CreateEmployee'
import useReload from '../utils/useReload'
import EmployeeTable from '../components/employee/EmployeeTable'

const EmployeePage: React.FC = () => {
  const { reload, reloadFlag } = useReload()
  return (
    <React.Fragment>
      <EmployeeTable reload={reload} reloadFlag={reloadFlag} />
      <div>
        <CreateEmployee reload={reload} />
      </div>
    </React.Fragment>
  )
}

export default React.memo(EmployeePage)