'use client';
import {useState, useEffect} from "react"
import axios from 'axios';
import { useRouter } from 'next/navigation';


const CreateGroupForm = ({ userId }) => {
  const [groupData,setgroupData] = useState({
    groupname: "",
    code: ""
  })

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setgroupData({
      ...groupData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(()=>{
    groupData.groupname.length > 0 &&
    groupData.code.length > 0
    console.log("Component updated")
  },[(groupData)])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response  = await axios.post('/api/group-creation',groupData);
      console.log('Group Created', response.data);
      alert('Group created successfully!');
      router.push('/join-room');
    } 
    catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group. Please try again.');
    }
  };

  console.log(groupData);

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 space-y-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Create a New Group</h2>
      
      {/* Group Name Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Group Name</label>
        <input
          type="text"
          name="groupname"
          value={groupData.groupname}
          onChange={handleChange}
          placeholder="Enter group name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      
      {/* Group Code Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Group Code</label>
        <input
          type="text"
          value={groupData.code}
          name="code"
          onChange={handleChange}
          placeholder="Enter unique group code"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Create Group
      </button>
      <div className="text-blue-600">
      {loading ? 'Processing...' : 'Free Group Creation'}
      </div>
    </form>
  );
};

export default CreateGroupForm;
