import React, { useCallback, useContext, useMemo } from 'react'
import { format, getUnixTime } from 'date-fns'
import { Context } from './DutyDateContext'

interface PropTypes {
  id: number
}

const DutyDateInput: React.FC<PropTypes> = (props) => {
  const { id } = props
  const [data, setData] = useContext(Context)
  const target = useMemo(() => {
    return data.find((item) => item.id === id)
  }, [data, id])
  return (
    <input
      type="date"
      value={target?.duty_date ? format(target.duty_date * 1000, 'yyyy-MM-dd') : ''}
      onChange={useCallback((event) => {
        setData((data) => {
          return data.filter((item) => item.id !== id).concat({ id, duty_date: getUnixTime(new Date(event.target.value)) })
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [id])}
    />
  )
}

export default React.memo(DutyDateInput)