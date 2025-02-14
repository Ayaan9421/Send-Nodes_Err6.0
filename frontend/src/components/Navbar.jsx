import { GalleryHorizontal, House, UserRoundPen } from "lucide-react";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <div className="w-full">
        <div className="text-[1.5rem] navbar my-2 pl-8 pr-4 h-10vh bg-slate-600 rounded-b-lg justify-between rounded-t-md">
          <div>Logo</div>
          <div>
            <ul className="flex justify-between items-center">
              <li className="mr-6 cursor-pointer hover:scale-105 transition-transform duration-400 hover:bg-slate-500 p-1 rounded-lg tooltip" data-tip="Home">
                <Link to="/home"><House /></Link>
              </li>
              <li className="mr-6 cursor-pointer hover:scale-105 transition-transform duration-400 hover:bg-slate-500 p-1 rounded-lg tooltip" data-tip="Gallery">
                <Link to="/gallery"><GalleryHorizontal /></Link>
              </li>
              <li className="mr-6 cursor-pointer hover:scale-105 transition-transform duration-400 hover:bg-slate-500 p-1 rounded-lg tooltip" data-tip="Profile">
                <Link to="/profile"><UserRoundPen /></Link>
              </li>
              <li className="mr-4 cursor-pointer">
                <button className="text-[1rem] btn bg-slate-200 text-black hover:text-white cursor-pointer tooltip" data-tip="Create Capsules"><Link to="/create">Create +</Link></button>
              </li>
              <li className="cursor-pointer">
                <button className="text-[1rem] btn bg-blue-700 border-none text-white cursor-pointer tooltip" data-tip="Login">
                    <Link to="/login">Logout</Link>
                </button>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  export default Navbar;
  