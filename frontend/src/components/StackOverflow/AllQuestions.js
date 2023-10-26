// import React from 'react'
// import "./css/AllQuestions.css"
// import { Avatar } from '@mui/material';
// import { Link } from 'react-router-dom';

// function AllQuestions({ questions }) {


//     return (
//         <div className='all-questions'>
//             <div className="all-questions-container">
//                 <div className="all-questions-left">
//                     <div className="all-options">
//                         <div className="all-option">
//                             <p>0</p>
//                             <span>Votes</span>
//                         </div>
//                         <div className="all-option">
//                             <p>0</p>
//                             <span>Answer</span>
//                         </div>
//                         <div className="all-option">
//                             <small>0 Views</small>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="question-answer">
//                     <Link to="/question">
//                    {questions?.title}
//                     </Link>
//                     <p>
//                         ANSIBLE PLAYBOOK HELP! I need to uninstall application1 , checks for
//                         application2 (only if application1 is uninstalled) if application
//                         two is installed then STOP application2 services and install ...
//                     </p>
//                     <div className="author">
//                         <small>asked 1 min ago</small>
//                         <div className="auth-details">
//                             <Avatar />
//                             <p>Christine Lane</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default AllQuestions





import { Avatar } from '@mui/material';
import React from "react";
import "./css/AllQuestions.css";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

function AllQuestions({ questions }) {
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
      }
    // console.log(questions?.tags[0])
// let tags = JSON.parse(questions?.tags[0]);
//   console.log();
const tags=[]
//   console.log(JSON.parse(undefined));
  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>votes</span>
            </div>
            <div className="all-option">
              <p>{questions?.answerDetails?.length}</p>
              <span>Answers</span>
            </div>
            <div className="all-option">
              <small>0 views</small>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link to={`/question?q=${questions?._id}`}>{questions?.title}</Link>

          {/* <a href=>{data.title}</a> */}

          <div
            style={{
              maxWidth: "90%",
            }}
          >
            <div>{parse(truncate(questions.body, 200))}</div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            {tags.map((_tag) => (
              <p
                style={{
                  margin: "10px 5px",
                  padding: "5px 10px",
                  backgroundColor: "#007cd446",
                  borderRadius: "3px",
                }}
              >
                {_tag}
              </p>
            ))}
          </div>
          <div className="author">
            <small>{new Date(questions?.created_at).toLocaleString()}</small>
            <div className="auth-details">
              <Avatar src={questions?.user?.photo} />
              <p>
                {questions?.user?.displayName ? questions?.user?.displayName: String(questions?.user?.email).split("@")[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;