import Link from "next/link";
import { useCart } from "react-use-cart";

const Cart = () => {
	const { items, removeItem, isEmpty, updateItemQuantity } = useCart();

	return (
		<div className="lg:container mx-auto relative top-28 ">
			<div className="flex flex-col md:flex-row">
				<div className="w-full md:w-3/4 bg-white px-10 md:px-5 lg:px-10 py-10 h-full">
					<div className="flex justify-between border-b pb-8">
						<h1 className="font-semibold text-2xl">سلة التسوق</h1>
						<h2 className="font-semibold text-2xl">{items.length} :منتج</h2>
					</div>
					<div className="flex mt-10 mb-5">
						<h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">تفاصيل المنتج</h3>
						<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">العدد</h3>
						<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">السعر</h3>
						<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">السعر الإجمالي</h3>
					</div>

					<div>
						{items.map((itm) => (
							<div key={itm.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
								<div className="flex w-2/5">
									<div className="w-20 ">
										<img className=" object-cover" src={itm.image} alt="" />
									</div>
									<div className="flex flex-col justify-between ml-4 flex-grow">
										<span className="font-bold text-sm">{itm.title}</span>
										<span className="text-amber-700 text-xs">
											{itm.size} | {itm.color}
										</span>
										<a
											onClick={() => {
												removeItem(itm.id);
											}}
											className="font-semibold hover:text-amber-700 text-gray-500 text-xs cursor-pointer"
										>
											حذف
										</a>
									</div>
								</div>
								<div className="flex justify-center w-1/5">
									<div className="flex items-center cursor-pointer" onClick={() => updateItemQuantity(itm.id, itm.quantity - 1)}>
										<svg className="fill-current text-amber-900 w-3" viewBox="0 0 448 512">
											<path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
										</svg>
									</div>

									<input className="mx-2 border text-center w-8" type="text" defaultValue={itm.quantity} value={itm.quantity} readOnly />
									<div className="flex items-center cursor-pointer" onClick={() => updateItemQuantity(itm.id, itm.quantity + 1)}>
										<svg className="fill-current text-amber-900 w-3" viewBox="0 0 448 512">
											<path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
										</svg>
									</div>
								</div>
								<span className="text-center w-1/5 font-semibold text-sm">${itm.price}</span>
								<span className="text-center w-1/5 font-semibold text-sm">${itm.price * itm.quantity}</span>
							</div>
						))}
					</div>
					<div>
						<Link href="/" className="flex font-semibold text-amber-900 text-sm mt-10">
							<div className="flex cursor-pointer">
								<svg className="fill-current mr-2 text-amber-900 w-4" viewBox="0 0 448 512">
									<path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
								</svg>
								اكمال التسوق
							</div>
						</Link>
					</div>
				</div>

				<div id="summary" className=" w-full md:w-1/4 px-10 md:px-4 lg:px-8 py-10">
					<h1 className="font-semibold text-2xl border-b pb-8">ملخص الطلب</h1>
					<div className="">
						<div>
							<div className="py-5">
								<label className="font-semibold inline-block mb-3 text-sm uppercase">كود خصم</label>
								<input type="text" id="promo" placeholder="ادخل الكود هنا" className="p-2 text-sm w-full border-2" />
							</div>
							<button className="bg-amber-900 hover:bg-amber-700 px-5 py-2 text-sm text-white uppercase rounded-xl">تطبيق</button>
						</div>
						<div>
							<div className="border-t mt-8">
								<div className="flex font-semibold justify-between py-6 text-sm uppercase">
									<span>الإجمالي المبلغ</span>
									<span>${!isEmpty && items?.map((item) => item.price * item.quantity)?.reduce((prev, next) => prev + next)}</span>
								</div>
								<button className="bg-amber-900 font-semibold hover:bg-amber-700 py-3 text-sm text-white uppercase w-full rounded-xl">إنهاء الطلب</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
