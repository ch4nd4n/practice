import React, {useState} from 'react';

const Simple = () =>  {
  const [enteredTxt, setEnteredTxt] = useState();
  return <div>
    <input onChange={(e) => {
      setEnteredTxt(e.target.value);
    }} placeholder='enter some stuff' />
    <div>{enteredTxt}</div>
  </div>
}

export default Simple;

