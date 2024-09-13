import { useContext } from 'react';
import './index.css';
import { MenuContext } from '../../Context/MenuContext';

export const Menu = () => {

    const { classMenu } = useContext(MenuContext);

    return (
        <>
            <div className={!classMenu ? "menu-escondido" : "show-menu"}>
                <div className="row justify-content-end">
                    <div className="col-6 p-0">
                        <ul className="col-12 list-menu">
                            <li className='col-12'>Item 1</li>
                            <li className='col-12'>Item 2</li>
                            <li className='col-12'>Item 3</li>
                            <li className='col-12'>Item 4</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}