import FlowerImg from "../assets/img/header_flower.png"

const Footer = () => {
    return (
        <div className="absolute left-1/2 rotate-180  bottom0 -translate-x-1/2 w-full min-h-40 max-h-60 overflow-hidden">
            <img src={FlowerImg} className="w-full h-full object-contain" alt="header" />
        </div>
    )
}

export default Footer
