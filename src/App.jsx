// import FallingFlowers from "./components/Falling_flower";
import Header from "./components/Header"
import "./index.css"
import Countdown from "./components/Countdown"
import RSVPForm from "./components/RSVPForm"
import Footer from "./components/Footer"

function App() {
    return (
        <div className="App relative px-4">
            <Header />
            <div className="pt-48 sm:pt-64 flex gap-10 flex-col items-center justify-center">
                <h3 className="text-center text-2xl font-medium  text-gold-base">ТОЙҒА ШАҚЫРУ</h3>

                <h1 className="text-center script-font text-5xl mt-4 text-gold-base">Заңғар & Бекзада</h1>
                <p className="text-2xl mt-4">6.07.2025</p>
            </div>

            <div className="mt-14">
                <p className="uppercase text-gold-base text-center script-font text-lg">Құрметті құда-жекжат, Бауырлар, Ағайын-туыс, нағашы-җиен, ДОС-ҖАРАН, БӨЛЕЛЕР, ӘРІПТЕСТЕР, ҚӨРШІЛЕР!</p>

                <p className="text-center text-lg text-black-primary uppercase mt-10">Сіздерді: </p>
                <p className="script-font text-2xl text-gold-base font-semibold text-center mt-5">Заңғар & Бекзаданың</p>

                <p className="uppercase text-gold-base text-center script-font text-lg mt-6">шаңырақ көтеру тойына арналып җайылған ақ дастарханымыздың ҚАДІРЛІ ҚОНАҒЫ БОЛУҒА ШАҚЫРАМЫЗ!</p>
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-lg text-black-primary font-medium">ТОЙ САЛТАНАТЫ:</h2>

                <p className="text-gold-base text-2xl sm:text-3xl font-semibold mt-8 script-font">
                    6 шілде 2025 жыл <br /> сағат 17:00 де
                </p>

                <div className="mt-12 text-center max-w-lg mx-auto">
                    <div className="text-gold-base script-font text-[7px] flex justify-around ">
                        <span>ДҮЙСЕНБІ</span>
                        <span>СЕЙСЕНБІ</span>
                        <span>СӘРСЕНБІ</span>
                        <span>БЕЙСЕНБІ</span>
                        <span>ЖҰМА</span>
                        <span>СЕНБІ</span>
                        <span>ЖЕКСЕНБІ</span>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 justify-center text-base sm:text-lg font-serif mt-4">
                        {[...Array(31)].map((_, index) => {
                            const day = index + 1
                            return (
                                <div key={day} className={`p-2 sm:p-3 relative ${day === 6 ? "text-white font-medium" : ""}`}>
                                    {day}
                                    {day === 6 && (
                                        <span className="absolute inset-0 flex -z-10 items-center justify-center">
                                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gold-base absolute -z-10" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>
                                        </span>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <h3 className="text-base font-medium text-black-primary">МЕКЕН-ЖАЙЫМЫЗ:</h3>
                    <p className="text-sm text-black-primary mt-5">
                        АЛМАТЫ ОБЛЫСЫ, ТАЛҒАР АУДАНЫ, <br />
                        КУЛЬДЖИНСКИЙ ТРАКТ, 26А&nbsp;
                        <span className="text-gold-base script-font text-2xl font-semibold mt-2">“AFIYAT”</span>&nbsp; МЕЙРАМХАНАСЫ
                    </p>
                </div>

                <div className="mt-12 text-center">
                    <h3 className="text-gold-base script-font text-2xl font-semibold">Қалай жетуге долады:</h3>

                    <p className="mt-5 text-gold-base text-lg">СІЗГЕ ЫҢҒАЙЛЫ БОЛУ ҮШІН ОСЫ ҚАРТАНЫ ҚОЛДАНЫҢЫЗ</p>

                    <div
                        id="map"
                        style={{
                            widhth: 200,
                            height: 200,
                        }}></div>
                </div>
            </div>
            <div className="mt-12 text-center">
                <h1 className="script-font text-2xl text-gold-base">Той иелері: </h1>
                <p className="mt-2 text-gold-base script-font text-5xl">Заңғар - Бекзада</p>
            </div>

            <div className="mt-12 text-center">
                <p className="text-gold-base script-font text-2xl">ТОЙ САЛТАНАТЫНА ДЕЙІНГІ:</p>
                <div className="mt-5">
                    <Countdown />
                </div>
            </div>
            <div className="mt-12">
                <RSVPForm />
            </div>

            <Footer />
            {/* <FallingFlowers /> */}
        </div>
    )
}

export default App
