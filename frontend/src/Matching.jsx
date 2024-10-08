import React, { useState, useEffect } from "react";
import axios from "axios";




 const tags = [
    "Artificial Intelligence",
    "Computer Science",
    "Data Science",
    "Web Development",
    "Software Engineering",
    "Computer Networking",
    "Database Systems",
    "Computer Graphics",
    "UX/UI Design",
    "Embedded Systems",
    "Cryptography",
    "Quantum Computing",
    "Blockchain",
    "Internet of Things",
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Digital Marketing",
    "Cloud Computing",
    "Big Data",
    "Hadoop",
    "Spark",
    "AWS",
    "Azure",
    "GCP",
    "Docker",
    "Kubernetes",
    "Linux",
    "Git",
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "PHP",
    "Ruby",
    "Swift",
    "Objective-C",
    "R",
    "MATLAB",
    "Scratch",
    "Excel",
    "Word",
    "PowerPoint",
    "Microsoft Access",
    "HTML",
    "CSS",
    "Angular",
    "React",
    "Vue",
    "Redux",
    "Flask",
    "Django",
    "Laravel",
    "Spring",
    "Hibernate",
    "TensorFlow",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Jupyter Notebook",
    "OpenCV",
    "SOLID",
    "GRASP",
    "Singleton",
    "Observer",
    "Factory Method",
    "Prototype",
    "Bridge",
    "Composite",
    "Decorator",
    "Facade",
    "Flyweight",
    "Adapter",
    "Proxy",
    "Chain of Responsibility",
    "Command",
    "Interpreter",
    "Iterator",
    "Mediator",
    "Memento",
    "State",
    "Strategy",
    "Template Method",
    "Visitor",
    "LEAN Startup",
    "Agile Development",
    "Scrum",
    "Kanban",
    "Lean Software Development",
    "Spiral Model",
    "V Model",
    "Waterfall Model",
    "Software Requirements",
    "Software Architecture",
    "Software Design",
    "Software Testing",
    "Software Deployment",
    "Software Maintenance",
    "Software Evolution",
    "Software Process",
    "Software Engineering Models",
    "Software Quality",
    "Software Configuration Management",
    "Software Project Management",
    "Software Release Management",
    "Software Development Lifecycle",
    "Software Development Methodologies",
    "Software Development Processes",
    "Software Development Standards",
    "Software Development Tools",
    "Software Development Techniques",
    "Software Development Methodologies",
    "Software Development Paradigms",
    "Software Development Styles",
    "Software Development Trends",
    "Software Development Life Cycle Models",
    "Software Development Frameworks",
    "Software Development Methods",
    "Software Development Principles",
    "Software Development Theories",
    "Software Development Techniques",
    "Software Development Values",
    "Software Development Approaches",
    "Software Development Best Practices",
    "Software Development Methodologies",
    "Software Development Paradigms",
    "Software Development Patterns",
    "Software Development Practices",
    "Software Development Styles",
    "Software Development Trends",
    "Software Development Values",
    "Software Development Metrics",
    "Software Development Evaluation",
    "Software Development Estimation",
    "Software Development Budgeting",
    "Software Development Resource Management",
    "Software Development Human Resource Management",
    "Software Development Organizational Resource Management",
    "Software Development Team Building",
    "Software Development Talent Management",
    "Software Development Workforce Management",
    "Software Development Skill Management",
    "Software Development Learning and Development",
    "Software Development Employee Engagement",
    "Software Development Employee Satisfaction",
    "Software Development Performance Management",
    "Software Development Workflow Management",
    "Software Development Collaboration",
    "Software Development Participation",
    "Software Development Sharing",
    "Software Development Innovation",
    "Software Development Experimentation",
    "Software Development Discovery",
    "Software Development Risk Management",
    "Software Development Failure Analysis",
    "Software Development Root Cause Analysis",
    "Software Development Debugging",
    "Software Development Problem Solving",
    "Software Development Quality Assurance",
    "Software Development Code Review",
    "Software Development Test Driven Development",
    "Software Development Continuous Integration",
    "Software Development Continuous Deployment",
    "Software Development DevOps",
    "Software Development Technical Debt Management",
    "Software Development Tech Debt",
    "Software Development Systematic Debt Management",
    "Software Development Cost-Benefit Analysis",
    "Software Development Investment Analysis",
    "Software Development Payback Period",
    "Software Development Break-Even Point",
    "Software Development Cash Flow Management",
    "Software Development Capital Budgeting",
    "Software Development Zero-Based Budgeting",
    "Software Development Budget Allocation",
    "Software Development Budget Execution",
    "Software Development Budget Control",
    "Software Development Performance Measurement",
    "Software Development Benchmarking",
    "Software Development Metrics Analysis",
    "Software Development Business Intelligence",
    "Software Development Decision Making",
    "Software Development Forecasting",
    "Software Development Simulation",
    "Software Development Visualization",
    "Software Development Modeling",
    "Software Development Strategy",
    "Software Development Tactics",
    "Software Development Grand Strategy",
    "Software Development Mega Trends",
    "Software Development Gartner Hype Cycle",
    "Software Development Futures",
    "Software Development Emerging Technologies",
    "Software Development Future of Work",
    "Software Development Innovation Ecosystem",
    "Software Development Startup Ecosystem",
    "Software Development Accelerator Ecosystem",
    "Software Development Investor Ecosystem",
    "Software Development Tech Ecosystem",
    "Software Development Tech Stack",
    "Software Development Stack Overflow",
    "Software Development Stack Exchange",
    "Software Development Developer Ecosystem",
    "Software Development Research Ecosystem",
    "Software Development Academia Ecosystem",
    "Software Development Community Ecosystem",
    "Software Development Ecosystems",
    "Software Development Platform Ecosystems",
    "Software Development Ecosystem Evolution",
    "Software Development Ecosystem Development",
    "Software Development Ecosystem Dynamics",
    "Software Development Ecosystem Modeling",
    "Software Development Ecosystem Analysis",
    "Software Development Ecosystem Assessment",
    "Software Development Ecosystem Prediction",
    "Software Development Ecosystem Simulation",
    "Software Development Ecosystem Visualization",
    "Software Development Ecosystem Metrics",
    "Software Development Ecosystem Benchmarking",
    "Software Development Ecosystem Buzz",
    "Software Development Ecosystem Growth",
    "Software Development Ecosystem Health",
    "Software Development Ecosystem Management",
    "Software Development Ecosystem Strategy",
    "Software Development Ecosystem Tactics",
    "Software Development Ecosystem Innovation",
    "Software Development Ecosystem Participation"
];

function Matching() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTagsDropdown, setShowTagsDropdown] = useState(false);
  const [filteredTags, setFilteredTags] = useState([]);

  const handleRequestMeeting = () => {
    window.location.href = '/chathome'; 
  };
  useEffect(() => {
    // Filter tags based on search term
    const filtered = tags.filter(tag =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTags(filtered);
  }, [searchTerm]);

  const startMatching = async () => {
    try {
      setLoading(true);
      // Simulating user ID here (should be retrieved from your authentication system)
      const userId = "21100911";
      // Sending a post request to the server to initiate matching
      const response = await axios.post("http://localhost:3301/matching", {
        userId,
        matchingTags: selectedTags,
      });
      setMatchedUser(response.data.matchedUser);
      setLoading(false);
    } catch (error) {
      console.error("Error matching:", error);
      setLoading(false);
    }
  };

  const handleTagSelection = (tag) => {
    const newSelectedTags = [...selectedTags];
    const index = newSelectedTags.indexOf(tag);
    if (index > -1) {
      newSelectedTags.splice(index, 1);
    } else {
      newSelectedTags.push(tag);
    }
    setSelectedTags(newSelectedTags);
  };

  return (
    <> 
    
     <h1 className="text-center text-9xl font-chart font-extrabold mt-8 ">MATCHING</h1>
    <div className="flex flex-col items-center justify-center h-screen">
     
      
      <div className="flex flex-col items-center  px-4">
        <h2 className="text-5xl pb-5">Choose Matching Tags</h2>
        <div className="flex flex-col items-center pb-10 ">
          <button
            onClick={() => setShowTagsDropdown(!showTagsDropdown)}
            className="rounded backdrop-blur-md text-left text-4xl"
          >
            {selectedTags.length > 0 ? selectedTags.join(', ') : 'Select tags'}
          </button>
          {showTagsDropdown && (
            <div className="bg-white bg-opacity-50 border mt-1 p-2 rounded z-10 text-4xl">
              <input
                type="text"
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded pr-8 text-3xl"
              />
              {searchTerm && (
                <div className="gap-2">
                  {filteredTags.slice(0, 5).map((tag, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`tag${index}`}
                        value={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagSelection(tag)}
                        className="mr-2 text-xl"
                      />
                      <label htmlFor={`tag${index}`} className="text-3xl">{tag}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <button onClick={startMatching} disabled={loading} className="text-3xl rounded-full bg-blue-400 hover:bg-blue-500 px-10 text-white mb-6 ">
          Start Matching
        </button>
      </div>
      {matchedUser && (
         <div className="border rounded-lg text-blue-500 bg-white p-4 flex justify-between items-start">
         <div>
           <h2 className="text-3xl  ">Matched User</h2>
           <p>User ID: {matchedUser.userId}</p>
           <p>Email: {matchedUser.email}</p>
           <p>College: {matchedUser.college}</p>
           <p>Rank: {matchedUser.rank}</p>
           
         </div>
         <div className="flex flex-col pl-6">
           <button onClick={handleRequestMeeting} className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-2">Request Meeting</button>
           <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Re-Match</button>
         </div>
       </div>
      )}
      {loading && <p>Loading...</p>}
    </div></>
   
  );
}

export default Matching;