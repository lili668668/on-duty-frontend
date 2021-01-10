import React, { useCallback, useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { createUseStyles } from 'react-jss'
import Employee from '../../types/Employee'
import DeleteButton from './DeleteButton'
import DutyDateButton from './DutyDateButton'
import DutyDateContext from './DutyDateContext'
import DutyDateInput from './DutyDateInput'

const useStyles = createUseStyles({
  table: {
    borderCollapse: 'collapse'
  },
  td: {
    border: '1px solid #000'
  }
})

interface PropTypes {
  reload: () => void
  reloadFlag: boolean
}

const EmployeeTable: React.FC<PropTypes> = (props) => {
  const classes = useStyles()
  const { reload, reloadFlag } = props
  const [employees, setEmployees] = useState<Employee[]>([])
  useEffect(() => {
    fetch(`http://${process.env.REACT_APP_SERVER_HOST}/employees`)
      .then((response) => response.json())
      .then((data) => setEmployees(data))
  }, [reloadFlag])
  const handleReorder = useCallback(() => {
    fetch(`http://${process.env.REACT_APP_SERVER_HOST}/employees/reorder`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employees.map((employee) => employee.id))
    })
  }, [employees])
  return (
    <DutyDateContext employees={employees}>
      <DragDropContext
        onDragEnd={useCallback((response) => {
          setEmployees((employees) => {
            const array = employees.slice()
            const target = array.splice(response.source.index, 1)
            const index = response.destination?.index
            return array.slice(0, index).concat(target).concat(array.slice(index, array.length))
          })
        }, [])}
      >
        <Droppable droppableId="table">
        {(provided) => (
          <table
            ref={provided.innerRef}
            className={classes.table}
            {...provided.droppableProps}
          >
            <thead>
              <tr>
                <td className={classes.td}>名字</td>
                <td className={classes.td}>Line ID</td>
                <td className={classes.td}>值日生日期</td>
                <td className={classes.td}></td>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <Draggable
                  index={index}
                  key={employee.id}
                  draggableId={employee.id.toString()}
                >
                  {(provided) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <td className={classes.td}>{employee.name}</td>
                      <td className={classes.td}>{employee.line_id}</td>
                      <td className={classes.td}>
                        <DutyDateInput id={employee.id} />
                      </td>
                      <td className={classes.td}>
                        <DeleteButton id={employee.id} reload={reload} />
                      </td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          </table>
        )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleReorder}>儲存順序</button>
      <DutyDateButton />
    </DutyDateContext>
  )
}

export default React.memo(EmployeeTable)