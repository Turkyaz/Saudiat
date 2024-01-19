import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useCart } from "react-use-cart";
import Link from "next/link";

const products = [
	{
		id: 1,
		name: "Throwback Hip Bag",
		href: "#",
		color: "Salmon",
		price: "$90.00",
		quantity: 1,
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
		imageAlt:
			"Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
	},
	{
		id: 2,
		name: "Medium Stuff Satchel",
		href: "#",
		color: "Blue",
		price: "$32.00",
		quantity: 1,
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
		imageAlt:
			"Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
	},
	// More products...
];

export default function Cart({ open, setOpen }) {
	const { items, removeItem, isEmpty } = useCart();
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="fixed inset-0 overflow-hidden z-50" onClose={setOpen}>
				<div className="absolute inset-0 overflow-hidden">
					<Transition.Child
						as={Fragment}
						enter="ease-in-out duration-500"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in-out duration-500"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-40 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="w-screen max-w-md">
								<div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll rounded-l-3xl drop-shadow-xl">
									<div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
										<div className="flex items-start justify-between">
											<Dialog.Title className="text-lg font-medium text-gray-900">
												سلة الشراء
											</Dialog.Title>
											<div className="ml-3 h-7 flex items-center">
												<button
													type="button"
													className="-m-2 p-2 text-gray-400 hover:text-gray-500"
													onClick={() => setOpen(false)}
												>
													<span className="sr-only">قفل السلة</span>
													<XIcon className="h-6 w-6" aria-hidden="true" />
												</button>
											</div>
										</div>

										<div className="mt-8">
											<div className="flow-root">
												<ul
													role="list"
													className="-my-6 divide-y divide-gray-200"
												>
													{items.map((product) => (
														<li key={product.id} className="py-6 flex">
															<div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
																<img
																	src={product.image}
																	alt={product.title}
																	className="w-full h-full object-center object-cover"
																/>
															</div>

															<div className="ml-4 flex-1 flex flex-col">
																<div>
																	<div className="flex justify-between text-base font-medium text-gray-900">
																		<h3>
																			<Link
																				href={`/Products/${product.id}`}
																			>
																				{product.title}
																			</Link>
																		</h3>
																		<p className="ml-4">
																			${product.price}
																		</p>
																	</div>
																	<p className="mt-1 text-sm text-gray-500">
																		{product.color}
																	</p>
																</div>
																<div className="flex-1 flex items-end justify-between text-sm">
																	<p className="text-gray-500">
																		العدد: {product.quantity}
																	</p>

																	<div className="flex">
																		<button
																			onClick={() => {
																				removeItem(
																					product.id,
																				);
																			}}
																			type="button"
																			className="font-medium text-amber-900 hover:text-amber-700"
																		>
																			احذف
																		</button>
																	</div>
																</div>
															</div>
														</li>
													))}
												</ul>
											</div>
										</div>
									</div>

									<div className="border-t border-gray-200 py-6 px-4 sm:px-6">
										<div className="flex justify-between text-base font-medium text-gray-900">
											<p>الإجمالي:</p>
											<p>
												$
												{!isEmpty &&
													items
														?.map((item) => item.price * item.quantity)
														?.reduce((prev, next) => prev + next)}
											</p>
										</div>
										<p className="mt-0.5 text-sm text-gray-500">
											الشحن والضريبة تحسب قبل الدفع.
										</p>
										<div className="mt-6">
											<a
												href="#"
												className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-900 hover:bg-amber-800"
											>
												الدفع
											</a>
										</div>
										<div className="mt-6 flex justify-center text-sm text-center text-gray-500">
											<p>
												او{" "}
												<Link href={"/Cart"}>
													<button
														type="button"
														className="text-amber-900 font-medium hover:text-amber-700"
														onClick={() => {
															setOpen(false);
														}}
													>
														الذهاب الى السلة
														<span aria-hidden="true"> &rarr;</span>
													</button>
												</Link>
											</p>
										</div>
									</div>
								</div>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
