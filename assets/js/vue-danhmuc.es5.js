'use strict';

var spBanchay = new Vue({
    delimiters: ['${', '}'],
    el: '#spCategory',
    data: {
        show: true,
        dulieu: {}
    },

    mounted: function mounted() {
        this.fetchEvents();
        console.log("ok");
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
            this.$http.get('https://publicapi.vienthonga.vn/v2/products?type=category-product&categoryid=171730&rootcategoryid=171730').then(function (response) {
                this.dulieu = response.body;
                console.log(this.dulieu);
                console.log("ok");
            }, function (response) {
                // error callback
            });
        }

    }

});