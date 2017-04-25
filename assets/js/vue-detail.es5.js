'use strict';

var productDetail = new Vue({

    delimiters: ['${', '}'],

    el: '#detailInfoProduct',

    data: {
        info1: {
            Product: {},
            ColorList: []
        },

        baohanhbaove: {
            ghbh: {
                price: 0
            },
            bvtd: {
                price: 0
            }
        },
        featureInfo: [],
        featureInfo4: [],

        prodVideoImage: {
            ListImageProduct: []
        },
        detailInfo: {},

        prodCompare: [],
        lpkMuakem: []

    },

    computed: {
        // a computed getter
        totalColor: function totalColor() {
            return this.info1.ColorList.length;
        }
    },
    mounted: function mounted() {

        $(document).foundation();
        // $('[data-toggler]').foundation();

        if (document.getElementById("imageSlider")) {
            window.swiper = new Swiper('#imageSlider', {
                pagination: '.swiper-pagination',
                // paginationClickable: true,
                // autoplay: 6000,
                autoplayDisableOnInteraction: false,
                // Disable preloading of all images
                preloadImages: false,
                // Enable lazy loading
                lazyLoading: true
            });
        }

        this.fetchData();
        this.fetchGiahan();
        this.fetchFeatureInfo();
        this.fetchprodVideoImage();
        this.fetchdetailInfo();
        this.fetchprodCompare();
        this.fetchlpkMuakem();
    },

    methods: {
        fetchData: function fetchData() {
            var _this = this;

            this.$http.get('https://publicapi.vienthonga.vn//v2/products?type=detail-info&productids=186288').then(function (response) {
                _this.info1 = response.body;
            }, function (response) {
                console.log('Request error info1!');
            });
        },
        fetchGiahan: function fetchGiahan() {
            var _this2 = this;

            this.$http.get('https://publicapi.vienthonga.vn//v2/products?type=detail-happycare&productids=186288').then(function (response) {
                _this2.baohanhbaove = response.body;
            }, function (response) {
                console.log('Request error baohanhbaove!');
            });
        },

        fetchFeatureInfo: function fetchFeatureInfo() {
            var _this3 = this;

            this.$http.get('https://publicapi.vienthonga.vn//v2/products?type=detail-feature&productids=186288').then(function (response) {
                _this3.featureInfo = response.body;
                _this3.featureInfo4 = response.body.slice(0, 4);
                console.log('AAAA', _this3.featureInfo4.length);
            }, function (response) {
                console.log('Request error featureInfo4!');
            });
        },
        fetchprodVideoImage: function fetchprodVideoImage() {
            var _this4 = this;

            this.$http.get('https://publicapi.vienthonga.vn//v2/products?type=detail-image-video&productids=186288').then(function (response) {
                _this4.prodVideoImage = response.body;
            }, function (response) {
                console.log('Request error prodVideoImage!');
            });
        },
        fetchdetailInfo: function fetchdetailInfo() {
            var _this5 = this;

            this.$http.get('https://publicapi.vienthonga.vn//v2/products?type=detail-info&productids=186288').then(function (response) {
                _this5.detailInfo = response.body;
            }, function (response) {
                console.log('Request error detailInfo!');
            });
        },
        fetchprodCompare: function fetchprodCompare() {
            var _this6 = this;

            this.$http.get('https://publicapi.vienthonga.vn//v2/products?type=detail-sosanh&productids=186288').then(function (response) {
                _this6.prodCompare = response.body;
            }, function (response) {
                console.log('Request error prodCompare!');
            });
        },
        fetchlpkMuakem: function fetchlpkMuakem() {
            var _this7 = this;

            this.$http.get('https://publicapi.vienthonga.vn//v2/products?type=detail-lpkmuakem&productids=186288').then(function (response) {
                _this7.lpkMuakem = response.body;
                console.log("phu kien mua kem", _this7.lpkMuakem);
            }, function (response) {
                console.log('Request error lpkMuakem!');
            });
        }

    }
});