import React from 'react'
import { useForm } from 'react-hook-form'
import { feedbackQuestions } from '../constants';

const   FeedbackFrom = () => {
    const { register, handleSubmit, watch, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        console.log(watch(data));
    }

  return (
    <>
    <div className='w-96 m-40 text-left'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit(onSubmit)}>
            <label className='block text-gray-700 text-sm font-bold mt-3 mb-2'>First Name</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 textgray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" id="firstName" placeholder='John'
            {...register("firstName", {
                required: true,
                maxLength: 20,
                pattern: /^[A-Za-z]+$/i
            })}
            
            /> 
            {errors?.firstName?.type === "required" && <p className='text-red-500'>First name is required</p>}
            {errors?.firstName?.type === "pattern" && (<p className='text-red-500'>Alphabetical characters only</p>)}

            <label className='block text-gray-700 text-sm font-bold mt-3 mb-2'>Last Name</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 textgray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" id="lastName" placeholder='Doe'
            {...register("lastName", {
                pattern: /^[A-Za-z]+$/i
            })}
            
            />
            {errors?.lastName?.type === "pattern" && (<p className='text-red-500'>Alphabetical characters only</p>)}
            
            <label className='block text-gray-700 text-sm font-bold mt-3 mb-2'>Email</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 textgray-700 leading-tight focus:outline-none focus:shadow-outline' type="email" id="email" placeholder='example@gmail.com'
            {...register("email", {
                 pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i 
            })}
            
            />
            {errors?.email?.type === "pattern" && (<p className='text-red-500'>Please write correct email address</p>)}

            <label className='block text-gray-700 text-sm font-bold mt-3 mb-2'>Password</label>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 textgray-700 leading-tight focus:outline-none focus:shadow-outline' type="password" id="password" placeholder='********'
            {...register("password", {
                 minLength: 8,
                 required: true 
            })}
            
            />
            {errors?.password?.type === "minLength" && (<p className='text-red-500'>Your password must be larger then 8 characters</p>)}
            {errors?.password?.type === "required" && (<p className='text-red-500'>Password is required</p>)}

            <button type='submit' className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3'>Submit</button>
        </form>
    </div>
    </>
  )
}

export default FeedbackFrom