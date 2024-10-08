import React, { useState } from 'react';
import axios from 'axios';
import Moderator from "../Moderator";
import Singleton from "../Singleton";
function Signup() {
  const [email, setEmail] = useState('');
  const [userId, setuserId] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [level, setLevel] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
 const [gender, setGender] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
const [showCoursesDropdown, setShowCoursesDropdown] = useState(false); // Add this line for course selection
const [searchCourseTerm, setSearchCourseTerm] = useState(''); // Assuming you have a similar state for course search

const singletonInstance = Singleton.getInstance();
const tags = singletonInstance.getTags();
const courses = singletonInstance.getCourses();

const filteredCourses = courses.filter((course) =>
  course.toLowerCase().includes(searchCourseTerm.toLowerCase())
);







  const handleTagSelection = (tag) => {
    const index = selectedTags.indexOf(tag);
    if (index > -1) {
      const updatedTags = [...selectedTags];
      updatedTags.splice(index, 1);
      setSelectedTags(updatedTags);
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCourseSelection = (course) => {
    const index = selectedCourses.indexOf(course);
    if (index > -1) {
      const updatedCourses = [...selectedCourses];
      updatedCourses.splice(index, 1);
      setSelectedCourses(updatedCourses);
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

   const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
  };

  const calculateRank = () => {
    const totalPoints = selectedCourses.length * 12; // Assigning 12 points for each selected course
    return totalPoints;
  };

  

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTags.length > 0 && selectedCourses.length > 0) {
      try {
        const rank = calculateRank();
        const response = await Moderator.register({
          email,
          userId,
          password,
          college, 
          dateOfBirth, 
          level, 
          gender,
          rank,
          tags: selectedTags,
          courses: selectedCourses,
        });
  
        console.log(response);
  
        if (response.message === 'Account created') { 
          Moderator.redirectTo('/login')
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [activeStep, setActiveStep] = useState(1); 

  const handleNextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 3)); 
  };

  const handlePreviousStep = () => {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 1)); // Move to the previous step, down to step 1
  };

  return (
    <div className="min-h-screen flex items-center justify-center  sm:px-6 lg:px-8 ">
      <div className=" max-w-4xl w-full">
        {/* Step 1: Signup Data Entry */}
        <h2 className="text-7xl font-bold  text-center mb-10"> Sign Up </h2>
        <div className={`col-span-1 rounded-lg bg-white p-4 ${activeStep === 1 ? '' : 'hidden'}`}>
          {/* ... Signup Form Fields ... */}
          <form onSubmit={handleSubmit} className="  rounded-lg bg-white ">
        
          <div className="rounded-md shadow-sm ">

             <div className="rounded-md shadow-sm ">
              <div>
               <label htmlFor="email-address" className="sr-only">
                Email address
               </label>
               <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-400 focus:border-red-400 focus:z-10 text-2xl"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="id" className="sr-only">
                ID
              </label>
              <input
                id="id"
                name="id"
                type="text"
                autoComplete="id"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-red-400 focus:z-10 text-2xl"
                placeholder="ID"
                value={userId}
                onChange={(e) => setuserId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-red-400 focus:z-10 text-2xl"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
          <label htmlFor="college" className="sr-only">
            College
          </label>
          <input
            id="college"
            name="college"
            type="text"
            autoComplete="college"
            required
            className="appearance-none rounded-none  w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-red-400 focus:z-10 text-2xl"
            placeholder="College"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="sr-only">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            autoComplete="dateOfBirth"
            required
            className="appearance-none rounded-none   w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-red-400 focus:z-10 text-2xl"
            placeholder="Date of Birth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div>
     
      <div className=" items-center mb-4">
        <span className="mr-2">Gender:</span>
        <label>
          <input
            type="checkbox"
            value="male"
            checked={gender === 'male'}
            onChange={() => handleGenderSelection('male')}
          />
          Male
        </label>
        <label>
          <input
            type="checkbox"
            value="female"
            checked={gender === 'female'}
            onChange={() => handleGenderSelection('female')}
          />
          Female
        </label>
      </div>

      
    </div>
        <div>
          <label htmlFor="level" className="sr-only">
            Level
          </label>
          <input
            id="level"
            name="level"
            type="text"
            autoComplete="level"
            required
            className="appearance-none text-3xl rounded-none relative block w-full px-3 py-2  border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-red-400 focus:z-10 sm:text-sm"
            placeholder="Level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
         </div>
        </div>
          </div>
      
        </form>
          {/* Next Step Navigation */}
          <button
            onClick={handleNextStep}
            className="mt-4 bg-red-400 hover:bg-emerald-400 text-white px-4 py-2 rounded-md text-3xl"
          >
            Next
          </button>
        </div>

        {/* Step 2: Course Selection */}
        <div className={`col-span-1 rounded-lg bg-white p-4 ${activeStep === 2 ? '' : 'hidden'}`}>
          
          <div className="bg-white rounded-lg pr-40 pb-16 overflow-scroll">
          <div className=" p-4 bg-white rounded-lg backdrop-blur-md">
            <h2 className="text-6xl font-bold mb-4">Choose courses</h2>
              <div >
                <button
                                  onClick={() => setShowCoursesDropdown(!showCoursesDropdown)}
                               className=" border border-gray-300 rounded backdrop-blur-md text-left  text-3xl"
                   >
                       {selectedCourses.length > 0 ? selectedCourses.join(', ') : 'Select courses'}
               </button>
                   {showCoursesDropdown && (
                     <div className="bg-white border border-gray-300 mt-1 p-2 rounded absolute z-10  text-3xl">
                     <input
          type="text"
          placeholder="Search courses..."
          value={searchCourseTerm}
          onChange={(e) => setSearchCourseTerm(e.target.value)}
          className="border border-gray-300 rounded pr-32"
        />
        
        {searchCourseTerm && (
          
          <div className="gap-4">
            {filteredCourses.map((course, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`course${index}`}
                  value={course}
                  checked={selectedCourses.includes(course)}
                  onChange={() => handleCourseSelection(course)}
                  className="mr-2"
                />
                <label htmlFor={`course${index}`}>{course}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    )}</div>
       
  </div>
</div>
          {/* Navigation Buttons */}
          <button onClick={handlePreviousStep} className="mr-4 bg-red-400 hover:bg-emerald-400 text-white px-4 py-2 rounded-full">
            Previous
          </button>
          <button onClick={handleNextStep} className="bg-red-400 hover:bg-emerald-400 text-white px-4 py-2 rounded-full">
            Next
          </button>
        </div>

        {/* Step 3: Tag Selection */}
        <div className={`col-span-1 rounded-lg bg-white p-4 ${activeStep === 3 ? '' : 'hidden'}`}>
          
          <div className="bg-white rounded-lg pr-40 pb-16 overflow-scroll">
          <div className=" p-4 bg-white rounded-lg backdrop-blur-md ">
        <h2 className="text-4xl font-bold mb-4">Choose tags</h2>
        <div className=""> 
          <button
            onClick={() => setShowTagsDropdown(!showTagsDropdown)}
            className=" border border-gray-300 rounded backdrop-blur-md text-left  text-3xl"
          >
            {selectedTags.length > 0 ? selectedTags.join(', ') : 'Select tags'}
          </button>
          {showTagsDropdown && (
            <div className=" bg-white border border-gray-300 mt-1 p-2 rounded absolute z-10  text-3xl">
              <input
                type="text"
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className=" border border-gray-300 rounded pr-32"
              />
              {searchTerm && (
                <div className="gap-4">
                  {filteredTags.map((tag, index) => (
                    <div key={index} className=" flex items-center">
                      <input
                        type="checkbox"
                        id={`tag${index}`}
                        value={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagSelection(tag)}
                        className="mr-2"
                      />
                      <label htmlFor={`tag${index}`}>{tag}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
        
         
      
    
  
  
        
       
      </div>
    </div>
         
        </div>

        {/* Signup Button */}
        {activeStep === 3 && (
          <div className=" relative mt-32 justify-center ">
            <button
              type="submit"
              onClick={handleSubmit}
              className=" bg-red-400 hover:bg-emerald-400 text-white text-4xl rounded-full mx-10 px-10 font-semibold focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        )}

        
      </div>
    
  );
  
}

export default Signup;
