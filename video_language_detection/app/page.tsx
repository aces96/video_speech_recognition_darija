"use client"
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const regexFormat = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=([a-zA-Z0-9_]+)|youtu\.be\/([a-zA-Z\d_]+))(?:&.*)?$/gm
  const regex = new RegExp(regexFormat);
  const [validUrl, setValidUrl] = useState(true)
  const [url, setUrl] = useState('')

  const handleClick = async ()=>{

      if(!regex.test(url)){
        setValidUrl(false)
      }else{
        setValidUrl(true)
        await fetch('/api/convert',{
          method: "POST",
          body: JSON.stringify({
            url: url
          })
        }).then((res)=>{
          console.log(res.body)
        }).catch((err)=>{
          console.log(err)
        })
      }

  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white h-screen">
        <div className='w-full h-2/5 bg-red-600 flex flex-col items-center relative'>
            <h1 className='text-4xl text-bold mt-14'>
                Youtube video speech recognition 
            </h1>
            <h1 className='text-4xl text-bold'>
                "Moroccan Darija"
            </h1>
            <div className='absolute -bottom-28 rounded-2xl border-2 border-red-600 w-3/5 h-56 bg-white flex flex-col items-center justify-center'>
              <h4 className='text-medium text-bold text-red-600  mt-4'>
                  please insert a moroccan youtube video "preferred to be short video"
              </h4>
              <input value={url} onChange={(e)=>{
                setUrl(e.target.value)
              }} type='text' className='w-9/12 h-10 border-2 text-black border-red-400 rounded-2xl mt-5' placeholder='https://www.youtube.com/watch?v=fEI2rtuM730'/>

              {!validUrl &&
                <div className='h-8 w-9/12 flex flex-row justify-between items-center mt-1'>
                <h5 className='text-base text-bold text-red-600'>
                  please insert a valid youtube url
                </h5>
                <Image alt='error_icon' width={24} height={24} src='/error.png'/>

                </div>
              }

              <button onClick={handleClick} className='w-5/12 text-bold border-2 border-red-600 h-10 text-red-600 hover:text-white bg-white hover:bg-red-600 rounded-xl mt-5'>
                  Start
              </button>
            </div>
        </div>
    </main>
  )
}
