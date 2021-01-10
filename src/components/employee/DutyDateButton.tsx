import React, { useCallback, useContext } from 'react'
import { Context } from './DutyDateContext'

const DutyDateButton: React.FC = () => {
  const [data] = useContext(Context)
  const handleClick = useCallback(() => {
    const payload = data.filter((item) => item.duty_date)
    fetch(`http://${process.env.REACT_APP_SERVER_HOST}/employees/set-date`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  }, [data])
  return (
    <button onClick={handleClick}>儲存值日生日期</button>
  )
}

export default React.memo(DutyDateButton)