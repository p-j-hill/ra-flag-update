/*jslint  browser: true, white: true, plusplus: true */
/*global $, countries */

var rasflags;

$(function () {
    'use strict';

    var countriesArray = $.map(countries, function (value, key) { return { value: value, data: key }; });

    // Setup jQuery ajax mock:
    $.mockjax({
        url: '*',
        responseTime: 2000,
        response: function (settings) {
            var query = settings.data.query,
                queryLowerCase = query.toLowerCase(),
                re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi'),
                suggestions = $.grep(countriesArray, function (country) {
                     // return country.value.toLowerCase().indexOf(queryLowerCase) === 0;
                    return re.test(country.value);
                }),
                response = {
                    query: query,
                    suggestions: suggestions
                };

            this.responseText = JSON.stringify(response);
        }
    });

    // Initialize ajax autocomplete:
    $('#autocomplete-ajax').autocomplete({
        // serviceUrl: '/autosuggest/service/url',
        lookup: countriesArray,
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: function(suggestion) {
            $('#selction-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
        },
        onHint: function (hint) {
            $('#autocomplete-ajax-x').val(hint);
        },
        onInvalidateSelection: function() {
            $('#selction-ajax').html('You selected: none');
        }
    });

    var commsupp = ['Does lip read', 'Does use communication device', 'Does use hearing aid', 'Preferred method of communication: written',
    'Uses a citizen advocate',
    'Uses a legal advocate',
    'Uses a citizen advocate',
    'Uses alternative communication skill',
  	'Uses British sign language',
  	'Uses cued speech transliterator',
    'Uses deafblind intervener',
  'Uses Deafblind Manual Alphabet',
  	'Uses electronic note taker',
  	'Uses lipspeaker',
  	'Uses Makaton sign language',
  	'Uses manual note taker',
  	'Uses personal audio recording device to record information',
  	'Uses Personal Communication Passport',
  	'Uses sign language',
  	'Uses speech to text reporter',
'Uses telecommunications device for the deaf'
  ];


  var reqcomms = [
  'British Sign Language interpreter needed',
  'Hands-on signing interpreter needed',
  'Makaton Sign Language interpreter needed ',
  'Needs an advocate',
  'Requires deafblind block alphabet interpreter',
  'Requires deafblind communicator guide',
  'Requires deafblind haptic communication interpreter',
  'Requires deafblind manual alphabet interpreter',
  'Requires lip speaker',
  'Requires manual note taker',
  'Requires sighted guide',
'Requires speech to text reporter',
  'Sign Supported English interpreter needed',
  'Visual frame sign language interpreter needed'

];




var reqspec = [
'Requires audible alert',
'Requires contact by email',
'Requires contact by letter',
'Requires contact by short message service text message',
'Requires contact by telephone',
'Requires contact by text relay',
'Requires contact via carer',
'Requires tactile alert',
'Requires visual alert'
];




var reqinform  = [
'Requires healthcare information recording on personal audio recording device',
'Requires information by email',
'Requires information in contracted (Grade 2) Braille',
'Requires information in Easy read',
'Requires information in electronic audio format',
'Requires information in electronic downloadable format',
'Requires information in Makaton',
'Requires information in Moon alphabet',
'Requires information in uncontracted (Grade 1) Braille',
'Requires information on audio cassette tape',
'Requires information on compact disc',
'Requires information on digital versatile disc',
'Requires information on universal serial bus mass storage device',
'Requires information verbally',
'Requires third party to read out written information',
'Requires written information in at least 20 point sans serif font',
'Requires written information in at least 24 point sans serif font',
'Requires written information in at least 28 point sans serif font'
];

var reqenviron  = [
'Requires adjustment to provide low noise stimulus',
'Requires adjustment to provide single room',
'Requires adjustment to provide wheelchair access',
'Requires adjustment to accommodate specialist equipment',
'Requires adjustment to provide low light stimulus',
'Requires adjustment to minimise waiting times'
];

  /* Categories

  Communicating with patients: including provision of Accessible Information –communication support
  Communicating with patients: including provision of Accessible Information – requires communication professional
  Communicating with patients: including provision of Accessible Information – requires specific contact method
  Communicating with patients: Provision of Accessible Information – requires specific information format
  Communicating with patients: including provision of Additional communications support
  Adjustments for providing Additional Support to patients
  Adjustments for Individual Care Requirements
  Adjustments to the Environment
  Adjustments for Specific Clinical Risks
  */



    var cat1 = $.map(commsupp, function (ras) { return { value: ras, data: { category: 'Communication support' }}; });
    var cat2 = $.map(reqcomms, function (ras) { return { value: ras, data: { category: 'Requires communication professional' }}; });
    var cat3 = $.map(reqspec, function (ras) { return { value: ras, data: { category: 'Requires specific contact method' }}; });
    var cat4 = $.map(reqinform, function (ras) { return { value: ras, data: { category: 'Requires specific information format' }}; });
    var cat5 = $.map(reqenviron, function (ras) { return { value: ras, data: { category: 'Requires adjustments to the environment' }}; });

    var rasflags = cat1.concat(cat2).concat(cat3).concat(cat4).concat(cat5);

    // Initialize autocomplete with local lookup:
    $('#autocomplete').devbridgeAutocomplete({
        lookup: rasflags,
        minChars: 1,

        showNoSuggestionNotice: true,
        noSuggestionNotice: 'Sorry, no matching results. Keep typing to add a generic Reasonable Adjustment',
        groupBy: 'category'
    });

    // Initialize autocomplete with custom appendTo:
    $('#autocomplete-custom-append').autocomplete({
        lookup: countriesArray,
        appendTo: '#suggestions-container'
    });

    // Initialize autocomplete with custom appendTo:
    $('#autocomplete-dynamic').autocomplete({
        lookup: countriesArray
    });
});
