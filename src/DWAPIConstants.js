var DWAPIConstants = (function() {
     var private = {
         // Product and Content search
         'COUNT': 'count',
         'START': 'start',
         'QUERY': 'q',
         'Q': 'q',
         'REFINE': 'refine',
         'SORT': 'sort',
         // Expansion
         'EXPAND': 'expand',
         // Property selections
         'SELECT': 'select',
         // Metadata
         'META': 'meta',
         // JSONP
         'CALLBACK': 'callback',
         // Format
         'FORMAT': 'format',
         // Locale
         'LOCALE': 'locale',
         // Category levels
         'LEVELS': 'levels',
         // Inventory ids
         'INVENTORY_IDS': 'inventory_ids',
         // Store search options
         'LATITUDE': 'latitude',
         'LONGITUDE': 'longitude',
         'COUNTRY_CODE': 'country_code',
         'POSTAL_CODE': 'postal_code',
         'DISTANCE_UNIT': 'distance_unit',
         'MAX_DISTANCE': 'max_distance',
         // Promotions
         'CAMPAIGN_ID': 'campaign_id',
         'START_DATE': 'start_date',
         'END_DATE': 'end_date',
         // Product expansions
         'AVAILABILITY': 'availability',
         'BUNDLED_PRODUCTS': 'bundled_products',
         'IMAGES': 'images',
         'LINKS': 'links',
         'OPTIONS': 'options',
         'PRICES': 'prices',
         'PROMOTIONS': 'promotions',
         'SET_PRODUCTS': 'set_products',
         'VARIATIONS': 'variations'
     };

     return {
        get: function(name) { return private[name]; }
    };
})();
