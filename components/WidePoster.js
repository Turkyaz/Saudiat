import { SearchIcon } from "@heroicons/react/solid";

const WidePoster = () => {
	const info = {
		bg: "",
	};
	return (
		<div className="text-white overflow-hidden relative min-w-[300px] md:min-w-[500px] h-[100px] md:h-[120px] rounded-xl transition-all hover:scale-110">
			<img
				src="https://images.unsplash.com/photo-1565799556918-0e31a1757d13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
				alt=""
				className="absolute inset-0 w-full h-full object-cover"
			/>
			<div className="absolute inset-0 flex w-full h-full justify-between items-center bg-blue-900 bg-opacity-50">
				<div className="hidden">
					<img src="" alt="" />
				</div>
				<div>
					<h1 className="text-xl ml-6">عدة الغوص</h1>
					<p className="mt-1.5 ml-8"> جهز نفسك قبل تغطس</p>
				</div>
				<button className="w-10 h-10 mr-4 p-2 text-black duration-150 transition-all bg-white rounded-full focus:shadow-outline hover:bg-black hover:text-white">
					<SearchIcon />
				</button>
			</div>
		</div>
	);
};

export default WidePoster;
