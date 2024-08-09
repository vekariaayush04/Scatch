import React from 'react'
import { useRecoilValue } from 'recoil'
import { userData } from '../atoms/UserAtom'

const Ayush = () => {
    const data = useRecoilValue(userData)
    console.log(data);
    
  return (
    <div>Ayush</div>
  )
}

export default Ayush