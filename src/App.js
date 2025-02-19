// import FallingFlowers from "./components/Falling_flower";
import Header from "./components/Header";
import './index.css';


function App() {
  return (
    <div className="App relative px-4">
      <Header />
      <div className="pt-48 sm:pt-64 flex gap-10 flex-col items-center justify-center">

      <h3 className="text-center text-2xl font-medium  text-gold-base">ТОЙҒА ШАҚЫРУ</h3>

      <h1 className="script-font text-7xl mt-4">Заңғар, Бекзада</h1>
      <p className="text-2xl mt-4">6.07.2025</p> 
      </div>

      <div className="mt-14">
          <p className="uppercase  text-gold-base text-center script-font !text-2xl">Құрметті құда-жекжат, Бауырлар,
Ағайын-туыс, нағашы-җиен,
ДОС-ҖАРАН, БӨЛЕЛЕР, ӘРІПТЕСТЕР,
ҚӨРШІЛЕР!</p>
      </div>
      {/* <FallingFlowers /> */}
    </div>
  );
}

export default App;
