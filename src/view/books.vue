<template>
	<nav class="navbar bg-body-tertiary">
		<div class="container-fluid">
			<a class="navbar-brand ms-2" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
					fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
					<path
						d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
				</svg></a>
			<form class="d-flex ms-auto me-2" role="search">
				<input class="form-control me-2" type="search" placeholder="Bookname" aria-label="Search">
				<button class="btn btn-outline-success" type="submit">Search</button>
			</form>
			<a class="ms-2" href="user">
				<img src="/assets/img/avatar.png" class="rounded-circle" alt="Avatar" width="30" height="30">
			</a>
		</div>
	</nav>

	<div class="page-shop-sidebar left--sidebar bg--white pt-5">
		<div class="container">
			<div class="row">
				<div class="col-lg-3 col-12 order-2 order-lg-1 md-mt-40 sm-mt-40">
					<div class="shop__sidebar">
						<aside class="wedget__categories poroduct--cat">
							<h3 class="wedget__title">Product Categories</h3>
							<ul>
								<li><a href="#">Biography <span>(3)</span></a></li>
								<li><a href="#">Business <span>(4)</span></a></li>
								<li><a href="#">Cookbooks <span>(6)</span></a></li>
								<li><a href="#">Health & Fitness <span>(7)</span></a></li>
								<li><a href="#">History <span>(8)</span></a></li>
								<li><a href="#">Mystery <span>(9)</span></a></li>
								<li><a href="#">Inspiration <span>(13)</span></a></li>
								<li><a href="#">Romance <span>(20)</span></a></li>
								<li><a href="#">Fiction/Fantasy <span>(22)</span></a></li>
								<li><a href="#">Self-Improvement <span>(13)</span></a></li>
								<li><a href="#">Humor Books <span>(17)</span></a></li>
								<li><a href="#">Harry Potter <span>(20)</span></a></li>
								<li><a href="#">Land of Stories <span>(34)</span></a></li>
								<li><a href="#">Kids' Music <span>(60)</span></a></li>
								<li><a href="#">Toys & Games <span>(3)</span></a></li>
								<li><a href="#">hoodies <span>(3)</span></a></li>
							</ul>
						</aside>
					</div>
				</div>
				<div class="col-lg-9 col-12 order-1 order-lg-2">
					<div class="row">
						<div class="col-lg-12">
							<div class="shop__list__wrapper d-flex flex-wrap flex-md-nowrap justify-content-between">
								<p>Showing 1–12 of 40 results</p>
								<div class="orderby__wrapper">
									<span>Sort By</span>
									<select class="shot__byselect">
										<option>Default sorting</option>
										<option>HeadPhone</option>
										<option>Furniture</option>
										<option>Jewellery</option>
										<option>Handmade</option>
										<option>Kids</option>
									</select>
								</div>
							</div>
						</div>
					</div>

					<div class="tab__container">
						<div class="shop-grid tab-pane fade show active" id="nav-grid" role="tabpanel">
							<div class="row">
								<div v-for="book in bookList" :key="book.id" class="col-lg-4 col-md-4 col-sm-6 col-12">
									<div class="product">
										<div class="product__thumb">
											<router-link class="first__img"
												:to="{ name: 'detail', params: { id: book.bookid } }"><img
													:src="book.first_img" alt="product image"></router-link>
											<router-link class="second__img animation1"
												:to="{ name: 'detail', params: { id: book.bookid } }"><img
													:src="book.second_img" alt="product image"></router-link>
											<div class="new__box">
												<span class="new-label">{{ book.label }}</span>
											</div>
										</div>
										<div class="product__content">
											<h4><a href="detail">{{ book.bookname }}</a></h4>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

import "bootstrap/dist/js/bootstrap.bundle.js"
import { ref } from "vue";

// data
const erjishowbr = ref(false)
const erjishowkp = ref(false)
const selectedBook = ref([])
const bookList = ref([{
	id: 1,
	bookid: "1",
	first_img: "/assets/img/books/1.jpg",
	second_img: "/assets/img/books/2.jpg",
	label: "Hot",
	bookname: "Strive Shoulder Pack"
},
{
	id: 2,
	bookid: "1",
	first_img: "/assets/img/books/1.jpg",
	second_img: "/assets/img/books/2.jpg",
	label: "Hot",
	bookname: "Strive Shoulder Pack"
},
{
	id: 3,
	bookid: "1",
	first_img: "/assets/img/books/1.jpg",
	second_img: "/assets/img/books/2.jpg",
	label: "Hot",
	bookname: "Strive Shoulder Pack"
},
{
	id: 4,
	bookid: "1",
	first_img: "/assets/img/books/1.jpg",
	second_img: "/assets/img/books/2.jpg",
	label: "Hot",
	bookname: "Strive Shoulder Pack"
},
{
	id: 5,
	bookid: "1",
	first_img: "/assets/img/books/1.jpg",
	second_img: "/assets/img/books/2.jpg",
	label: "Hot",
	bookname: "Strive Shoulder Pack"
},
{
	id: 6,
	bookid: "1",
	first_img: "/assets/img/books/1.jpg",
	second_img: "/assets/img/books/2.jpg",
	label: "Hot",
	bookname: "Strive Shoulder Pack"
}

])


</script>


<style scoped>
@import "../css/plugins.css";
@import "../css/style.css";
</style>