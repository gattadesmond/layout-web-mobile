'use strict';

var vueDetail = new Vue({
  delimiters: ['${', '}'],
  el: '#vueDetail',
  data: {},

  updated: function updated() {
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
  },

  mounted: function mounted() {
    this.fetchEvents();

    $(document).foundation();
    // $('[data-toggler]').foundation();

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
      this.$http.get('http://10.10.40.142:8899/v2/products?type=fullinfo&blockids=387&storecode=CS_0000188').then(function (response) {

        console.log("ok");
      }, function (response) {
        // error callback
      });
    }

  }

});