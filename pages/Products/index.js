import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
	ChevronDownIcon,
	FilterIcon,
	MinusSmIcon,
	PlusSmIcon,
	ViewGridIcon,
} from "@heroicons/react/solid";
import Poster from "../../components/Poster";
import { useRouter } from "next/router";
import Link from "next/link";

const sortOptions = [
	{ name: "الاكثر شهرة", sort: "0", current: false },
	{ name: "الاعلى تقييما", sort: "1", current: false },
	{ name: "الاجدد", sort: "2", current: false },
	{ name: "السعر: اقل الى اعلى", sort: "3", current: false },
	{ name: "السعر: اعلى الى اقل", sort: "4", current: false },
];
const subCategories = [];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Search({ list, headTitle, filters }) {
	const router = useRouter();
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [sort, setSort] = useState(-1);
	const [listItems, setListItems] = useState(list);

	const handelFormCatg = (inp) => {
		let checked = inp.target.checked;
		let value = inp.target.value;
		if (!checked) {
			if (typeof router.query.f !== typeof []) delete router.query.f;
			if (typeof router.query.f == typeof [])
				router.query.f = router.query.f.filter((e) => e !== value);
		} else {
			if (!router.query.f) router.query.f = [];
			if (typeof router.query.f == "string") router.query.f = [router.query.f];
			if (typeof router.query.f !== "string") router.query.f.push(value);
		}
		router.push({ pathname: "", query: { ...router.query } }, undefined, {
			shallow: true,
		});
		query();
	};
	const handelSorting = () => {
		if (sort === 0) {
			setListItems(
				listItems.sort((b, a) => parseFloat(a.rating.count) - parseFloat(b.rating.count)),
			);
			sortOptions.map((b, i) => (i == sort ? (b.current = true) : (b.current = false)));
			setSort(-1);
		}
		if (sort === 1) {
			setListItems(
				listItems.sort((b, a) => parseFloat(a.rating.rate) - parseFloat(b.rating.rate)),
			);
			sortOptions.map((b, i) => (i == sort ? (b.current = true) : (b.current = false)));
			setSort(-1);
		}
		if (sort === 2) {
			setListItems(listItems.sort((b, a) => parseFloat(a.id) - parseFloat(b.id)));
			sortOptions.map((b, i) => (i == sort ? (b.current = true) : (b.current = false)));
			setSort(-1);
		}
		if (sort === 3) {
			setListItems(listItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)));
			sortOptions.map((b, i) => (i == sort ? (b.current = true) : (b.current = false)));
			setSort(-1);
		}
		if (sort === 4) {
			setListItems(listItems.sort((b, a) => parseFloat(a.price) - parseFloat(b.price)));
			sortOptions.map((b, i) => (i == sort ? (b.current = true) : (b.current = false)));
			setSort(-1);
		}
	};

	function query() {
		if (!router.query.f) return setListItems(list);

		setListItems(
			list?.filter((value) => router.query.f.includes(value.category.toLowerCase())),
		);
	}

	useEffect(() => {
		handelSorting();
	}, [sort]);

	useEffect(() => {
		setListItems(list);
		handelSorting();
	}, [list]);
	useEffect(() => {
		query();
	}, []);

	return (
		<div className="bg-white">
			<div>
				{/* Mobile filter dialog */}
				<Transition.Root show={mobileFiltersOpen} as={Fragment}>
					<Dialog
						as="div"
						className="fixed inset-0 flex z-40 lg:hidden"
						onClose={setMobileFiltersOpen}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
						</Transition.Child>

						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
								<div className="px-4 flex items-center justify-between">
									<h2 className="text-lg font-medium text-gray-900">Filters</h2>
									<button
										type="button"
										className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
										onClick={() => setMobileFiltersOpen(false)}
									>
										<span className="sr-only">اغلاق القائمة</span>
										<XIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>

								{/* Filters */}
								<form className="mt-4 border-t border-gray-200">
									<h3 className="sr-only">التصنيفات</h3>
									<ul role="list" className="font-medium text-gray-900 px-2 py-3">
										{subCategories.map((category) => (
											<li key={category.name}>
												<a href={category.href} className="block px-2 py-3">
													{category.name}
												</a>
											</li>
										))}
									</ul>

									{filters.map((section) => (
										<Disclosure
											as="div"
											key={section.id}
											className="border-t border-gray-200 px-4 py-6"
										>
											{({ open }) => (
												<>
													<h3 className="-mx-2 -my-3 flow-root">
														<Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
															<span className="font-medium text-gray-900">
																{section.name}
															</span>
															<span className="ml-6 flex items-center">
																{open ? (
																	<MinusSmIcon
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																) : (
																	<PlusSmIcon
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																)}
															</span>
														</Disclosure.Button>
													</h3>
													<Disclosure.Panel className="pt-6">
														<div className="space-y-6">
															{section.options.map(
																(option, optionIdx) => (
																	<div
																		key={option.value}
																		className="flex items-center"
																	>
																		<input
																			id={`filter-mobile-${section.id}-${optionIdx}`}
																			name={`${section.id}[]`}
																			defaultValue={
																				option.value
																			}
																			type="checkbox"
																			defaultChecked={
																				option.checked
																			}
																			onChange={
																				handelFormCatg
																			}
																			className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
																		/>
																		<label
																			htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
																			className="ml-3 min-w-0 flex-1 text-gray-500"
																		>
																			{option.label}
																		</label>
																	</div>
																),
															)}
														</div>
													</Disclosure.Panel>
												</>
											)}
										</Disclosure>
									))}
								</form>
							</div>
						</Transition.Child>
					</Dialog>
				</Transition.Root>

				<main className="relative top-20 mx-auto px-4 sm:px-6 lg:px-8">
					<div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
						<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 truncate">
							{headTitle}
						</h1>

						<div className="flex items-center">
							<Menu as="div" className="relative inline-block text-left">
								<div>
									<Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
										ترتيب
										<ChevronDownIcon
											className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
											aria-hidden="true"
										/>
									</Menu.Button>
								</div>

								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="py-1">
											{sortOptions.map((option, i) => (
												<Menu.Item key={option.name}>
													{({ active }) => (
														<a
															onClick={() => {
																setSort(i);
															}}
															className={classNames(
																option.current
																	? "font-bold text-gray-900"
																	: "text-gray-500",
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm hover:cursor-pointer",
															)}
														>
															{option.name}
														</a>
													)}
												</Menu.Item>
											))}
										</div>
									</Menu.Items>
								</Transition>
							</Menu>

							<button
								type="button"
								className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className="sr-only">المرشحات</span>
								<FilterIcon className="w-5 h-5" aria-hidden="true" />
							</button>
						</div>
					</div>

					<section aria-labelledby="products-heading" className="pt-6 pb-24">
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
							{/* Filters */}
							<form className="hidden lg:block">
								<h3 className="sr-only">التصنيفات</h3>
								<ul
									role="list"
									className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200"
								>
									{subCategories.map((category) => (
										<li key={category.name}>
											<a href={category.href}>{category.name}</a>
										</li>
									))}
								</ul>

								{filters.map((section) => (
									<Disclosure
										as="div"
										key={section.id}
										className="border-b border-gray-200 py-6"
									>
										{({ open }) => (
											<>
												<h3 className="-my-3 flow-root">
													<Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
														<span className="font-medium text-gray-900">
															{section.name}
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusSmIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															) : (
																<PlusSmIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel className="pt-6">
													<div className="space-y-4">
														{section.options.map(
															(option, optionIdx) => (
																<div
																	key={option.value}
																	className="flex items-center"
																>
																	<input
																		id={`filter-${section.id}-${optionIdx}`}
																		name={`${section.id}[]`}
																		defaultValue={option.value}
																		type="checkbox"
																		defaultChecked={
																			option.checked
																		}
																		onChange={handelFormCatg}
																		className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
																	/>
																	<label
																		htmlFor={`filter-${section.id}-${optionIdx}`}
																		className="ml-3 text-sm text-gray-600"
																	>
																		{option.label}
																	</label>
																</div>
															),
														)}
													</div>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
							</form>

							{/* Product grid */}
							<div className="p-7 md:p-0 grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4 lg:col-span-3">
								{listItems.map((el) => (
									<Poster
										key={el.id}
										url={`/Products/${el.id}`}
										title={el.title}
										price={el.price}
										img={el.image}
									/>
								))}
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}

export async function getServerSideProps({ query }) {
	const result = await fetch(`https://fakestoreapi.com/products`);
	let list = await result.json();
	let headTitle = "نتائج :";
	let filters = [
		{
			id: "color",
			name: "الوان",
			options: [
				{ value: "white", label: "ابيض", checked: false },
				{ value: "beige", label: "بيج", checked: false },
				{ value: "blue", label: "ازرق", checked: false },
				{ value: "brown", label: "بنني", checked: false },
				{ value: "green", label: "اخضر", checked: false },
				{ value: "purple", label: "بنفسجي", checked: false },
			],
		},
		{
			id: "size",
			name: "حجم",
			options: [
				{ value: "2l", label: "2L", checked: false },
				{ value: "6l", label: "6L", checked: false },
				{ value: "12l", label: "12L", checked: false },
				{ value: "18l", label: "18L", checked: false },
				{ value: "20l", label: "20L", checked: false },
				{ value: "40l", label: "40L", checked: false },
			],
		},
	];
	if (query.s) headTitle += query.s;
	if (query.s)
		list = list.filter(
			(el) =>
				el.title.toLowerCase().indexOf(query.s.toLowerCase()) >= 0 ||
				el.description.toLowerCase().indexOf(query.s.toLowerCase()) >= 0,
		);
	let filterCatg = [...new Set(list.map((el) => el.category))].map((el) => ({
		value: el,
		label: el,
		checked: query.f?.includes(el) ? true : false,
	}));
	filters.push({
		id: "category",
		name: "التصنيفات",
		options: filterCatg,
	});
	return {
		props: {
			list,
			headTitle,
			filters,
		},
	};
}
