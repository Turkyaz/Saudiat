import Image from "next/image";
import { useState, useEffect } from "react";
import { ReplyIcon } from "@heroicons/react/solid";

const OnDisplay = [
	{
		name: "فنجان المصمك",
		discription: "حصن كبير شيد من الطين والطوب اللبن وشهد ميلاد المملكة كما يعتب بمثابة تذكير بتاريخ المملكة العربية السعودية العريق",
		pic: "/product1.jpg",
		textColor: "text-[#9866AF]",
		accentColor: "shadow-[#9866AF]",
		borderColor: "border-[#9866AF]",
	},
	{
		name: "فنجان البلد",
		discription: "يتميز البيت الحجازي القديم بالعديد من المعالم واشهرها هي الرواشين والشرابيات الحجازية حيث تعكس اصالة الفن الحجازي القديم",
		pic: "/product2.jpg",
		textColor: "text-[#b9cead]",
		accentColor: "shadow-[#b9cead]",
		borderColor: "border-[#b9cead]",
	},
	{
		name: "فنجان العلا",
		discription: "اعظم تحفة عرفها الزمن تعتبر العلا من اقدم المحافظات في شبه الجزيرة العربية وموطن الحجر احد مواقع التراق العالمي لليونسكو",
		pic: "/product3.jpg",
		textColor: "text-[#DC5420]",
		accentColor: "shadow-[#DC5420]",
		borderColor: "border-[#DC5420]",
	},
	{
		name: "فنجان القَط",
		discription: "القط العسيري هو احد الفنون التجريدية التي نشات في منطقة عسير في السعودية حيث كانت تقوم به النساء لتزيين بيوتهن بانماط هندسية",
		pic: "/product4.jpg",
		textColor: "text-[#F7AE1C]",
		accentColor: "shadow-[#F7AE1C]",
		borderColor: "border-[#F7AE1C]",
	},
];

const Hero = () => {
	const [Display, setDisplay] = useState(0);
	useEffect(() => {
		var i = 0;
		clearInterval(TimeShow);
		const TimeShow = setInterval(() => {
			i == OnDisplay.length - 1 ? (i = 0) : i++;
			setDisplay(i);
		}, 2000);
	}, []);

	return (
		<div className="border-b-2 py-20 relative">
			<img
				className=" lg:max-h-[85vh] scale-x-[-1] -z-10 border-0 drop-shadow-none absolute bottom-0 right-0"
				src={"https://images.unsplash.com/photo-1532611322744-369123d95bd3?ixlib=rb-1.2.1&fit=crop&w=800&q=80"}
			/>
			<div className="md:flex items-center p-5 relative">
				<div className={`lg:mx-32 mt-10 px-10 border-l-4 lg:border-b-4 ${OnDisplay[Display].borderColor}`}>
					<h1 className={`text-2xl md:text-5xl ${OnDisplay[Display].textColor} text font-bold text-center mb-6`}>{OnDisplay[Display].name}</h1>
					<h2 className="max-w-lg md:text-3xl mb-6 text-right">{OnDisplay[Display].discription}</h2>
				</div>
				<div className="mx-auto w-[45vw] max-w-[340px] ">
					<div className={`mt-20 h-[80vw] w-[45vw] max-h-[600px] max-w-[340px]  ${OnDisplay[Display].accentColor} shadow-lg z-10 `}>
						<div className={` h-[80vw] w-[45vw] max-h-[600px] max-w-[340px] bg-white flex flex-col justify-center border-white border-8 z-10 -mb-[40vw] `}>
							<img className="object-cover h-full rounded-xl" src={OnDisplay[Display].pic} />
							<div className="flex justify-center relative -top-8">
								<button className="bg-black p-5 text-white rounded-full absolute border-white border-4 transition-all hover:scale-110">
									<ReplyIcon className="-scale-x-[1] w-[4vw] max-w-[24px]" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
