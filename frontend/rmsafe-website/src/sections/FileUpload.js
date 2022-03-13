import React from 'react'

function FileUpload() {
  return (
    <div><form method="post" action="/" enctype="multipart/form-data">
    <dl>
		<p>
			<input type="file" name="file" autocomplete="off" required/>
		</p>
    </dl>
    <p>
		<input type="submit" value="Submit"/>
	</p>
</form></div>
  )
}

export default FileUpload