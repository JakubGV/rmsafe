import React from 'react'

function Test() {
  return (
    <div>
    <form method="post" action="/upload" enctype="multipart/form-data">
      <dl>
        <p>
          <input type="file" name="file" autocomplete="off" required />
        </p>
      </dl>
      <p>
        <input type="submit" value="Submit" />
      </p>
    </form>
  </div>
  )
}

export default Test