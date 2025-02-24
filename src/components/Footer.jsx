import Test1 from "../assets/img/test2.png"

const Footer = () => {
    return (
        <footer className="mt-10 text-center pb-8">
            <div className="max-w-md mx-auto px-4 mb-10 relative">
                <p className="text-black-primary font-playfair text-lg font-medium">Келіңіздер, қадірлі қонағымыз болыңыздар!</p>

                <div className="mt-14 flex flex-row absolute -z-10 -bottom-20 left-0">
                    <img src={Test1} alt="test" className="object-contain w-1/3" />
                    <img src={Test1} alt="test" className="object-contain w-1/3" />
                    <img src={Test1} alt="test" className="object-contain w-1/3" />
                </div>
            </div>
        </footer>
    )
}

export default Footer
