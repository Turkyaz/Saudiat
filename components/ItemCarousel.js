import Slider from "react-slick";

const ItemCarousel = ({ children, title, settings }) => {
	return (
		<div className="my-20 p-2">
			<h1 className="text-4xl ml-10 mb-10">{title}</h1>
			<Slider {...settings}>{children}</Slider>
		</div>
	);
};

export default ItemCarousel;
