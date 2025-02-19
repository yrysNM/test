import FlowerImg from "../assets/img/header_flower.png";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full min-h-40 max-h-60 overflow-hidden">
      <img
        src={FlowerImg}
        className="w-full h-full object-contain"
        alt="header"
      />
    </div>
  );
};

export default Header;
