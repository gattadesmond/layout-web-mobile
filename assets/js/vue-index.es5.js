'use strict';

var mainSlider = new Vue({
  el: '#mainSlider',
  delimiters: ['${', '}'],
  data: {
    apiURL: 'https://publicapi.vienthonga.vn//v2//banners?location=WEBVTA',
    slides: [[]]
  },

  updated: function updated() {
    if (document.getElementById("mainSlider")) {
      window.swiper = new Swiper('#mainSlider', {
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
  },

  mounted: function mounted() {
    this.fetchData();
  },

  methods: {
    fetchData: function fetchData() {
      var _this = this;

      this.$http.get(this.apiURL).then(function (response) {
        _this.slides = response.body.filter(function (slide_obj) {
          return slide_obj.BannerInCategory == 'home-top-1';
        });
      }, function (response) {
        console.log('Request home slides error!');
      });
    }
  }

});

// =================================================================


var spBanchay = new Vue({
  delimiters: ['${', '}'],
  el: '#spBanchay',
  data: {
    ListProduct: [[], [], [], [], [], []],
    BlockId: null,
    show: true
  },

  mounted: function mounted() {
    this.fetchEvents();
  },

  computed: {},

  beforeDestroy: {},

  filters: {
    formatMoney: function formatMoney(value) {
      if (!value) return '';
      var a = parseInt(value);
      return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'đ';
    }
  },

  methods: {
    fetchEvents: function fetchEvents() {
      this.$http.get('https://publicapi.vienthonga.vn//v2/products?type=fullinfo&blockids=387&storecode=CS_0000188').then(function (response) {
        this.ListProduct = response.body[0].ListProduct.filter(function (item, index) {
          return index <= 5;
        });
        this.BlockId = response.body[0].BlockId;
        console.log("ok");
      }, function (response) {
        // error callback
      });
    }

  }

});

// =================================================================

var newsBlock = new Vue({
  delimiters: ['${', '}'],
  el: '#newsBlock',
  data: {
    apiURL: 'https://publicapi.vienthonga.vn/news-api/ListNewsHome?takeNum=3',
    news_list: [[], [], []]
  },
  created: function created() {
    this.fetchData();
  },

  methods: {
    fetchData: function fetchData() {
      var _this2 = this;

      this.$http.get(this.apiURL).then(function (response) {
        _this2.news_list = response.body.Data;
      }, function (response) {
        console.log('Request home news list error!');
      });
    }
  }
});