import { Menu } from "../Menu"
import { Navbar } from "../Navbar"
import './index.css';

export const Index = () => {
    return (
      <>
        <div className="body">
          <Navbar />
          <Menu />
        </div>
      </>
    );
}