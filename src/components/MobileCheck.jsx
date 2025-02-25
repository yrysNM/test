const MobileCheck = ({ children }) => {
    return (
        <>
            {/* Mobile View */}
            <div className="md:hidden">{children}</div>

            {/* Desktop Warning */}
            <div className="hidden md:flex min-h-screen flex-col items-center justify-center px-4 text-center bg-[#8097c9]/5">
                <div className="max-w-lg mx-auto">
                    <h1 className="text-3xl text-[#8097c9] script-font mb-4">Құрметті қонақ!</h1>
                    <p className="text-xl mb-8">Шақыру қағазын көру үшін ұялы телефоныңызды пайдаланыңыз</p>
                    <div className="text-[#8097c9]">
                        <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H7V4h10v16z" />
                            <path d="M12 18c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileCheck
