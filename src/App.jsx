import HeartImg from "./assets/img/heart.png"
import Header, { Names2 } from "./components/Header"
import "./index.css"
import Countdown from "./components/Countdown"
import MobileCheck from "./components/MobileCheck"
import DividerImg from "./assets/img/divider.png"
import Footer from "./components/Footer"
import CircleAU from "./components/CircleAU"
import RSVPForm from './components/RSVPForm'

const Divider = () => {
    return (
        <div className="mx-auto h-9 w-36 my-10">
            <img className="object-cover" src={DividerImg} alt="test" />
        </div>
    )
}

const CircleImg = ({ className }: { className: string }) => {
    return (
        <div className={`absolute  w-[320px] h-[320px]  ${className}`}>
            <CircleAU />
        </div>
    )
}

function App() {
    return (
        <MobileCheck>
            <div className="App relative">
                <Header />

                <div className="text-center uppercase font-playfair mt-10 leading-[23px] text-adjust-auto origin-center">
                    құрметті ағайын-туыс,
                    <br />
                    құда-жекжат, нағашы-жиендер,
                    <br />
                    дос-жарандар, көршілер
                    <br />
                    және әріптестер!
                </div>

                <div className="mt-10 text-center relative ">
                    <h2 className="uppercase font-montserrat text-xl">сіздерді ұлымыз</h2>
                    
                    <CircleImg className="-right-56 -top-24 opacity-15 -z-10" />

                    <div className="relative">
                        <Names2 />
                    </div>
                    <div className="mt-56 relative">

                    <CircleImg className="-left-56 top-8 opacity-15 -z-10" />

                        <p className="font-playfair text-adjust-auto transform origin-center leading-[23px]">
                            келініміздің үйлену <br />
                            тойына арналған ақ
                            <br />
                            дастарханымыздың <br />
                            қадірлі қонағы болуға
                            <br />
                            шақырамыз!
                        </p>
                    </div>

                    <Divider />
                    <div className="text-xl  font-montserrat">ТОЙ ИЕЛЕРІ:</div>
                    <div className="text-xl font-playfair">АТА-ӘЖЕСІ</div>
                    <div className="text-8xl font-cursive text-center font-kazak text-blue-base mt-2">Шалкар - Гулжан</div>
                    <Divider />

                    <div className="text-3xl  font-montserrat">ТОЙ САЛТАНАТЫ:</div>
                    <div className="text-8xl font-kazak text-blue-base mt-2">6 шілде 2025</div>
                    <div className="text-3xl font-semibold mt-3 flex flex-row justify-around py-1 border mx-auto">
                        <span>Шілде</span>
                        <span>2025</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 w-10/12 relative mx-auto text-sm mt-2">
                        {["ДС", "СС", "СР", "БС", "ЖМ", "СБ", "ЖС"].map((day, index) => (
                            <div key={index} className="font-playfair">
                                {day}
                            </div>
                        ))}
                        {Array.from({ length: 31 }, (_, i) => (
                            <div key={i} className={`py-1 px-2 rounded-full ${i + 1 === 6 ? "relative" : ""}`}>
                                {i + 1}
                                {i + 1 === 6 && <img src={HeartImg} alt="test" className="animate-pulse absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-10 -z-10" />}
                            </div>
                        ))}
                        
                    <CircleImg className="-right-56 -top-24 opacity-10 -z-10" />
                    </div>
                    <div className="text-2xl text-gray-700 mt-10 font-playfair">БАСТАЛУ УАҚЫТЫ:</div>
                    <div className="flex items-center justify-center mt-2 mx-auto w-10/12">
                        <div className="border-t border-gray-400 flex-grow mr-2"></div>
                        <div className="text-2xl font-medium text-black-primary">18:00</div>
                        <div className="border-t border-gray-400 flex-grow ml-2"></div>
                    </div>

                    <div className="mt-2 p-2">
                        <Countdown />
                    </div>

                    <div className="mt-10">
                        <h3 className="font-playfair text-2xl">Мекен-Жайымыз: </h3>
                        <div className="border-t border-gray-400 w-1/2 mt-2 mx-auto"></div>
                        <div className="tn-atom text-adjust-auto transform font-medium origin-center leading-6 uppercase mt-4">
                            <span className="font-montserrat">Семей қаласы,</span>
                            <br />
                            <span className="font-playfair">​Найманбаев көшесі, 228</span>
                        </div>
                        <p className="mt-2 text-blue-base font-playfair text-3xl">"Eкi Жұлдыз"</p>

                        <div id="map" className="mx-2 overflow-hidden rounded-lg border shadow  mt-4 h-52"></div>
                    </div>

                    <Divider />
                </div>
                <RSVPForm />
                <Divider />
                <Footer />
            </div>
        </MobileCheck>
    )
}

export default App
