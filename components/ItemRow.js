import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useRef } from "react";

const ItemRow = ({ children, title }) => {
	const ref = useRef(null);
	const scroll = (scrollOffset) => {
		ref.current.scrollLeft += scrollOffset;
	};
	return (
		<div className="relative my-20">
			<h1 className="text-4xl ml-10 mb-10">{title}</h1>
			<div className="flex overflow-y-hidden overflow-x-scroll space-x-8 px-5 py-5" ref={ref}>
				{children}
			</div>
			<div className="hidden lg:block">
				<button
					onClick={() => scroll(100)}
					className="bg-black p-2 w-8 h-8 md:h-12 md:w-12 text-white rounded-full transition-all hover:scale-110 absolute right-4 bottom-[40%] opacity-50 hover:opacity-80"
				>
					<ChevronLeftIcon className="-scale-x-[1] w-4 h-4 md:w-8" />
				</button>
				<button
					onClick={() => scroll(-100)}
					className="bg-black p-2 w-8 h-8 md:h-12 md:w-12 text-white rounded-full transition-all hover:scale-110 absolute left-4 bottom-[40%] opacity-50 hover:opacity-80"
				>
					<ChevronRightIcon className="-scale-x-[1] w-4 h-4 md:w-8" />
				</button>
			</div>
		</div>
	);
};

export default ItemRow;
