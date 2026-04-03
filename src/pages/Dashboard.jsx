import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon,LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../configs/api';
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const Dashboard = () => {
  const {users,token} =useSelector(state=>state.auth);
  const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a'];
  const [showCreateResumes, setShowCreateResumes] = useState(false);
  const [allResumes, setAllResumes] = useState([]);
  const [showUploadResume, setShowUploadResumes] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');
  const [isLoading,setIsLoading]=useState(false);

  const navigate = useNavigate();
  const extractTextFromPDF = async (file) => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map(item => item.str);
          text += strings.join(" ") + " ";
        }
        resolve(text);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

  const loadAllResumes = async () => {
    try{
      const {data}=await api.get('/api/users/resumes',{headers:{Authorization:`Bearer ${token}`}});
      setAllResumes(data.resumes);
    }catch(error){
      toast.error(error?.response?.data?.message||error.message)
    }
  };

  const createResume = async (event) => {
    try{
    event.preventDefault();
    const {data}=await api.post('/api/resumes/create',{title},{headers:{Authorization:`Bearer ${token}`}});
    setAllResumes([...allResumes,data.resume]);
    setTitle('')
    setShowCreateResumes(false)
    navigate(`/app/builder/${data.resume._id}`);
    }catch(error){
      toast.error(error?.response?.data?.message||error.message)
    }
  };

  const uploadResume = async (event) => {
    event.preventDefault();
    if(!resume){
      toast.error("Please select a pdf file");
      return;
    }
    if(!title.trim()){
      toast.error("Please enter a title for the resume");
      return;
    }
    setIsLoading(true);
    try{
      let resumeText='';
    
    try{
       resumeText =await extractTextFromPDF(resume)
    }catch(error){
      console.error("PDF parsing error:", error);
      toast.error("Failed to read PDF file");
      setIsLoading(false);
      return;
    }
    if (!resumeText || resumeText.trim().length === 0) {
      toast.error("PDF content is empty or unreadable");
      setIsLoading(false);
      return;
    }

    if (resumeText.length < 30) {
      toast.error("PDF text too small or unreadable");
      setIsLoading(false);
      return;
    }
    const {data}=await api.post('/api/ai/upload-resume',{title,resumeText},{headers:{Authorization:`Bearer ${token}`}});
    setTitle('')
    setResume(null)
    setShowUploadResumes(false)

    navigate(`/app/builder/${data.resume._id}`)
    }catch(error){
      console.log("FULL ERROR:", error.response?.data);
      toast.error(error?.response?.data?.message||error.message)
    }finally{
    setIsLoading(false);
    }
  };

  const editTitle = async (event) => {
    try{
    event.preventDefault();
    const {data}=await api.put(`/api/resumes/update`,{resumeId:editResumeId,
      resumeData:{title}},{headers:{Authorization:`Bearer ${token}`}});
      setAllResumes(allResumes.map(resume=>resume._id===editResumeId?{...resume,title}:resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)
    }catch(error){
      toast.error(error?.response?.data?.message||error.message)
    }
  };

  const deleteResume = async (resumeId) => {
    try{
      const confirm = window.confirm('Are you sure you want to delete this resume?');
    if (confirm){
      const {data}=await api.delete(`/api/resumes/delete/${resumeId}`,{headers:{Authorization:`Bearer ${token}`}});
      setAllResumes(allResumes.filter(resume=>resume._id!==resumeId));
      toast.success(data.message);
    }
    }catch(error){
      toast.error(error?.response?.data?.message||error.message)
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Raji
        </p>

        {/* Create & Upload Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResumes(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-b from-blue-300 to-blue-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-blue-600 transition-all duration-300">Create Resume</p>
          </button>

          <button
            onClick={() => setShowUploadResumes(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-b from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">Upload Existing</p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        {/* Resume Cards */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes
          .filter((r)=>r!==null && r!==undefined)
          .map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + '40',
                }}
              >
                <FilePenLineIcon className="size-7 group-hover:scale-105 transition-all" style={{ color: baseColor }} />
                <p
                  className="text-sm group-hover:scale-105 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title || 'Untitled Resume'}
                </p>
                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColor + '90' }}
                >
                  Updated on {resume?.updatedAt
                  ? new Date(resume.updatedAt).toLocaleDateString(): "N/A"}
                </p>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1.5 hover:bg-white/50 text-slate-700 rounded transition-colors cursor-pointer"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 text-slate-700 rounded transition-colors cursor-pointer"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Create Resume Modal */}
        {showCreateResumes && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResumes(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border focus:border-blue-600 ring-blue-600"
                required
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-blue-700 transition-colors">
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResumes(false);
                  setTitle('');
                }}
              />
            </div>
          </form>
        )}

        {/* Upload Resume Modal */}
        {showUploadResume && (
          <div
            onClick={() => setShowUploadResumes(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center px-4"
          >
            <form
              onSubmit={uploadResume}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-semibold mb-4 text-slate-700">Upload Resume</h2>
              <input   
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:border-blue-600 ring-blue-600"
                required
              />
                <label htmlFor="resume-input" className="block cursor-pointer text-sm text-slate-700">
                  Select resume file
                  <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-blue-500 hover:text-blue-700 cursor-pointer transition-colors p-4 rounded">
                    {resume ? (
                      <p className="text-blue-700 font-medium text-sm break-all">{resume.name}</p>
                    ) : (
                      <>
                        <UploadCloud className="size-14 stroke-1" />
                        <p className="text-sm">Upload resume</p>
                      </>
                    )}
                  </div>
                </label>
                <input  id="resume-input" type="file" accept="application/pdf" className="hidden"
                onChange={(e) => { const file = e.target.files[0];
                 if (!file) return;
                  const isPDF =
                  file.type === "application/pdf" ||
                  file.name.toLowerCase().endsWith(".pdf");
                if (!isPDF) {
                  toast.error("Only PDF files are allowed");
                  return;
                }
                setResume(file);
              }}/>
              <button type="submit" disabled={isLoading} className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                {isLoading && <LoaderCircle className='animate-spin size-4 text-white'/>}
                {isLoading ? 'uploading..':'Upload Resume'}
                
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowUploadResumes(false);
                  setTitle('');
                  setResume(null)
                }}
              />
            </form>
          </div>
        )}

        {/* Edit Title Modal */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId('')}
            className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 border focus:border-blue-600 ring-blue-600"
                required
              />

              <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Update
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setEditResumeId('');
                  setTitle('');
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
