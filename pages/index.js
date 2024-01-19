import Hero from "../components/HeroSec";
import ItemRow from "../components/ItemRow";
import WidePoster from "../components/WidePoster";
import Poster from "../components/Poster";
import { useState, useEffect } from "react";
import axios from "axios";
import ItemCarousel from "../components/ItemCarousel";

export default function Home({ list }) {
	return (
		<div className="relative top-14">
			<Hero />
			<ItemCarousel
				title="اصناف الموسم"
				settings={{
					className: "px-5 py-5",
					dots: true,
					focusOnSelect: true,
					infinite: false,
					swipeToSlide: true,
					arrows: false,
					speed: 500,
					slidesToShow: 3.5,
					initialSlide: 0,
					responsive: [
						{
							breakpoint: 1800,
							settings: {
								slidesToShow: 2.5,
								slidesToScroll: 2.5,
								initialSlide: 0,
								infinite: true,
							},
						},

						{
							breakpoint: 1300,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2,
								initialSlide: 0,
							},
						},
						{
							breakpoint: 1050,
							settings: {
								slidesToShow: 1.4,
								slidesToScroll: 1.4,
								initialSlide: 0,
							},
						},
						{
							breakpoint: 560,
							settings: {
								slidesToShow: 1.2,
								slidesToScroll: 1.2,
								initialSlide: 0,
							},
						},
						{
							breakpoint: 420,
							settings: {
								slidesToShow: 1,
								slidesToScroll: 1,
								initialSlide: 0,
							},
						},
					],
				}}
			>
				{[1, 1, 1, 1, 1].map((el, i) => (
					<div key={i} className="px-5 py-5">
						<WidePoster />
					</div>
				))}
			</ItemCarousel>
			<ItemCarousel
				title="اخر العروض"
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
					slidesToShow: 5,
					slidesToScroll: 1,
					responsive: [
						{
							breakpoint: 1524,
							settings: {
								slidesToShow: 5,
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
				{list.map((ls) => (
					<div key={ls.id} className="px-5 py-5">
						<Poster url={`/Products/${ls.id}`} title={ls.title} price={ls.price} img={ls.image} />
					</div>
				))}
			</ItemCarousel>
		</div>
	);
}

export async function getStaticProps({ params }) {
	const result = await fetch(`https://fakestoreapi.com/products?limit=7`);
	const list = await result.json();
	return {
		props: {
			list,
		},
		revalidate: 250, // In seconds
	};
}
