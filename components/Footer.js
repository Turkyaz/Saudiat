import Image from "next/image";
import castle from "../public/castle.svg";
const Footer = () => {
	return (
		<div className="mt-20 sticky top-[100vh]">
			<div className="">
				<Image src={castle} alt="" className="object-contain !min-w-full static" layout="responsive" />
			</div>
			<div className="bg-[#e5c5ab] text-white font-bold flex text-center md:text-right justify-around flex-col md:flex-row px-10">
				<div className="order-2 md:order-0">
					<p>جميع الحقوق محفوظة 2022</p>
					<br />
					<p>طرق الدفع المقبولة:</p>
					<Image src="https://cdn.salla.sa/mEGGZ/2OgcCUDwqr2XRY0Rjs1H3SGXGjOEwOnIzTCDRy3C.png" width={429} height={100} />
				</div>
				<div className="md:flex md:space-x-40 md:flex-[0_1_20%] md:order-3">
					<ul className="">
						<li className="transition-all hover:cursor-pointer hover:scale-110">تواصل معانا</li>
						<li className="transition-all hover:cursor-pointer hover:scale-110">طرق الدفع</li>
						<li className="transition-all hover:cursor-pointer hover:scale-110">شروط الخصوصية</li>
					</ul>
					<ul className="">
						<li className="transition-all hover:cursor-pointer hover:scale-110">عن الشركة</li>
						<li className="transition-all hover:cursor-pointer hover:scale-110">انضم الينا</li>
						<li className="transition-all hover:cursor-pointer hover:scale-110">حساباتنا</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Footer;
