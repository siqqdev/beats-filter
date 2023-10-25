import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Player from "./components/Player";
import UploadPage from "./components/UploadPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <div>
      
      <header className="text-2xl text-white font-bold flex justify-center bg-gray-950 h-20 rounded-b-lg">
        <a className=' mt-5 mr-6 hover:underline hover:text-gray-400' href="/home">Home</a>
        <a className=' mt-5 hover:underline hover:text-gray-400' href="/upload">Upload</a>
      </header>
    <div>
    <BrowserRouter> 
          <Routes>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/upload" element={<UploadPage />}/>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>        
        </BrowserRouter>
    </div>
    {/* <HomePage/>
    <Player receivedBeats={[]}/>
    <UploadPage /> */}
    </div>
  );
}

export default App;
