/**
 * The DWAPIConstants class. This class contains a series of constants used throughout the API.
 * Call DWAPIConstants.get(<string>) to retrieve the value of the constant. For example:
 *
 * <code>DWAPIConstants.get('COUNT')</code>
 *
 * will cause the string 'count' to be returned.
 *
 * @class
 */
var DWAPIConstants = (function() {

var private = {
     // Product and Content search
     /**
      * @constant {string} COUNT
      * @memberOf DWAPIConstants
      */
     'COUNT': 'count',
     /**
      * @constant {string} START
      * @memberOf DWAPIConstants
      */
     'START': 'start',
     /**
      * @constant {string} QUERY
      * @memberOf DWAPIConstants
      */
     'QUERY': 'q',
     /**
      * @constant {string} Q
      * @memberOf DWAPIConstants
      */
     'Q': 'q',
     /**
      * @constant {string} REFINE
      * @memberOf DWAPIConstants
      */
     'REFINE': 'refine',
     /**
      * @constant {string} SORT
      * @memberOf DWAPIConstants
      */
     'SORT': 'sort',
     // Expansion
     /**
      * @constant {string} EXPAND
      * @memberOf DWAPIConstants
      */
     'EXPAND': 'expand',
     // Property selections
     /**
      * @constant {string} SELECT
      * @memberOf DWAPIConstants
      */
     'SELECT': 'select',
     // Metadata
     /**
      * @constant {string} META
      * @memberOf DWAPIConstants
      */
     'META': 'meta',
     // JSONP
     /**
      * @constant {string} CALLBACK
      * @memberOf DWAPIConstants
      */
     'CALLBACK': 'callback',
     // Format
     /**
      * @constant {string} FORMAT
      * @memberOf DWAPIConstants
      */
     'FORMAT': 'format',
     // Locale
     /**
      * @constant {string} LOCALE
      * @memberOf DWAPIConstants
      */
     'LOCALE': 'locale',
     // Category levels
     /**
      * @constant {string} LEVELS
      * @memberOf DWAPIConstants
      */
     'LEVELS': 'levels',
     // Inventory ids
     /**
      * @constant {string} INVENTORY_IDS
      * @memberOf DWAPIConstants
      */
     'INVENTORY_IDS': 'inventory_ids',
     // Store search options
     /**
      * @constant {string} LATITUDE
      * @memberOf DWAPIConstants
      */
     'LATITUDE': 'latitude',
     /**
      * @constant {string} LONGITUDE
      * @memberOf DWAPIConstants
      */
     'LONGITUDE': 'longitude',
     /**
      * @constant {string} COUNTRY_CODE
      * @memberOf DWAPIConstants
      */
     'COUNTRY_CODE': 'country_code',
     /**
      * @constant {string} POSTAL_CODE
      * @memberOf DWAPIConstants
      */
     'POSTAL_CODE': 'postal_code',
     /**
      * @constant {string} DISTANCE_UNIT
      * @memberOf DWAPIConstants
      */
     'DISTANCE_UNIT': 'distance_unit',
     /**
      * @constant {string} MAX_DISTANCE
      * @memberOf DWAPIConstants
      */
     'MAX_DISTANCE': 'max_distance',
     // Promotions
     /**
      * @constant {string} CAMPAIGN_ID
      * @memberOf DWAPIConstants
      */
     'CAMPAIGN_ID': 'campaign_id',
     /**
      * @constant {string} START_DATE
      * @memberOf DWAPIConstants
      */
     'START_DATE': 'start_date',
     /**
      * @constant {string} END_DATE
      * @memberOf DWAPIConstants
      */
     'END_DATE': 'end_date',
     // Product expansions
     /**
      * @constant {string} AVAILABILITY
      * @memberOf DWAPIConstants
      */
     'AVAILABILITY': 'availability',
     /**
      * @constant {string} BUNDLED_PRODUCTS
      * @memberOf DWAPIConstants
      */
     'BUNDLED_PRODUCTS': 'bundled_products',
     /**
      * @constant {string} IMAGES
      * @memberOf DWAPIConstants
      */
     'IMAGES': 'images',
     /**
      * @constant {string} LINKS
      * @memberOf DWAPIConstants
      */
     'LINKS': 'links',
     /**
      * @constant {string} OPTIONS
      * @memberOf DWAPIConstants
      */
     'OPTIONS': 'options',
     /**
      * @constant {string} PRICES
      * @memberOf DWAPIConstants
      */
     'PRICES': 'prices',
     /**
      * @constant {string} PROMOTIONS
      * @memberOf DWAPIConstants
      */
     'PROMOTIONS': 'promotions',
     /**
      * @constant {string} SET_PRODUCTS
      * @memberOf DWAPIConstants
      */
     'SET_PRODUCTS': 'set_products',
     /**
      * @constant {string} VARIATIONS
      * @memberOf DWAPIConstants
      */
     'VARIATIONS': 'variations'
 };

 return {
    get: function(name) { return private[name]; }
};
})();
