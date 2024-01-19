import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import ItemRow from "../../components/ItemRow";
import Poster from "../../components/Poster";
import axios from "axios";
import ItemCarousel from "../../components/ItemCarousel";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function ProductPage({ list, prodinfo }) {
	const router = useRouter();
	const { addItem } = useCart();

	const product = {
		name: prodinfo?.title,
		price: prodinfo?.price,
		href: "#",
		images: [
			{
				src: prodinfo?.image,
				alt: prodinfo?.title,
			},
		],
		colors: [
			{ name: "white", class: "bg-white", selectedClass: "ring-gray-400" },
			{ name: "grey", class: "bg-gray-200", selectedClass: "ring-gray-400" },
			{ name: "black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
		],
		sizes: [
			{ name: "XXS", inStock: false },
			{ name: "XS", inStock: true },
			{ name: "S", inStock: true },
			{ name: "M", inStock: true },
			{ name: "L", inStock: true },
			{ name: "XL", inStock: true },
			{ name: "2XL", inStock: true },
			{ name: "3XL", inStock: true },
		],
		description: prodinfo?.description,
		highlights: [
			"مصنوع من ايادي عاملة سعودية %100",
			"ملون بالوان طبيعية قوية",
			"يوصل لك مغسل ومكوي من نفس التاجر",
			"قطن طبيعي بالكامل",
		],
		reviews: { average: prodinfo?.rating?.rate },
		details:
			"مجموعة التيشيرتات تاتي بمقاسات مختلفة والوان حصرية خصوصا اللون الاسود الفحمي تم استخلاصه لاول مرة في مجموعاتنا بشكل طبيعي خام.",
	};
	const [selectedColor, setSelectedColor] = useState(product?.colors[1].name);
	const [selectedSize, setSelectedSize] = useState(product?.sizes[1].name);
	const [selectedPic, setSelectedPic] = useState(product?.images[0].alt);

	return router.isFallback ? (
		<div className="h-[100vh] w-full bg-gray-400 animate-pulse"></div>
	) : (
		<div className="bg-white relative top-24">
			<div className="pt-6">
				{/* Image gallery */}
				<div className="grid lg:grid-cols-2 gap-2 w-full">
					<div className="flex-col items-center">
						<div className="inset-0 flex justify-center lg:border-r lg:border-gray-200 mb-3">
							<h1 className=" text-2xl font-extrabold tracking-tight text-amber-900 sm:text-3xl">
								{product.name}
							</h1>
						</div>
						<Gallery2 />
					</div>
					<div className="-mt-14 drop-shadow-2xl md:drop-shadow-none bg-white rounded-3xl md:mt-0 pt-5 px-2 md:mx-auto lg:mx-0 lg:mt-0 lg:row-span-3 lg:max-w-xl max-w-3xl">
						<h2 className="sr-only">معلومات المنتج</h2>
						<p className="text-3xl text-gray-900">${product.price}</p>

						{/* Reviews */}
						{product.reviews && <Reviews />}
						<div className="mt-10">
							{/* Colors */}
							{product.colors[0] && <Colors />}
							{/* Sizes */}
							{product.sizes[0] && <Sizes />}
							<button
								onClick={() => {
									prodinfo.size = selectedSize;
									prodinfo.color = selectedColor;
									addItem(prodinfo, 1);
								}}
								className="mt-10 w-full bg-amber-900 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-900"
							>
								اضف الى السلة
							</button>
						</div>
					</div>
				</div>

				{/* Product info */}
				<div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
					{/* Options */}

					<div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 ">
						{/* Description and details */}
						<div>
							<h3 className="sr-only">الوصف</h3>

							<div className="space-y-6">
								<p className="text-base text-gray-900">{product.description}</p>
							</div>
						</div>

						<div className="mt-10">
							<h3 className="text-sm font-medium text-amber-900">المزايا</h3>

							<div className="mt-4">
								<ul role="list" className="pl-4 list-disc text-sm space-y-2">
									{product.highlights.map((highlight) => (
										<li key={highlight} className="text-gray-400">
											<span className="text-gray-600">{highlight}</span>
										</li>
									))}
								</ul>
							</div>
						</div>

						<div className="mt-10">
							<h2 className="text-sm font-medium text-amber-900">تفاصيل</h2>

							<div className="mt-4 space-y-6">
								<p className="text-sm text-gray-600">{product.details}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="max-w-7xl mx-auto relative bottom-20">
				<ItemCarousel
					title="مشابة له"
					className=""
					settings={{
						className: "px-5 py-5",
						dots: true,
						focusOnSelect: true,
						infinite: true,
						centerMode: true,
						swipeToSlide: true,
						draggable: true,
						arrows: false,
						speed: 500,
						slidesToShow: 4.1,
						slidesToScroll: 1,
						responsive: [
							{
								breakpoint: 1524,
								settings: {
									slidesToShow: 4,
									infinite: true,
								},
							},
							{
								breakpoint: 1400,
								settings: {
									slidesToShow: 3.5,
									infinite: true,
								},
							},
							{
								breakpoint: 1000,
								settings: {
									slidesToShow: 2,
									initialSlide: 2,
									infinite: true,
								},
							},
							{
								breakpoint: 560,
								settings: {
									slidesToShow: 1,
									infinite: true,
								},
							},
						],
					}}
				>
					{list?.map((ls) => (
						<div key={ls.id} className="px-5 py-5">
							<Poster
								url={`/Products/${ls.id}`}
								title={ls.title}
								price={ls.price}
								img={ls.image}
							/>
						</div>
					))}
				</ItemCarousel>
			</div>
		</div>
	);

	function Reviews(params) {
		return (
			<div className="mt-6">
				<h3 className="sr-only">الأراء</h3>
				<div className="flex items-center">
					<div className="flex items-center">
						{[0, 1, 2, 3, 4].map((rating) => (
							<StarIcon
								key={rating}
								className={classNames(
									product.reviews.average > rating
										? "text-amber-900"
										: "text-gray-200",
									"h-5 w-5 flex-shrink-0 transition-all hover:scale-125",
								)}
								aria-hidden="true"
							/>
						))}
					</div>
					<p className="sr-only">{product.reviews.average} من خمسة نجوم</p>
				</div>
			</div>
		);
	}

	function Gallery2() {
		return (
			<div className="mx-auto flex flex-row-reverse w-full justify-center">
				<div className="mb-3 aspect-square max-h-[500px]">
					<img
						src={selectedPic?.src ? selectedPic?.src : prodinfo?.image}
						alt=""
						className="aspect-auto w-full h-full object-center object-cover"
					/>
				</div>
				<RadioGroup
					value={selectedPic}
					onChange={setSelectedPic}
					className="max-w-xl  grid grid-rows-4"
					as="div"
				>
					{product.images.map((imgsrc, i) => (
						<RadioGroup.Option
							key={i}
							value={imgsrc.alt}
							as="div"
							className={({ checked }) =>
								classNames(
									checked ? "ring-2 ring-amber-700 scale-110" : "",
									"max-h-28 aspect-square rounded-xl overflow-hidden cursor-pointer hover:scale-105",
								)
							}
						>
							<img
								src={imgsrc.src}
								alt={imgsrc.alt}
								className="w-full h-full object-center object-cover"
							/>
						</RadioGroup.Option>
					))}
				</RadioGroup>
			</div>
		);
	}

	function Gallary() {
		return (
			<div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
				<div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
					<img
						src={product.images[0].src}
						alt={product.images[0].alt}
						className="w-full h-full object-center object-cover"
					/>
				</div>
				<div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
					<div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
						<img
							src={product.images[1].src}
							alt={product.images[1].alt}
							className="w-full h-full object-center object-cover"
						/>
					</div>
					<div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
						<img
							src={product.images[2].src}
							alt={product.images[2].alt}
							className="w-full h-full object-center object-cover"
						/>
					</div>
				</div>
				<div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
					<img
						src={product.images[3].src}
						alt={product.images[3].alt}
						className="w-full h-full object-center object-cover"
					/>
				</div>
			</div>
		);
	}

	function Colors() {
		return (
			<div>
				<h3 className="text-sm text-gray-900 font-medium">الالوان</h3>

				<RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
					<RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
					<div className="flex items-center space-x-3">
						{product.colors.map((color) => (
							<RadioGroup.Option
								key={color.name}
								value={color.name}
								className={({ active, checked }) =>
									classNames(
										color.selectedClass,
										active && checked ? "ring ring-offset-1" : "",
										!active && checked ? "ring-2" : "",
										" -m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none",
									)
								}
							>
								<RadioGroup.Label as="p" className="sr-only">
									{color.name}
								</RadioGroup.Label>
								<span
									aria-hidden="true"
									className={classNames(
										color.class,
										"h-8 w-8 border border-black border-opacity-10 rounded-full",
									)}
								/>
							</RadioGroup.Option>
						))}
					</div>
				</RadioGroup>
			</div>
		);
	}

	function Sizes() {
		return (
			<div>
				<div className="mt-10">
					<div className="flex items-center justify-between">
						<h3 className="text-sm text-gray-900 font-medium">الاحجام</h3>
					</div>

					<RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
						<RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
						<div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
							{product.sizes.map((size) => (
								<RadioGroup.Option
									key={size.name}
									value={size.name}
									disabled={!size.inStock}
									className={({ active }) =>
										classNames(
											size.inStock
												? "bg-white shadow-sm text-gray-900 cursor-pointer"
												: "bg-gray-50 text-gray-200 cursor-not-allowed",
											active ? "ring-2 ring-amber-700" : "",
											"group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6",
										)
									}
								>
									{({ active, checked }) => (
										<>
											<RadioGroup.Label as="p">{size.name}</RadioGroup.Label>
											{size.inStock ? (
												<div
													className={classNames(
														active ? "border" : "border-2",
														checked
															? "border-amber-700"
															: "border-transparent",
														"absolute -inset-px rounded-md pointer-events-none",
													)}
													aria-hidden="true"
												/>
											) : (
												<div
													aria-hidden="true"
													className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
												>
													<svg
														className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
														viewBox="0 0 100 100"
														preserveAspectRatio="none"
														stroke="currentColor"
													>
														<line
															x1={0}
															y1={100}
															x2={100}
															y2={0}
															vectorEffect="non-scaling-stroke"
														/>
													</svg>
												</div>
											)}
										</>
									)}
								</RadioGroup.Option>
							))}
						</div>
					</RadioGroup>
				</div>
				;
			</div>
		);
	}
}

export default ProductPage;

export async function getStaticProps({ params }) {
	const prod = await axios(`https://fakestoreapi.com/products/${params.ProductId}`);
	const result = await fetch(`https://fakestoreapi.com/products?limit=7`);
	const list = await result.json();
	const prodinfo = await prod.data;
	return {
		props: {
			list,
			prodinfo,
		},
		revalidate: 60, // In seconds
	};
}

export async function getStaticPaths() {
	const res = await fetch("https://fakestoreapi.com/products");
	const list = await res.json();

	let pathslis = await list.data?.map((product) => ({
		params: { ProductId: product.id },
	}));
	return {
		paths: !pathslis ? [{ params: { ProductId: "1" } }] : pathslis,
		fallback: true,
	};
}
