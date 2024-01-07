<template>
	<div class="page-shop-sidebar left--sidebar bg--white section-padding--lg">
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

<script>

import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.css";
import "../css/plugins.css";
import "../css/style.css";

export default {
	data() {
		return {
			showModal: false,
			showChoose: false,
			erjishowbr: false,
			erjishowkp: false,
			brnum: '',
			selectedBook: [],
			// 这个对象是需要从后端获取的,进行覆盖就能刷新前端的页面了
			bookTotal: [],
			bookList: [{
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

			]

		}
	},
	async created() {
		const response = await fetch('/data.json');
		if (response.ok) {
			this.bookTotal = await response.json();
		} else {
			console.error('Failed to load data.json:', response.status, response.statusText);
		}
	},
	methods: {
		handleimgClick(book) {
			if (book.bookStatus === '否') {
				alert("《" + book.bookName + "》已被借完o（＞︿＜）o");
				return;
			}
			alert("即将为你展示《" + book.bookName + "》的详情<(￣︶￣)↗[GO!]");
			this.showChoose = true;
			this.selectedBook = book;
		},
		handleLogout() {
			this.$router.push('/login')
		},
		keepBook() {
			this.erjishowkp = "true";
		},
		borrowBook() {
			this.erjishowbr = "true";
		},
		borrowBookfin() {
			alert("借阅成功");
		},
		keepBookfin() {
			alert("续借成功");
		},
		// getResults(page) {
		//     this.page = page;
		//     this.pages = _.chunk(this.bookTotal, this.perPage);
		// }
	},
	watch: {
		showModal(val) {
			if (val) {
				document.body.style.overflow = 'hidden'
			} else {
				document.body.style.overflow = 'auto'
			}
		},
		showChoose(val) {
			if (val) {
				document.body.style.overflow = 'hidden'
			} else {
				document.body.style.overflow = 'auto'
			}
		},

	}
}
</script>

<style scoped></style>