import React, { useCallback, useState } from 'react'

interface PropTypes {
  reload: () => void
}

const CreateEmployee: React.FC<PropTypes> = (props) => {
  const { reload } = props
  const [name, setName] = useState<string>('')
  const [lineId, setLineId] = useState<string>('')
  const handleCreate = useCallback(() => {
    fetch(`http://${process.env.REACT_APP_SERVER_HOST}/employees`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, line_id: lineId })
    })
      .then(() => {
        reload()
        setName('')
        setLineId('')
      })
  }, [name, lineId, reload])
  return (
    <React.Fragment>
      <label>名字</label>
      <input value={name} onChange={useCallback((event) => setName(event.target.value), [])} />
      <label>Line ID (tag 人用的)</label>
      <input value={lineId} onChange={useCallback((event) => setLineId(event.target.value), [])} />
      <button onClick={handleCreate}>新增人員</button>
    </React.Fragment>
  )
}

export default React.memo(CreateEmployee)