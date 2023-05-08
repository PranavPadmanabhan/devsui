import { useAppUiStore } from '@/store/app'
import React from 'react'
import CreatePostModal from './CreatePostModal'

const ModalsContainer = () => {
    const { postType, isCreatePostModalVisible } = useAppUiStore()
  if(isCreatePostModalVisible){
    return <CreatePostModal />
  }
  else {
    return <div />
  }
}

export default ModalsContainer