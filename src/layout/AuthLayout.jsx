import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"

function AuthLayout({ children }) {
    return (
        <div className="flex flex-col justify-between bg-black text-white">
            <div className="relative w-full min-h-screen"
                style={{
                    backgroundImage: "url('/img/auth-bg.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'brightness(1.1) contrast(1.1) saturate(1.1)'
                }}>
                <Header />
                <main className="flex justify-center flex-1">
                  <div className="w-full">{children}</div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default AuthLayout
