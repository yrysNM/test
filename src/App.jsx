// import FallingFlowers from "./components/Falling_flower";
import Header from "./components/Header"
import "./index.css"
import Countdown from "./components/Countdown"
import RSVPForm from "./components/RSVPForm"
import Footer from "./components/Footer"
import MobileCheck from "./components/MobileCheck"

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
                {/* <FallingFlowers /> */}
            </div>
        </MobileCheck>
    )
}

export default App
