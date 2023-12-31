import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import "./Question.css"
import { useHistory } from 'react-router-dom'
import { TagsInput } from 'react-tag-input-component'
import { useSelector } from 'react-redux'
import { selectUser } from '../../feature/userSlice'
import axios from "axios";

const Question = () => {
    
    const user= useSelector(selectUser)
    const [loading,setLoading]=useState(false)

   const[title,setTitle]=useState("")
   const[body,setBody]=useState("")
   const[tags,setTags]=useState([])

   const history=useHistory()

   const handleQuill=(value)=>{
    setBody(value)
   }
    

   const handelSubmit=async(e)=>{
    e.preventDefault()
    if(title!==""&& body!==""){
        setLoading(true);
        const bodyJson={
       title:title,
       body:body,
       tag:JSON.stringify(tags),
       user:user
        }

        await axios.post("/api/question",bodyJson).then((res)=>{
            alert("Question added Succeessfully")
            history.push("/")
        }).catch((err)=>{
             console.log(err);
             setLoading(false)
        })
    }
   }

    return (
        <div className='add-question'>
            <div className="add-question-container">
                <div className="head-title">
                    <h1>Ask a public question</h1>
                </div>
                <div className="question-container">
                    <div className="question-options">
                        <div className="question-option">
                            <div className="title">
                                <h3>Title</h3>
                                <small>Be specific and imagine you're asking a question to another person</small>
                                <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Add question title' />
                            </div>
                        </div>
                        <div className="question-option">
                            <div className="title">
                                <h3>Body</h3>
                                <small>Include all the information someone would need to answer your question</small>
                                <ReactQuill value={body} onChange={handleQuill} className='reqct-quill' theme='snow' />
                            </div>
                        </div>
                        <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  Add up to 5 tags to describe what your question is about
                </small>
                {/* <input
                  type="text"
                  placeholder="e.g. (asp.net-mvc php react json)"
                /> */}
                <TagsInput
                  value={tags}
                  onChange={setTags}
                  name="fruits"
                  placeHolder="press enter to add new tag"
                />

              </div>
            </div>
          </div>
        </div>
                <button disabled={loading} type='submit' onClick={handelSubmit} className='button'>{loading?"Adding question...":"Add your question"} </button>
            </div>
        </div>

    )
}

export default Question