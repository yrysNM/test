// import FallingFlowers from "./components/Falling_flower";
import Header from "./components/Header"
import "./index.css"

function App() {
    return (
        <div className="App relative px-4">
            <Header />
            <div className="pt-48 sm:pt-64 flex gap-10 flex-col items-center justify-center">
                <h3 className="text-center text-2xl font-medium  text-gold-base">ТОЙҒА ШАҚЫРУ</h3>

                <h1 className="script-font text-7xl mt-4 text-gold-base">Заңғар, Бекзада</h1>
                <p className="text-2xl mt-4">6.07.2025</p>
            </div>

            <div className="mt-14">
                <p className="uppercase text-gold-base text-center script-font !text-2xl">Құрметті құда-жекжат, Бауырлар, Ағайын-туыс, нағашы-җиен, ДОС-ҖАРАН, БӨЛЕЛЕР, ӘРІПТЕСТЕР, ҚӨРШІЛЕР!</p>

                <p className="text-center text-lg text-black-primary uppercase mt-10">Сіздерді: </p>
                <p className="script-font text-2xl text-gold-base font-semibold text-center mt-5">Заңғар & Бекзаданың</p>

                <p className="uppercase text-gold-base text-center script-font !text-2xl mt-6">шаңырақ көтеру тойына арналып җайылған ақ дастарханымыздың ҚАДІРЛІ ҚОНАҒЫ БОЛУҒА ШАҚЫРАМЫЗ!</p>
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-lg text-black-primary font-medium ">ТОЙ САЛТАНАТЫ:</h2>

                <p className="text-gold-base text-2xl font-semibold mt-4 script-font">
                    6 шілде 2025 жыл <br /> сағат 17:00 де
                </p>

                <div className="mt-8 text-center">
                    <div className="text-gold-base w-1/2 mx-auto script-font !text-[8px] flex justify-center space-x-6">
                        <span>ДУЙСЕНБІ</span>
                        <span>СЕЙСЕНБІ</span>
                        <span>СӘРСЕНБІ</span>
                        <span>БЕЙСЕНБІ</span>
                        <span>ЖҰМА</span>
                        <span>СЕНБІ</span>
                        <span>ЖЕКСЕНБІ</span>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 justify-center w-1/2 mx-auto align-center text-base font-serif gap-1 mt-2">
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                            <div key={day} className={`p-2 ${day === 6 ? "relative text-gold " : ""}`}>
                                {day}
                                {day === 6 && (
                                    <span className="absolute inset-0 flex items-center justify-center -z-1">
                                        <span className="text-base text-gold">❤️</span>
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <h3 className="text-lg font-medium text-black-primary">МЕКЕН-ЖАЙЫМЫЗ:</h3>
                    <p className="text-2xl mt-5">
                        АЛМАТЫ ОБЛЫСЫ, ТАЛҒАР АУДАНЫ, <br />
                        КУЛЬДЖИНСКИЙ ТРАКТ, 26А
                    </p>
                    <p className="text-gold-base script-font text-2xl font-semibold mt-2">“AFIYAT” МЕЙРАМХАНАСЫ</p>
                </div>
            </div>
            {/* <FallingFlowers /> */}
        </div>
    )
}

export default App
