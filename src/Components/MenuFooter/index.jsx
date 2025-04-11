import './index.css';
import { ListAdm } from './ListAdm';
import { ListUser } from './ListUser';

export const MenuFooter = ({user}) => {
  return (
    <>
      <div className="menu-footer">
        {user?.ADM && <ListAdm user={user}/>}
        {!user?.ADM && <ListUser user={user}/>}
      </div>
    </>
  )
}