
import avatar from "../assets/images/placeholder.jpg";

const Avatar = () => {
  return ( 
    <img 
      className="rounded-full" 
      height="40" 
      width="40" 
      alt="Avatar" 
      src={avatar}
    />
  );
}

export default Avatar;