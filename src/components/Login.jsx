import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import whiteLogo from '../assets/logowhite.png'
import jwtDecode from 'jwt-decode'
import { client } from '../client'

function Login() {

  const navigate = useNavigate()
  const onSuccessLogin = (credentialResponse) => {
    const decodedResponse = jwtDecode(credentialResponse.credential);
    console.log(decodedResponse);
    localStorage.setItem('user', JSON.stringify(decodedResponse));
    const {name, sub: googleId, picture: imgUrl} = decodedResponse

    const doc = { 
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imgUrl
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/',{replace: true})
      })
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
        src={shareVideo}
        type='video.mp4'
        loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={whiteLogo} width='130px' alt='whiteLogo'/>
          </div>
            <GoogleLogin
            text='Sign in with Google'
            size='large'
            theme='outline'
            shape='pill'
            onSuccess={onSuccessLogin}
            onError={() => {
              console.log('Login Failed');
            }}
          />;
        </div>
      </div>
    </div>
  )
}

export default Login

