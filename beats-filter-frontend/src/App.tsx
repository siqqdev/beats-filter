import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import UploadPage from "./components/UploadPage";
import NotFoundPage from "./components/NotFoundPage";
import SimpleUploadPage from "./components/simpleUploadPage";

function App() {
  return (
    <div>
      <header className=" bg-gray-950 h-20 rounded-b-lg">
        <div className="text-2xl text-white font-bold flex justify-center">
        <a className=' mt-5 mr-6 hover:underline hover:text-gray-400' href="/">Home</a>
        <a className=' mt-5 hover:underline hover:text-gray-400' href="/upload">Upload</a>
        <a className=' mt-5 hover:underline hover:text-gray-400 ml-6' href="/simple-upload">Simple Upload</a>
        </div>
      </header>
        <div>
        <BrowserRouter> 
              <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/upload" element={<UploadPage />}/>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/simple-upload" element={<SimpleUploadPage/>} />
              </Routes>        
            </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
