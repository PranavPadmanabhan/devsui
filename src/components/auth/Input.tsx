import { errorColor, normalInputColor, successColor } from '@/constants/constants'
import React from 'react'
import { MdError } from 'react-icons/md'
import { AiOutlineCheck } from 'react-icons/ai'
import { ImSpinner2 } from 'react-icons/im'

type state = "normal" | "error" | "success"

type classNames = {
    wrapper?:string;
    input?:string
}

const Input = ({ state, onChange,placeholder,value,classNames,isLoading,PrefixIcon:Icon }:{state:state; onChange?:React.ChangeEventHandler<HTMLInputElement>;value:string;placeholder:string,classNames?:classNames,isLoading?:boolean,PrefixIcon?:any}) => {
    const getColor = () => {
        switch(state){
            case 'normal':
                return normalInputColor;
            case 'error':
                return errorColor;
            case 'success':
                return successColor;
            default:
                return normalInputColor           
        }
    }

    const getIcon = () => {
        switch(state){
            case 'normal':
                return <div />;
            case 'error':
                return <MdError color={getColor()} size={24} className='mr-1' />;
            case 'success':
                return <AiOutlineCheck color={getColor()} size={24} className='mr-1' />;
            default:
                return <div />;
        }
    }

    
  return (
    <div style={{borderColor:getColor()}} className={` ${classNames?.wrapper}  min-h-[50px] flex items-center justify-between  border-b-[1px]`}>
        <div  className="w-full h-full  flex items-center justify-start ">
            <Icon color={getColor()} size={25} className='mx-2' />
            <input value={value} onChange={onChange} style={{color:state === 'normal'?'white':getColor()}} type="text" placeholder={placeholder} className={` ${classNames?.input} w-full h-full bg-transparent pl-3 placeholder:text-[1rem] text-[1rem] placeholder:text-white_half_opacity focus:outline-none`} />
        </div>
         {!isLoading && getIcon()}
         {isLoading && <ImSpinner2 color='white' size={22} className='animate-rotate' />}
    </div>
  )
}

export default Input