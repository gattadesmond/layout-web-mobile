'use strict';

$(document).foundation();

// if ($("#productSlider").length != 0) {
//     var swiper2 = new Swiper('#productSlider', {
//         pagination: '.swiper-pagination',
//         // paginationClickable: true,
//         // autoplay: 6000,
//         autoplayDisableOnInteraction: false,
//         // Disable preloading of all images
//         preloadImages: false,
//         // Enable lazy loading
//         lazyLoading: true,
//     });
// }


/**
 * This module sets up the search bar.
 */

!function () {
    var dataSearch = new Bloodhound({

        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        // prefetch: '../data/films/post_1960.json',
        remote: {
            url: 'http://10.32.45.136:8098/api/searchproduct/%QUERY',
            wildcard: '%QUERY'
        }
    });

    var source = {
        // Only show 10 results at once
        limit: 5,

        // Function to fetch result list and then find a result;
        /*source: function(query, sync, async) {
            query = query.toLowerCase();
            // assets/static/data.js
            $.getJSON('http://10.32.45.136:8098/api/searchproduct/iphone', function(data, status) {
                async(data.filter(function(elem, i, arr) {
                    var name = elem.ProductName.toLowerCase();
                    var terms = [name, name.replace('-', '')].concat(elem.tags || []);
                    for (var i in terms) if (terms[i].indexOf(query) > -1) return true;
                    return false;
                }));
            });
        },*/

        source: dataSearch,

        // Name to use for the search result itself
        display: function display(item) {
            return item.ProductName;
        },

        templates: {
            // HTML that renders if there are no results
            notFound: function notFound(query) {
                return '<div class="tt-empty">Không tìm thấy kết quả cho "' + query.query + '".</div>';
            },
            // HTML that renders for each result in the list
            suggestion: function suggestion(item) {
                return '<div class="tt-item"><div class="tt-image"><img src="' + item.ImageUrl + '" width="50" height="50" alt=""></div>' + '<div class="tt-info"><span class="name">' + item.ProductName + '</span> <span class="price">' + item.ProductPrice + ' đ</span></div></div>';
            }
        }

    };

    // Search
    $('[data-products-search]').typeahead({
        highlight: false
    }, source).on('typeahead:select', function (e, sel) {
        window.location.href = sel.ProductUrl;
    });

    // Auto-highlight unless it's a phone
    if (!navigator.userAgent.match(/(iP(hone|ad|od)|Android)/)) {
        $('[data-products-search]').focus();
    }
}();

// $(document).ready(function () {
//     $(".select2").select2({
//         placeholder: $(this).data("placeholder"),
//         width: null,
//         language: "vi"
//     });


//     $(".select2-allow-clear").select2({
//         allowClear: true,
//        placeholder: $(this).data("placeholder"),
//         width: null,
//         language: "vi"
//     });

//      $(".select2-hide-search").select2({
//        placeholder: $(this).data("placeholder"),
//         width: null,
//         minimumResultsForSearch: Infinity,
//         language: "vi"
//     });

// });