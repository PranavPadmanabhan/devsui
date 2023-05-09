import { AppUIState, PostType, WorkRoleType, Users } from '@/constants/Types'
import { create } from 'zustand'


export const useAppUiStore = create<AppUIState>()((set) => ({
    postType: 'Ordinary',
    setPostType: (postType: PostType) => set(() => ({ postType })),
    isCreatePostModalVisible:false,
    setIsCreatePostModalVisible:(isCreatePostModalVisible: boolean) => set(() => ({ isCreatePostModalVisible })),
    selectedWorkRole:null,
    setselectedWorkRole:(selectedWorkRole:WorkRoleType) => set(() => ({ selectedWorkRole})),
    user:{} as Users,
    setUser:(user:Users) => set(() => ({ user })),
    reset: () =>
        set(() => ({
            postType: 'Ordinary',
            isCreatePostModalVisible:false
        })),
}))