import { SearchNormal1 } from 'iconsax-react'
import React from 'react'
import { FaPlus } from 'react-icons/fa';

const Search = ({ onChange, onSearch, value,onAdd}:{ onChange?:React.ChangeEventHandler<HTMLInputElement>; onSearch?:() => void; value?:string,onAdd?:() => void }) => {
    return (
        <div className='w-full min-h-[60px] flex items-center justify-center my-[2%]'>
            <div className="w-[90%] min-h-[40px] rounded-[30px] border-[1px] border-primaryBorder flex items-center justify-between pl-[3%] pr-[3px] box-border">
                <input value={value} onChange={onChange} placeholder='Search here..' type="text" className="min-h-[40px] w-[85%] bg-transparent pl-[10px] text-white text-[0.9rem] font-inter focus:outline-none placeholder:text-white_half_opacity placeholder:text-[0.9rem]" />
                <button onClick={value?.trim().length!== 0?onSearch:onAdd} className="h-[33px] w-[33px] rounded-full bg-search_button flex items-center justify-center ">
                    {value?.trim().length!== 0?<SearchNormal1 color='white' size={20} />:<FaPlus color='white' size={15} />}
                </button>
            </div>
        </div>
    )
}

export default Search