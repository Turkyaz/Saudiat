import Footer from "./Footer";
import Navbar from "./Navbar";
import { CartProvider } from "react-use-cart";

const Layout = ({ children }) => {
	return (
		<div className="min-h-screen">
			<CartProvider>
				<Navbar />
				{children}
				<Footer />
			</CartProvider>
		</div>
	);
};

export default Layout;
