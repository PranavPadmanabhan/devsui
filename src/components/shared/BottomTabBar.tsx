import { bottomTabLinks } from '@/assets/links/bottomTabLinks';
import { useRouter } from 'next/router';
import React from 'react'

const BottomTabBar = ({ type }:{ type:"fixed"|"relative"}) => {

    const router = useRouter();


    return (
        <div className={`${type === 'fixed'?'fixed bottom-0':'relative'}  w-full h-[10%] min-h-[40px] max-h-[65px] bg-bottomTabBG lg:hidden flex items-center justify-between px-[4%] box-border`}>
            {
                bottomTabLinks.map(({ id, label, path, icon: { active: Active, normal: Normal } }) => (
                    <div key={id} className=" h-full w-full flex items-center justify-center">
                        {router.pathname.includes(path) ? <Active className='' /> : <Normal />}
                    </div>
                ))
            }
        </div>
    )
}

export default BottomTabBar