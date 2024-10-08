import React from 'react'
import { Link} from 'react-router-dom'
import Signup from '../RegiComp/Signup';



function Home (){
    return(
        <>
        <div className=''>
            
        <div className='  text-center   font-extrabold  font-six m-0 p-0 text-emerald-400 '>
        <p className='text-header' style={{ margin: '0', padding: '0' }}>TUTORHUB</p>

        
        <Link to="/signup"  element={<Signup/>} className='text-4xl animate-pulse font-flow hover:font-chart pb-20 '>Start Your Journey ?</Link>
     </div>






     <div className="container mx-auto px-4 py-20 text-red-400">
            <h1 className="text-8xl font-bold text-center mb-8">About</h1>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
                <div className="max-w-md">
                    <h2 className="text-6xl font-semibold mb-4  ">Connecting  to Tutors</h2>
                    <p className="text-2xl ">
                        Our application aims to bridge the gap between students seeking academic help and qualified tutors
                        available to provide assistance. We provide a platform where students can easily connect with
                        tutors for various subjects and topics, enabling a collaborative and supportive learning
                        environment.
                    </p>
                </div>
                <div className="max-w-md">
                    <h2 className="text-6xl font-semibold mb-4 ">Features</h2>
                    <ul className="text-2xl  ">
                        <li className="mb-2">
                            <span className="font-semibold">Search:</span> Easily search for tutors based on subjects or
                            specific topics.
                        </li>
                        <li className="mb-2">
                            <span className="font-semibold">Connect:</span> Instantly connect with tutors through our
                            messaging system.
                        </li>
                        <li className="mb-2">
                            <span className="font-semibold">Schedule:</span> Schedule tutoring sessions at your
                            convenience.
                        </li>
                        <li className="mb-2">
                            <span className="font-semibold">Rating:</span> Rate and review tutors based on your
                            experience.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
     </div>
     
     

        </>
    )
}
export default Home;