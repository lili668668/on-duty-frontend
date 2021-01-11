import React, { useCallback } from 'react'

interface PropTypes {
  id: number
  reload: () => void
}

const DeleteButton: React.FC<PropTypes> = (props) => {
  const { id, reload } = props
  const handleClick = useCallback(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST}/employees/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => reload())
  }, [id, reload])
  return (
    <button onClick={handleClick}>刪除</button>
  )
}

export default React.memo(DeleteButton)
