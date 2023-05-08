import React from 'react'
import { MenuIcon } from '../core/icons'
import ActivitySection from './ActivitySection'
import { Comment, Post, PostInteractionType } from '@/constants/Types'
import CommentInputSection from './CommentInputSection'
import ReplyHeader from './ReplyHeader'
import CommentItem from './Comment'
import LikeItem from './LikeItem'
import WorkRequestItem from './WorkRequestItem'

const Post = (post: Post) => {

    const [activeSection, setActiveSection] = React.useState<PostInteractionType>(null);

    const [comments, setComments] = React.useState<Comment[]>([
        {
            comment:"Hello",
            likes:0,
            name:"Athul Vishnu",
            profileImage:"https://imgs.search.brave.com/C8RHG4Fe1_hAWrg2uRsP5S653ma89uMjKkHHfQb4POA/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy5i/dXNpbmVzc3B1bmRp/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTYvMDYvRWxv/bi1NdXNrLWFuZC1D/aG9yZS1GaXhpbmct/Um9ib3RzLmpwZw",
            replies:[
                {
                    comment:"Hi",
                    name:"Rahul Mohan",
                    profileImage:"https://imgs.search.brave.com/C8RHG4Fe1_hAWrg2uRsP5S653ma89uMjKkHHfQb4POA/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy5i/dXNpbmVzc3B1bmRp/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTYvMDYvRWxv/bi1NdXNrLWFuZC1D/aG9yZS1GaXhpbmct/Um9ib3RzLmpwZw"
                }
            ]
        },
        {
            comment:"Hello",
            likes:0,
            name:"Sharath",
            profileImage:"https://imgs.search.brave.com/C8RHG4Fe1_hAWrg2uRsP5S653ma89uMjKkHHfQb4POA/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy5i/dXNpbmVzc3B1bmRp/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTYvMDYvRWxv/bi1NdXNrLWFuZC1D/aG9yZS1GaXhpbmct/Um9ib3RzLmpwZw",
            replies:[
                {
                    comment:"Hi",
                    name:"Amal Raj",
                    profileImage:"https://imgs.search.brave.com/C8RHG4Fe1_hAWrg2uRsP5S653ma89uMjKkHHfQb4POA/rs:fit:1200:1200:1/g:ce/aHR0cDovL3d3dy5i/dXNpbmVzc3B1bmRp/dC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTYvMDYvRWxv/bi1NdXNrLWFuZC1D/aG9yZS1GaXhpbmct/Um9ib3RzLmpwZw"
                }
            ]
        }
    ])


    return (
        <div className='relative w-full h-auto bg-secondaryBG border-[1px] border-primaryBorder rounded-[10px] flex flex-col items-center justify-start mb-2'>
            <section className="w-full h-auto flex flex-col items-center justify-start px-[3%] box-border">
            <div className="w-full h-[10%] min-h-[60px] flex items-center justify-between my-1">
                <div className="w-full h-full flex items-center justify-start ">
                    <div className="min-w-[42px] min-h-[42px] rounded-full bg-white mr-4"></div>
                    <div className="w-full h-full flex flex-col items-start justify-start pt-[2%] box-border">
                        <span className="text-white font-[500] text-[1rem] font-inter leading-4 ">{post.creatorName} <span className="font-[300]  text-[0.8rem] lg:text-[0.9rem]">{post.subject ? post.subject : 'shared a Post'}</span> </span>
                        <span className="text-[0.9rem] text-transparent bg-clip-text bg-gradient-to-tr from-primaryGradient2 to-primaryGradient1 font-inter font-[500] ">@{post.userName}</span>
                        <div className="w-[90%] min-h-[1px] bg-primaryBorder mt-2"></div>
                    </div>
                </div>
                <MenuIcon className='scale-[0.9] lg:scale-[1]'/>
            </div>
            <p className="text-white font-[300] font-inter text-[0.85rem] lg:text-[0.97rem] leading-5 lg:leading-[25px] max-w-[100%] break-words my-3 lg:my-2">{post.content}</p>
            {
                post.image && (<div className='w-full h-[25vh] lg:h-[45vh] flex items-center justify-center px-0 box-border'>
                    <img src={post.image} alt="" className="w-full h-full rounded-[10px] object-fill" />
                </div>)
            }
            <button onClick={() => setActiveSection(activeSection === "Likes" ? null : "Likes")} className={`self-start ${post.likes > 0 ? 'text-transparent bg-clip-text bg-gradient-to-tr from-primaryGradient1 to-primaryGradient2 ' : 'text-white'} font-extrabold font-inter text-[0.9rem] lg:text-[1rem] my-1 lg:my-2`}>{post.likes} Likes</button>
            </section>
            <div className="w-full min-h-[45px] flex flex-col items-center justify-start mb-6">
                <ActivitySection activeSection={activeSection} setActiveSection={setActiveSection} postType='Work' />
                <RenderBottomSection comments={comments} likes={post.likes} type={activeSection} />
            </div>
        </div>
    )
}

const RenderBottomSection = ({ type, comments, likes }: { type: PostInteractionType, likes: number; comments: Comment[] }) => {
    if (type === 'Comment' && comments.length > 0) {
        return (
            <div className='w-full min-h-[50px] flex flex-col items-center justify-start pt-2 box-border '>
                <ReplyHeader to='Pranav'/>
                <CommentInputSection />
                <div className="w-[78%] min-h-[1px] bg-primaryBorder my-2 "></div>
                <div className="flex flex-col items-center justify-start w-full h-auto min-h-[60px]">
                    {
                        comments.map((comment,i) => (
                            <CommentItem key={i} comment={comment.comment} likes={comment.likes} name={comment.name} profileImage={comment.profileImage} replies={comment.replies}  />
                        ) )
                    }
                </div>
            </div>
        )
    }
    else if (type === 'Likes' && likes > 0) {
        return (
            <div className='w-full min-h-[50px] flex flex-col items-center justify-start px-[5%] box-border'>
                <LikeItem name='Pranav' userName='pranav' isConnected/>
                <LikeItem name='Rahul Mohan' userName='rahulmohan' isConnected={false}/>
                <LikeItem name='Sharath' userName='sharath' isConnected/>
                <LikeItem name='Athul Vishnu' userName='athulvishnu' isConnected={false}/>
            </div>
        )
    }
    else if (type === 'Requests') {
        return (
            <div className='w-full min-h-[50px] flex flex-col items-center justify-start px-[5%] box-border'>
                <WorkRequestItem name='Pranav' role='Developer' />
                <WorkRequestItem name='Rahul Mohan' role='Developer' />
                <WorkRequestItem name='Sharath' role='Developer' />
                <WorkRequestItem name='Athul Vishnu' role='Designer' />
            </div>
        )
    }
    else {
        return <div />
    }
}

export default Post