import React from 'react'

function VoteQn({polls}) {
  console.log(polls)  
  return (
    <div>
        <h2>{polls.Question}</h2>
    </div>
  )
}

export default VoteQn