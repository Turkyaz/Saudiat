import { useState, useEffect, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HomeIcon, SparklesIcon, MoonIcon, UserCircleIcon, ShoppingCartIcon, SearchIcon, MenuIcon, ShieldExclamationIcon, XIcon } from "@heroicons/react/solid";
import Cart from "./Cart";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";

const Header = () => {
	const router = useRouter();
	const { totalUniqueItems } = useCart();

	const [Search, setSearch] = useState(false);
	const [open, setOpen] = useState(false);
	const [Nav, setNav] = useState(false);

	const inp = useRef(null);
	const searchclick = (signal) => {
		if (signal) {
			if (!Search) return setSearch(true);
			router.push({ pathname: "/Products", query: { s: inp.current.value } });
		}
		if (!signal) setSearch(false);
	};
	const changeNav = () => {
		if (window.scrollY >= 100) {
			setNav(true);
		} else {
			setNav(false);
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", changeNav);
	}, []);

	return (
		<div className="border-b-2 bg-white fixed w-full z-20">
			<div className={`${Nav && "hidden"} bg-[url('../public/pattern.svg')] bg-[center_top_3.4rem] transition-all hover:bg-center text-red-500 hover:text-black flex justify-center`}>
				<div className="bg-white rounded-xl px-4">
					<p className=" animate-pulse drop-shadow-lg text-xl transition-all hover:cursor-pointer hover:scale-150">
						احصل على خصم <span className="font-bold">%50</span>
					</p>
				</div>
			</div>
			<div className={`flex items-center md:my-5 my-1 ${Search && "flex-col space-y-1 md:flex-row"}`}>
				<div className={`flex ml-5 space-x-2 ${Search && "ml-0 md:ml-5 order-2 md:order-[0]"}`}>
					<div className={`md:flex md:space-x-2 space-y-2 md:space-y-0 ${Search && "hidden md:block"}`}>
						<MyDropdown />
						<div className="relative transition-all hover:cursor-pointer hover:scale-110">
							<span className="flex h-4 w-4 absolute -right-1 -top-1">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
								<span className="relative inline-flex rounded-full h-4 w-4 text-white font-bold -p-1 text-xs bg-red-500">
									<span className="-right-1 relative">{totalUniqueItems}</span>
								</span>
							</span>
							<button onClick={() => setOpen(true)} className="bg-amber-900 text-white py-1.5 px-4 rounded-lg ">
								<ShoppingCartIcon className="w-5" />
							</button>
						</div>
					</div>
					<div className="md:flex md:space-x-2 space-y-2 md:space-y-0">
						<button className={`bg-amber-900 text-white py-1.5 px-4 rounded-lg transition-all hover:cursor-pointer hover:scale-110 ${Search ? "hidden md:block" : ""}`}>
							<UserCircleIcon className="w-5" />
						</button>
						<div className="flex hover:scale-110">
							<button
								onClick={() => {
									searchclick(true);
								}}
								className={`bg-amber-900 text-white py-1.5 px-4 rounded-l-lg ${Search ? "" : "rounded-r-lg"} transition-all hover:cursor-pointer`}
							>
								<SearchIcon className="w-5" />
							</button>
							{Search ? (
								<>
									<input type="text" name="" id="" className="border-amber-900 border-2 transition  border-l-0 " ref={inp} />
									<button
										onClick={() => {
											searchclick(false);
										}}
										className={`bg-amber-800 text-white py-1.5 px-2 rounded-r-lg ${Search ? "" : "rounded-r-lg"} transition-all hover:cursor-pointer`}
									>
										<XIcon className="w-3" />
									</button>
								</>
							) : (
								""
							)}
						</div>
					</div>
				</div>
				<div className="flex justify-center w-full">
					<div className="hidden lg:block">
						<NavItems />
					</div>
				</div>
				<Link href="/">
					<img className={`mr-5 transition-all hover:scale-110 `} src="https://q8-tamrah.com/wp-content/uploads/2020/10/CUP-smail.png" alt="" width={100} />
				</Link>
			</div>
			<Cart open={open} setOpen={setOpen} />
		</div>
	);

	function NavItems() {
		return (
			<ul className="flex flex-col-reverse md:flex-row md:space-x-20 text-xl font-bold text-amber-900">
				<span className="flex space-x-2 transition-all hover:cursor-pointer hover:scale-150 px-3 py-0.5">
					<li>بخور</li>
					<ShieldExclamationIcon className="w-5" />
				</span>
				<span className="flex space-x-2 transition-all hover:cursor-pointer hover:scale-150 px-3 py-0.5">
					<li>تمور</li>
					<MoonIcon className="w-5" />
				</span>
				<span className="flex space-x-2 transition-all hover:cursor-pointer hover:scale-150 px-3 py-0.5">
					<li>بناجر</li>
					<SparklesIcon className="w-5" />
				</span>
				<Link href="/">
					<span className="flex space-x-2 transition-all hover:cursor-pointer hover:scale-150  border-amber-900 border-2 rounded-lg px-3 py-0.5">
						<li className="h-full">الرئيسية</li>
						<HomeIcon className="w-5" />
					</span>
				</Link>
			</ul>
		);
	}

	function MyDropdown() {
		return (
			<Menu as="div" className={"relative"}>
				{({ open }) => (
					<div>
						<Menu.Button className="bg-amber-900 text-white py-1.5 px-4 rounded-lg transition-all hover:cursor-pointer hover:scale-110 lg:hidden">
							<MenuIcon className="w-5" />
						</Menu.Button>
						{/* Use the Transition component. */}
						<Transition
							show={open}
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							{/* Mark this component as `static` */}
							<Menu.Items static as="ul" className={"absolute z-30 bg-white flex flex-col p-6 rounded-xl drop-shadow-xl"}>
								<NavItems />
							</Menu.Items>
						</Transition>
					</div>
				)}
			</Menu>
		);
	}
};

export default Header;
