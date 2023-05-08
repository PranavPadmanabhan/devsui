import { AppUIState, PostType, WorkRoleType } from '@/constants/Types'
import { create } from 'zustand'


export const useAppUiStore = create<AppUIState>()((set) => ({
    postType: 'Ordinary',
    setPostType: (postType: PostType) => set(() => ({ postType })),
    isCreatePostModalVisible:false,
    setIsCreatePostModalVisible:(isCreatePostModalVisible: boolean) => set(() => ({ isCreatePostModalVisible })),
    selectedWorkRole:null,
    setselectedWorkRole:(selectedWorkRole:WorkRoleType) => set(() => ({ selectedWorkRole})),
    reset: () =>
        set(() => ({
            postType: 'Ordinary',
            isCreatePostModalVisible:false
        })),
}))