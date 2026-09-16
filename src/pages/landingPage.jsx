import { Link } from "react-router-dom";
import {
    FaShippingFast,
    FaShieldAlt,
    FaHeadset,
    FaLaptop,
    FaMicrochip,
    FaKeyboard,
    FaDesktop,
    FaArrowRight,
} from "react-icons/fa";
// mock ekak - real data eka backend eken ganna one (useEffect + axios)
const featuredProducts = [
    {
        productId: "PC-1001",
        name: "Ryzen 7 Custom Build",
        price: 285000,
        labelldPrice: 315000,
        images: ["/products/pc-1.png", "/products/pc-1-alt.png"],
    },
    {
        productId: "PC-1002",
        name: "RTX 4060 Gaming Rig",
        price: 410000,
        labelldPrice: 410000,
        images: ["/products/pc-2.png", "/products/pc-2-alt.png"],
    },
    {
        productId: "PC-1003",
        name: "15.6\" ThinkPad E14",
        price: 198000,
        labelldPrice: 225000,
        images: ["/products/laptop-1.png", "/products/laptop-1-alt.png"],
    },
    {
        productId: "PC-1004",
        name: "Mechanical RGB Keyboard",
        price: 12500,
        labelldPrice: 15900,
        images: ["/products/keyboard-1.png", "/products/keyboard-1-alt.png"],
    },
];

const categories = [
    { name: "Laptops", link: "/products?category=laptops", icon: <FaLaptop /> },
    { name: "Components", link: "/products?category=components", icon: <FaMicrochip /> },
    { name: "Peripherals", link: "/products?category=peripherals", icon: <FaKeyboard /> },
    { name: "Monitors", link: "/products?category=monitors", icon: <FaDesktop /> },
];

// local formatter - oyage utils/price.js eka thiyenawa nam eka use karanna,
// mehema hadala thiyenne meka standalone karanna witharai
function formatPrice(value) {
    return "Rs. " + value.toLocaleString("en-LK");
}

// oyage ProductCard eke pattern ekama - image swap on hover, price + strikethrough
function FeaturedProductCard({ product }) {
    return (
        <Link
            to={"/overview/" + product.productId}
            className="w-[300px] h-[350px] m-4 rounded-2xl bg-white overflow-hidden shadow-lg hover:[&_.main-image]:opacity-0 relative"
        >
            <div className="bg-white absolute top-0 w-full p-2">
                <img src={product.images[1]} alt={product.name} className="w-full h-[200px] object-cover" />
            </div>

            <div className="bg-white main-image w-full absolute transition opacity duration-500 p-4 flex justify-center items-center">
                <img src={product.images[0]} alt={product.name} className="w-[220px] h-[200px] object-cover p-4 pt-2" />
            </div>

            <div className="h-[150px] absolute bottom-0 w-full flex items-center justify-center flex-col p-2">
                <span className="opacity-20">{product.productId}</span>
                <h1>{product.name}</h1>
                {product.labelldPrice > product.price && (
                    <p className="text-sm text-red-400 line-through opacity-60">
                        {formatPrice(product.labelldPrice)}
                    </p>
                )}
                <p className="font-bold">{formatPrice(product.price)}</p>
            </div>
        </Link>
    );
}

export default function LandingPage() {
    return (
        <div className="w-full flex flex-col">

            {/* Hero */}
            <section className="w-full bg-secondary relative overflow-hidden">
                <div className="max-w-[1200px] mx-auto w-full flex flex-col-reverse lg:flex-row items-center gap-10 px-6 py-16 lg:py-24">

                    <div className="w-full lg:w-1/2 flex flex-col items-start">
                        <span className="bg-accent/15 text-accent border border-accent/40 rounded-full px-4 py-1 text-sm">
                            Genuine parts, assembled in Colombo
                        </span>

                        <h1 className="text-4xl lg:text-5xl font-extrabold text-white mt-6 leading-tight">
                            Pick the parts.
                            <br />
                            We build the machine.
                        </h1>

                        <p className="text-white/70 mt-5 max-w-[440px]">
                            From a quiet home office desktop to a full RTX gaming rig,
                            I-Computer sources, tests and assembles every build before
                            it reaches your door.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <Link
                                to="/products"
                                className="bg-accent text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-accent/90 transition"
                            >
                                Shop all products <FaArrowRight />
                            </Link>
                            <Link
                                to="/products?category=components"
                                className="border border-white/30 text-white font-bold px-6 py-3 rounded-2xl hover:bg-white/10 transition"
                            >
                                Build your own PC
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 flex justify-center">
                        <img
                            src="/logo.png"
                            alt="Custom desktop build"
                            className="w-[320px] lg:w-[420px] drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* subtle grid pattern in the corner, ties to the "circuit" feel without being a cliche gradient blob */}
                <div className="pointer-events-none absolute -right-24 -top-24 w-[420px] h-[420px] rounded-full border border-accent/10" />
                <div className="pointer-events-none absolute -right-10 top-40 w-[280px] h-[280px] rounded-full border border-accent/10" />
            </section>

            {/* Trust strip */}
            <section className="w-full bg-primary/40 border-b border-secondary/10">
                <div className="max-w-[1200px] mx-auto w-full flex flex-wrap justify-center lg:justify-between gap-8 px-6 py-6">
                    <div className="flex items-center gap-3">
                        <FaShippingFast className="text-accent text-2xl" />
                        <div>
                            <p className="text-secondary font-bold text-sm">Island-wide delivery</p>
                            <p className="text-secondary/60 text-xs">2–4 working days</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaShieldAlt className="text-accent text-2xl" />
                        <div>
                            <p className="text-secondary font-bold text-sm">Official warranty</p>
                            <p className="text-secondary/60 text-xs">On every component</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <FaHeadset className="text-accent text-2xl" />
                        <div>
                            <p className="text-secondary font-bold text-sm">Build support</p>
                            <p className="text-secondary/60 text-xs">Talk to a technician</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="max-w-[1200px] mx-auto w-full px-6 py-16">
                <h2 className="text-2xl font-bold text-secondary mb-8">Shop by category</h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.name}
                            to={cat.link}
                            className="group bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 hover:-translate-y-1 transition"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-accent text-2xl group-hover:bg-accent group-hover:text-white transition">
                                {cat.icon}
                            </div>
                            <p className="text-secondary font-semibold">{cat.name}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured products */}
            <section className="w-full bg-primary/30">
                <div className="max-w-[1200px] mx-auto w-full px-6 py-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-secondary">Popular right now</h2>
                        <Link to="/products" className="text-accent font-semibold flex items-center gap-1">
                            View all <FaArrowRight />
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center lg:justify-start">
                        {featuredProducts.map((product) => (
                            <FeaturedProductCard key={product.productId} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Build-your-own promo */}
            <section className="max-w-[1200px] mx-auto w-full px-6 py-16">
                <div className="bg-secondary rounded-2xl px-8 py-12 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="max-w-[480px]">
                        <h2 className="text-2xl lg:text-3xl font-bold text-white">
                            Not sure which parts fit together?
                        </h2>
                        <p className="text-white/70 mt-3">
                            Send us your budget and what you'll use the machine for.
                            Our technicians will put together a compatible build and
                            quote it the same day.
                        </p>
                    </div>
                    <Link
                        to="/contact"
                        className="bg-accent text-white font-bold px-8 py-3 rounded-2xl whitespace-nowrap hover:bg-accent/90 transition"
                    >
                        Get a custom quote
                    </Link>
                </div>
            </section>

        </div>
    );
}