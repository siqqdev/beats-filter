interface SimpleUploadPageProps {}

const SimpleUploadPage: React.FC<SimpleUploadPageProps> = () => {
    return (
        <div className="p-5">
      <div className="pr-4 ">
        <div className="mb-2 flex">
          <p className="w-1/4 font-bold mt-1">Name</p>
          <input placeholder='Name' className="w-3/4 p-1 bg-gray-100 hover:bg-gray-200 rounded-md" type="text" />
        </div>
        <div className="mb-2 flex">
          <p className="w-1/4 font-bold mt-1">Key</p>
          <input placeholder='Key' className="w-3/4 p-1 bg-gray-100 hover:bg-gray-200 rounded-md" type="text" />
        </div>
        <div className="mb-2 flex">
          <p className="w-1/4 font-bold mt-1">Bpm</p>
          <input className="w-3/4 p-1 bg-gray-100 hover:bg-gray-200 rounded-md" type="text" placeholder='BPM' />
        </div>
        <div className="mb-2 flex">
          <p className="w-1/4 font-bold mt-1">Prods nicknames</p>
          <input placeholder='Producers nicknames' className="w-3/4 p-1 bg-gray-100 hover:bg-gray-200 rounded-md" type="text" />
        </div>
        <div className="flex">
          <p className="w-1/4 font-bold mt-1">Choose Genre</p>
          <select name="genre" className="w-3/4 p-1.5 rounded-md bg-gray-100 hover:bg-gray-200">
            <option>Choose</option>
            <option value="HyperTrap">Hyper trap</option>
            <option value="NewzJazz">New jazz</option>
            <option value="DarkTrap">Dark trap</option>
            <option value="Trap">Trap</option>
            <option value="Freestyle">Freestyle</option>
            <option value="LofiTrap">Lo-fi trap</option>
            <option value="Edm">Edm</option>
            <option value="Plugg">Plugg</option>
            <option value="JerseyClub">Jersey Club</option>
            <option value="EmoRap">Emo rap</option>
            <option value="Detroit">Detroit</option>
            <option value="RnBTrap">R&B trap</option>
            <option value="Rock">Rock</option>
            <option value="IndieRock">Indie Rock</option>
            <option value="Alternative">Alternative</option>
          </select>
        </div>
      </div>
            <div className='w-1/4'>
                <p className="mb-2 flex justify-left mt-4">Mp3 File</p>
                <div className="flex justify-left ">
                <input className="bg-gray-300 hover-bg-gray-400 rounded-lg hover:bg-slate-400" type="file" multiple={false} />
                </div>
                <div className="flex justify-left mt-2">
                <button className="bg-yellow-100 rounded font-bold p-1 hover:bg-yellow-200" >Submit</button>
                </div>
                </div>
            </div>
        )
}
export default SimpleUploadPage;