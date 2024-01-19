import { SearchIcon } from "@heroicons/react/solid";
import Link from "next/link";

const Poster = ({ title, img, price, url }) => {
	return (
		<div className="flex flex-col justify-between h-96 rounded-xl min-w-[200px] md:min-w-[250px] hover:scale-110 py-5 transition-all bg-white drop-shadow-lg px-5">
			<img src={img} alt="" className="object-contain w-full max-h-52 rounded-xl" />
			<div className="flex justify-between p-2 items-center">
				<div className="relative">
					<h1 className="truncate ... overflow-hidden max-w-[130px]">{title}</h1>
					<p className="text-amber-900 text-xl">{price}$</p>
				</div>
				<Link href={url}>
					<button className="bg-amber-900 p-2 w-8 h-8 md:h-12 md:w-12 text-white rounded-full transition-all hover:scale-105">
						<SearchIcon className="-scale-x-[1] w-4 h-4 md:w-8" />
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Poster;
