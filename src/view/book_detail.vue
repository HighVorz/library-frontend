<template>
    <div class="maincontent bg--white pt--80 pb--55">
        <div class="container" v-bind="book">
            <div class="row">
                <div class="col-lg-9 col-12">
                    <div class="wn__single__product">
                        <div class="row">
                            <div class="col-lg-6 col-12">
                                <div class="wn__fotorama__wrapper">
                                    <div class="fotorama wn__fotorama__action" data-nav="thumbs">
                                        <a href="1.jpg"><img src="/assets/img/books/1.jpg" alt=""></a>
                                        <a href="2.jpg"><img src="/assets/img/books/1.jpg" alt=""></a>
                                        <a href="3.jpg"><img src="/assets/img/books/1.jpg" alt=""></a>
                                        <a href="4.jpg"><img src="/assets/img/books/1.jpg" alt=""></a>
                                        <a href="5.jpg"><img src="/assets/img/books/1.jpg" alt=""></a>
                                        <a href="6.jpg"><img src="/assets/img/books/1.jpg" alt=""></a>
                                        <a href="7.jpg"><img src="/assets/img/books/1.jpg" alt=""></a>
                                        <a href="8.jpg"><img src="/assets/img/books/1.jpg" alt=""></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-12">
                                <div class="product__info__main">
                                    <h1>{{ book.bookname }}</h1>
                                    <div style="margin: 2px 0;">
                                        <p>Author: <span>{{ book.author }}</span></p>
                                    </div>
                                    <div class="product-info-stock-sku d-flex">
                                        <p>Availability:<span>{{ book.availability }}</span></p>
                                    </div>
                                    <div class="product-reviews-summary d-flex">
                                        <ul class="rating-summary d-flex">
                                            <li><i class="zmdi zmdi-star-outline"></i></li>
                                            <li><i class="zmdi zmdi-star-outline"></i></li>
                                            <li><i class="zmdi zmdi-star-outline"></i></li>
                                            <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
                                            <li class="off"><i class="zmdi zmdi-star-outline"></i></li>
                                        </ul>
                                        <div class="reviews-actions d-flex">
                                            <a href="#">(1 Review)</a>
                                            <a href="#">Add Your Review</a>
                                        </div>
                                    </div>
                                    <div class="price-box">
                                        <span>${{ book.price }}</span>
                                    </div>

                                    <div class="box-tocart d-flex">
                                        <span>Quantity</span>
                                        <input id="qty" class="input-text qty" name="qty" min="1" value="1" title="Qty"
                                            type="number">
                                        <div class="addtocart__actions">
                                            <button class="btn btn-secondary" type="submit" title="Add to Cart">Borrow</button>
                                        </div>
                                    </div>

                                    <div class="product__overview">
                                        <p>{{ book.overview }}</p>
                                        <ul class="pro__attribute">
                                            <li>• Two-tone gray heather hoodie.</li>
                                            <li>• Drawstring-adjustable hood. </li>
                                            <li>• Machine wash/dry.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product__info__detailed">
                        <div class="pro_details_nav nav justify-content-start" role="tablist">
                            <a class="nav-item nav-link active" data-toggle="tab" href="#nav-details" role="tab">Details</a>
                            <a class="nav-item nav-link" data-toggle="tab" href="#nav-review" role="tab">Reviews</a>
                        </div>
                        <div class="tab__container">
                            <!-- Start Single Tab Content -->
                            <div class="pro__tab_label tab-pane fade show active" id="nav-details" role="tabpanel">
                                <div class="description__attribute">
                                    <p>{{ book.description }}</p>
                                    <ul>
                                        <li>• Two-tone gray heather hoodie.</li>
                                        <li>• Drawstring-adjustable hood. </li>
                                        <li>• Machine wash/dry.</li>
                                    </ul>
                                </div>
                            </div>
                            <!-- End Single Tab Content -->
                            <!-- Start Single Tab Content -->
                            <div class="pro__tab_label tab-pane fade" id="nav-review" role="tabpanel">
                                <div class="review__attribute">
                                    <h1>Customer Reviews</h1>
                                    <h2>Hastech</h2>
                                    <div class="review__ratings__type d-flex">
                                        <div class="review-ratings">
                                            <div class="rating-summary d-flex">
                                                <span>Quality</span>
                                                <ul class="rating d-flex">
                                                    <li><i class="zmdi zmdi-star"></i></li>
                                                    <li><i class="zmdi zmdi-star"></i></li>
                                                    <li><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                </ul>
                                            </div>

                                            <div class="rating-summary d-flex">
                                                <span>Price</span>
                                                <ul class="rating d-flex">
                                                    <li><i class="zmdi zmdi-star"></i></li>
                                                    <li><i class="zmdi zmdi-star"></i></li>
                                                    <li><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                </ul>
                                            </div>
                                            <div class="rating-summary d-flex">
                                                <span>value</span>
                                                <ul class="rating d-flex">
                                                    <li><i class="zmdi zmdi-star"></i></li>
                                                    <li><i class="zmdi zmdi-star"></i></li>
                                                    <li><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="review-content">
                                            <p>Hastech</p>
                                            <p>Review by Hastech</p>
                                            <p>Posted on 11/6/2018</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="review-fieldset">
                                    <h2>You're reviewing:</h2>
                                    <h3>Chaz Kangeroo Hoodie</h3>
                                    <div class="review-field-ratings">
                                        <div class="product-review-table">
                                            <div class="review-field-rating d-flex">
                                                <span>Quality</span>
                                                <ul class="rating d-flex">
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                </ul>
                                            </div>
                                            <div class="review-field-rating d-flex">
                                                <span>Price</span>
                                                <ul class="rating d-flex">
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                </ul>
                                            </div>
                                            <div class="review-field-rating d-flex">
                                                <span>Value</span>
                                                <ul class="rating d-flex">
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                    <li class="off"><i class="zmdi zmdi-star"></i></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="review_form_field">
                                        <div class="input__box">
                                            <span>Nickname</span>
                                            <input id="nickname_field" type="text" name="nickname">
                                        </div>
                                        <div class="input__box">
                                            <span>Summary</span>
                                            <input id="summery_field" type="text" name="summery">
                                        </div>
                                        <div class="input__box">
                                            <span>Review</span>
                                            <textarea name="review"></textarea>
                                        </div>
                                        <div class="review-form-actions">
                                            <button>Submit Review</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- End Single Tab Content -->
                        </div>
                    </div>


                </div>
                <div class="col-lg-3 col-12 md-mt-40 sm-mt-40">
                    <div class="shop__sidebar">
                        <aside class="wedget__categories poroduct--cat">
                            <h3 class="wedget__title">Book Categories</h3>
                            <ul>
                                <li><a href="#">Biography <span>(3)</span></a></li>
                                <li><a href="#">Business <span>(4)</span></a></li>
                                <li><a href="#">Cookbooks <span>(6)</span></a></li>
                                <li><a href="#">Health & Fitness <span>(7)</span></a></li>
                                
                            </ul>
                        </aside>
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
            showModal2: false,
            bookTotal: [],
            bookid: "",
            book: {
                bookid: "1",
                bookname: "Chaz Kangeroo Hoodie",
                author: "nobody",
                availability: "In stock",
                price: "52.00",
                overview: "Ideal for cold-weather training or work outdoors, the Chaz Hoodie promisessuperior warmth with every wear. Thick material blocks out the wind as ribbedcuffs and bottom band seal in body heat.",
                description: "Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises superiorwarmth with every wear. Thick material blocks out the wind as ribbed cuffs and bottom band seal in body heat.Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises superior warmth with every wear. Thick material blocks out the wind as ribbed cuffs and bottom band seal in body heat.Ideal for cold-weather"
            }
        }
    },

    mounted() {
        this.bookid = this.$route.params.id;
        // 使用 id 进行相关操作
        console.log(this.bookid);
        // set book by bookid
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
        handleSubmit(event) {
            event.preventDefault();
            // 删除操作...
        }, // 到时候记得删掉，只是为了测试删除
        showAlertadd() {
            alert('添加成功');
        },
        deleteItem(item) {
            alert('删除成功');
            const index = this.bookTotal.indexOf(item);
            console.log(index);
            if (index !== -1) {
                this.bookTotal.splice(index, 1);
            }
        },
        handleLogout() {
            this.$router.push('/login')
        },
        handleReader() {
            this.$router.push('/administer/usercontrol')
        }
    },
    watch: {
        showModal(val) {
            if (val) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'auto'
            }
        },
        showModal2(val) {
            if (val) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'auto'
            }
        }
    }
}
</script>

<style scoped>
.header {
    background: url('/assets/img/admin_header.jpg') center/cover no-repeat;
    color: rgb(237, 237, 217);
    padding: 15px;
    text-align: center;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
}

.container::before {
    content: "";
    background: url('/assets/img/master.jpg') center/cover no-repeat;
    opacity: 0.5;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
}

.reader-button {
    margin: 20px 0px 20px 0px;
    padding: 10px 20px;
    font-size: 16px;
    width: 10%;
    position: relative;
    left: 45%;
    color: rgb(0, 0, 0);
    background-color: rgba(255, 255, 0, 0.7);
    border: none;
    border-radius: 15px;
    transition: background-color 0.3s ease;
    transition: font-weight 0.3s ease;
}

.reader-button:hover {
    background-color: rgb(255, 255, 0);
    animation: bounce 0.3s forwards;
    font-weight: bold;
}

.exit-button {
    margin: 20px 0px 20px 0px;
    padding: 10px 20px;
    font-size: 16px;
    width: 10%;
    position: relative;
    left: 1%;
    color: white;
    background-color: rgba(255, 0, 0, 0.7);
    border: none;
    border-radius: 15px;
    transition: background-color 0.3s ease;
    transition: font-weight 0.3s ease;
}

.exit-button:hover {
    background-color: rgba(255, 0, 0, 1);
    animation: bounce 0.3s forwards;
    font-weight: bold;
}

.add-button {
    margin: 20px 0px 20px 0px;
    padding: 10px 20px;
    font-size: 16px;
    width: 10%;
    position: absolute;
    left: 70%;
    color: rgb(0, 0, 0);
    background-color: rgba(119, 255, 0, 0.7);
    border: none;
    border-radius: 15px;
    transition: background-color 0.3s ease;
    transition: font-weight 0.3s ease;
}

.add-button:hover {
    background-color: rgba(119, 255, 0, 1);
    animation: bounce 0.3s forwards;
    font-weight: bold;
}

.search-button {
    margin: 20px 0px 20px 0px;
    padding: 10px 20px;
    font-size: 16px;
    width: 10%;
    position: absolute;
    left: 85%;
    color: rgb(0, 0, 0);
    background-color: rgba(0, 123, 255, 0.7);
    border: none;
    border-radius: 15px;
    transition: background-color 0.3s ease;
    transition: font-weight 0.3s ease;
}

.search-button:hover {
    background-color: rgba(0, 123, 255, 1);
    animation: bounce 0.3s forwards;
    font-weight: bold;
}

@keyframes bounce {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-5px);
    }
}

table {
    border-collapse: collapse;
    width: 100%;
    font-family: Arial, sans-serif;
}

td {
    border: 1px solid black;
    padding: 10px;
}

tr:nth-child(even) {
    background-color: rgba(242, 243, 234, 0.5);
}

tr:hover {
    background-color: rgba(221, 221, 221, 0.8);
}

hr {
    border: 3px solid #ddd;
    margin: 0;

}

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}


.search-container {
    width: 100%;
    margin: auto;
    border: none;
    margin-top: 10%;
}

.search-form,
.search-form2 {
    width: 30%;
    margin: auto;
    background-color: #fefefe;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 20px;
}

.search-form p,
.search-form2 p {
    position: relative;
    text-align: center;
    font-size: 32px;
    color: #0056b3;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 20px;
}

.search-form p::before,
.search-form2 p::before {
    position: absolute;
    content: "";
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 4px;
    background-color: #0276ea;
}

.search-form2 p {
    color: #4bdc35;
}

.search-form2 p::before {
    background-color: #4bdc35;
}

.form-group {
    align-items: center;
    margin-bottom: 10px;
}

.form-group label {
    display: inline-block;
    width: 60px;
    cursor: url('/assets/img/alternate.ico'), auto;
    font-size: 16px;
    font-weight: bold;
    margin-right: 5px;
    margin-top: 8px;
    margin-bottom: 3px;
    color: rgb(56, 56, 56);
}

.form-group input {
    width: 68%;
    height: 32px;
    padding: 0 12px;
    margin-right: 5px;
    outline: none;
    border: none;
    border-radius: 8px;
    box-shadow: 0 5px 10px 5px rgba(47, 45, 45, 0.08);
    font-size: 16px;
    background-color: #e9e7ee;
    font-weight: 600;
}

.searchbk,
.addbk {
    width: 30%;
    padding: 10px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    margin-top: 10px;
    margin-left: 5%;
    margin-right: 30%;
    background-color: #007bff;
    border: none;
}

.searchbk:hover,
.addbk:hover {
    background-color: #0056b3;
}

.addbk {
    background-color: #00ff00;
}

.addbk:hover {
    background-color: #1aad14;
}

.quit {
    width: 30%;
    padding: 10px;
    border-radius: 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    margin-top: 10px;
    background-color: #dc3545;
    border: none;
}

.quit:hover {
    background-color: #b02a37;
}

.act {
    padding: 5px 10px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}

.addin {
    color: white;
    background-color: rgba(40, 167, 69, 0.7);
}

.addin:hover {
    animation: bounce 0.3s forwards;
    background-color: rgba(40, 167, 69, 1);
}

.del {
    color: white;
    background-color: rgba(220, 53, 69, 0.7);
}

.del:hover {
    animation: bounce 0.3s forwards;
    background-color: rgba(220, 53, 69, 1);
}</style>