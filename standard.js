$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1"/>');
$.ajax({
    url: 'https://browser.sentry-cdn.com/4.5.3/bundle.min.js',
    dataType: "script",
    crossDomain: true,
    success: function() {
        Sentry.init({
            dsn: 'https://6735ef31930f4236be40b46860764641@sentry.io/1377372'
        });
    }
});
(function(h, o, t, j, a, r) {
    h.hj = h.hj || function() {
        (h.hj.q = h.hj.q || []).push(arguments)
    };
    h._hjSettings = {
        hjid: 473767,
        hjsv: 5
    };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script');
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
})(window, document, '//static.hotjar.com/c/hotjar-', '.js?sv=');

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('subscription_payment_profile_attributes_billing_address')), {
            types: ['geocode']
        });
    document.getElementById("subscription_payment_profile_attributes_billing_address").placeholder = "";
    autocomplete.addListener('place_changed', fillInAddress);
    if (typeof var_property == 'undefined' && org_property.length !== 5) {
        autocomplete2 = new google.maps.places.Autocomplete(
            (document.getElementById('subscription_customer_attributes_address')), {
                types: ['geocode']
            });
        document.getElementById("subscription_customer_attributes_address").placeholder = "";
        autocomplete2.addListener('place_changed', fillInAddress2);
    }
};

function fillInAddress() {
    var place = autocomplete.getPlace();
    document.getElementById('subscription_payment_profile_attributes_billing_address').value = "";
    var componentForm = {
        street_number: 'subscription_payment_profile_attributes_billing_address',
        route: 'subscription_payment_profile_attributes_billing_address',
        locality: 'subscription_payment_profile_attributes_billing_city',
        administrative_area_level_1: 'subscription_payment_profile_attributes_billing_state',
        postal_code: 'subscription_payment_profile_attributes_billing_zip'
    };
    for (var i = 0; i < place.address_components.length; i++) {
        if (place.address_components[i].types[0] in componentForm) {
            if (componentForm[place.address_components[i].types[0]] == 'subscription_payment_profile_attributes_billing_address') {
                document.getElementById(componentForm[place.address_components[i].types[0]]).value += place.address_components[i].long_name + " "
            } else {
                document.getElementById(componentForm[place.address_components[i].types[0]]).value = place.address_components[i].short_name
            }
        }
    }
};

function fillInAddress2() {
    var place = autocomplete2.getPlace();
    document.getElementById('subscription_customer_attributes_address').value = "";
    var componentForm = {
        street_number: 'subscription_customer_attributes_address',
        route: 'subscription_customer_attributes_address',
        locality: 'subscription_customer_attributes_city',
        administrative_area_level_1: 'subscription_customer_attributes_state',
        postal_code: 'subscription_customer_attributes_zip'
    };
    for (var i = 0; i < place.address_components.length; i++) {
        if (place.address_components[i].types[0] in componentForm) {
            if (componentForm[place.address_components[i].types[0]] == 'subscription_customer_attributes_address') {
                document.getElementById(componentForm[place.address_components[i].types[0]]).value += place.address_components[i].long_name + " "
            } else {
                document.getElementById(componentForm[place.address_components[i].types[0]]).value = place.address_components[i].short_name
            }
        }
    }
};

function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
};

function iconUpdate() {
    var doc_head = document.head.childNodes;
    var icon_array = ["shortcut icon", "apple-touch-icon"];
    for (var i = 0; i < doc_head.length; i++) {
        if (doc_head[i].attributes !== undefined) {
            if (icon_array.indexOf(String(doc_head[i].rel)) != -1) {
                doc_head[i].href = "https://ewfiber.com/wp-content/themes/ewfiber/images/favicon.ico.png";
            }
        }
    };
};
if ($('#hosted-payment-history').length !== 0) {
    $(document).bind('afterSummaryRefresh', iconUpdate);
    $(document).trigger('afterSummaryRefresh');
}
if ($('#hosted-payment-history').length === 0) {
    $(document).bind('afterSummaryRefresh', iconUpdate);
    $(document).trigger('afterSummaryRefresh');
    $(function() {
        $('.country_select').find('option').remove();
        $('.country_select').append('<option value="US" checked="checked">United States</option>');
        $('.country_select').change();
        document.getElementById('subscription_customer_attributes_country').classList.add('locked-cell');
    });
};
if ($('#total').length === 1) {
    $.ajax({
        url: 'https://cdn.rawgit.com/digitalBush/jquery.maskedinput/1.4.1/dist/jquery.maskedinput.min.js',
        dataType: "script",
        success: function() {
            $("#subscription_customer_attributes_phone").mask('(999) 999-9999');
        }
    });
    var errors = {
        "#subscription_customer_attributes_phone": false,
        "#subscription_customer_attributes_email": false
    }
    var form = $("form:first");
    var phone = $("#subscription_customer_attributes_phone");
    var email = $("#subscription_customer_attributes_email");
    var units = $('#subscription_customer_attributes_address_2');
    var submitbtn = $("#subscription_submit")
    document.getElementById("subscription_customer_attributes_phone").type = "tel"
    form.change(function() {
        if (phone.val() === "" || email.val() === "" || units.val() === "") {
            submitbtn.click(function() {
                return true;
            });
        }
    });
    submitbtn.click(function() {
        for (var i of [phone, email, units]) {
            if (i.val() === "" && errors[String(i.selector)] !== true) {
                i.addClass("field-error");
                i.parent().append('<li style="color:red;">Cannot Be Blank</li>');
                if (i == units) {
                    $('#hosted-payment-form').append('<li style="float:right;color:red;">Unit Number Cannot Be Blank</li>');
                }
                errors[String(i.selector)] = true;
            }
            if (i.val() !== "" && errors[String(i.selector)] === true) {
                errors[String(i.selector)] = false;
                i.removeClass("field-error");
            }
        };
        for (x in errors) {
            if (errors[x] == true) {
                return false
            };
        }
    });
    var placeSearch, autocomplete;
    var componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };
    var full_url = window.location.href;
    var product_url = window.location.pathname.split("/");
    var aws_url = 'https://j6ww4dykab.execute-api.us-east-1.amazonaws.com/Prod/MyResource';
    var autocomplete_url = 'https://cdn.rawgit.com/devbridge/jQuery-Autocomplete/master/src/jquery.autocomplete.js';
    var address_list = {
        'service_location': 'subscription_customer_attributes_address',
        'city': 'subscription_customer_attributes_city',
        'state': 'subscription_customer_attributes_state',
        'zip': 'subscription_customer_attributes_zip'
    };
    var var_property = getUrlParameter('property');
    var org_property = document.getElementById("subscription_customer_attributes_organization").value.split(" ~ ");
    if ($('#hosted-payment-history').length === 0) {
        $.ajax({
            url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBHuzb3DSH5w0TCj63Ciwi-qGLOrlFpmbM&libraries=places&callback=initAutocomplete',
            dataType: "script"
        });
    }
    var unit_data = {};
    var building_data = {};
    var component_data = {
        "component_row_389673": ["Add for $15.00", "$15.00 per month subscription. Static IP Address."]
    }
    var search_item = ""
    var message_string = "Product: " + $("#content > h1").text() + "<br>";
    try {
        $.getJSON("https://jsonip.com?callback=?", function(data) {
            if (data.ip == "104.244.241.206") {
                message_location = " (Everywhere Wireless Office)"
            } else {
                message_location = " (Customer Address)"
            }
            message_string += "IP Address: " + data.ip + message_location + "<br>";
        });
    } catch (err) {
        message_string += "IP Address: IP Attempt was blocked.<br>";
    };
    if (document.getElementById("apply_component_button") !== null) {
        var components = document.getElementById("component_configuration").childNodes;
        for (var i = 0; i < components.length; i++) {
            row = components[i].classList;
            if (row !== undefined) {
                if (row == "row" && components[i].id == "") {
                    components[i].hidden = true;
                }
                if (row == "row" && components[i].id !== "" && components[i].id in component_data) {
                    var component_id = components[i].id.split("_");
                    component_id = component_id[component_id.length - 1];
                    $("#component_row_" + component_id + " > span.checkbox.component-price").html(component_data[components[i].id][0]);
                    $("#component_checkbox_" + component_id).on('change', function() {
                        $("#apply_component_button").click()
                    });
                    $(document).bind("afterSummaryRefresh", function() {
                        $("#summary-component-" + component_id).html(component_data["component_row_" + component_id][1]);
                    });
                }
            }
        }
    }
    if ($.inArray("subscribe", product_url) == 1 && product_url.length >= 3) {
        $.ajax({
            type: 'GET',
            url: aws_url,
            dataType: 'json',
            data: {
                "operation": "product_id",
                "id": product_url[2]
            },
            success: function(response) {
                $('#hosted-payment-form > div.section_five > p > label').append(' and <a target="blank" href="https://ewfiber.com/privacy-policy/"> Privacy Policy</a>');
                $('#hosted-payment-form > div.section_five > p > label').append('<p class = "hint" >A test transaction of $1.00 will be run and immediately refunded to validate your credit card.</p>');
                $('#errorExplanation > ul').append("<li> If you continue to have issues during signup, please call our Support Department at (312) 361-0052</li>");
                $('#errorExplanation > h2').html("There are items that require your attention")
                $(document).bind('afterSummaryRefresh', function() {
                    $('label[for="subscription_customer_attributes_address"]').html("* Service Location");
                    $('label[for="subscription_customer_attributes_address_2"]').html("* Unit Number");
                    $('label[for="subscription_customer_attributes_country"]').html("* Country");
                    $('label[for="subscription_customer_attributes_state"]').html("* State");
                    $('label[for="subscription_customer_attributes_city"]').html("* City");
                    $('label[for="subscription_customer_attributes_zip"]').html("* ZIP Code");
                    $('label[for="subscription_customer_attributes_phone"]').html("* Phone");
                    $('#subscription_ref').next('h2').html("Service Location:");
                    $('#hosted-payment-form > h2:nth-child(4)').html("Customize Your Plan:");
                    $('#billing_info').next('h2').html("Billing Address (Located on Credit / Debit Card Statement):");
                    if (response == null) {
                        try {
                            var producttitle = String(document.getElementById('content').childNodes[3].innerHTML)
                        } catch {
                            var producttitle = "ERROR"
                        }
                        response = {
                            'productdescription': "You will not be charged until your service or upgrade has been activated and any promotions have been applied.",
                            'productcost': 'ERROR',
                            'producttime': 'ERROR',
                            'productid': String(product_url[2]),
                            'producttitle': producttitle
                        }
                    }
                    try {
                        coupon_text = $('#long_coupon_message').find(".success_message");
                        coupon_text2 = coupon_text.text("Coupon " + document.getElementById('subscription_coupon_code').value.toUpperCase() + " has been applied.");
                    } catch (err) {};
                    try {
                        document.getElementById('metafield_row_13540').hidden = true;
                        document.getElementById('metafield_13540').value = response['producttitle'] + " | " + response['productcost'] + " | " + response['producttime'] + " | " + response['productid']
                    } catch (err) {};
                    try {
                        document.getElementById('metafield_row_20091').hidden = true;
                        document.getElementById('metafield_20091').value = response['producttitle'] + " | " + response['productcost'] + " | " + response['producttime'] + " | " + response['productid']
                    } catch (err) {};
                    document.getElementById('contact_info').childNodes[3].hidden = true;
                    var billing_summary = document.getElementById('billing_summary').childNodes;
                    hide_array = ["next-renewal-charge", "expiration-date", "summary-setup-fee"];
                    for (var i = 0; i < hide_array.length; i++) {
                        if (document.getElementById(hide_array[i]) !== null) {
                            document.getElementById(hide_array[i]).hidden = true;
                        }
                    }
                    var replace_array = ['summary-trial', 'summary-recurring-charges'];
                    for (var i = 0; i < billing_summary.length; i++) {
                        if (billing_summary[i].attributes !== undefined) {
                            if (replace_array.indexOf(billing_summary[i].getAttribute('id')) != -1) {
                                billing_summary[i].innerHTML = response['productdescription'];
                            }
                        }
                    }
                })
            }
        })
    };
    if (typeof var_property !== 'undefined' || org_property.length == 5) {
        if (org_property.length == 5 && typeof var_property == 'undefined') {
            var_property = org_property[0]
        }
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: aws_url,
            data: {
                "operation": "building_id",
                "id": var_property
            },
            success: function(response) {
                if (response != null) {
                    if (response['Error'] != "No ID") {
                        building_data = response;
                        $.ajax({
                            type: 'GET',
                            url: aws_url,
                            dataType: "json",
                            data: {
                                "operation": "unit_id",
                                "id": var_property
                            },
                            success: function(response) {
                                if (([0, undefined].indexOf(response.length) == -1) || ["No ID", undefined].indexOf(response['Error']) == -1) {
                                    var units = []
                                    for (var i = 0; i < response.length; i++) {
                                        units.push(response[i]['unitname'])
                                        unit_data[response[i]['unitname']] = building_data['id'] + " ~ " + building_data['buildingid'] + " ~ " + response[i]['unitid'] + " ~ " + building_data['buildingname'] + " ~ " + response[i]['crmname']
                                    }
                                    units.sort()
                                    $.ajax({
                                        url: 'https://cdn.rawgit.com/devbridge/jQuery-Autocomplete/master/src/jquery.autocomplete.js',
                                        dataType: 'script',
                                        success: function() {
                                            $('#subscription_customer_attributes_address_2').devbridgeAutocomplete({
                                                lookup: $.map(units, function(unit) {
                                                    return {
                                                        value: unit,
                                                        data: {
                                                            category: 'units'
                                                        }
                                                    }
                                                }),
                                                minChars: 0,
                                                lookupLimit: 10,
                                                lookupFilter: function(suggestion, query, queryLowerCase) {
                                                    return suggestion.value.toLowerCase().indexOf(queryLowerCase.replace(/^([A-Za-z-. ]{2,}[^0-9\W]*?([ ]+))/g, '')) !== -1
                                                },
                                                onSearchComplete: function(query, suggestions) {
                                                    if (suggestions.length != 0) {
                                                        search_item = suggestions[0]
                                                    }
                                                    if (suggestions.length == 0) {
                                                        search_item = ""
                                                    }
                                                },
                                                onSelect: function(suggestion) {
                                                    document.getElementById("subscription_customer_attributes_address_2").value = suggestion.value
                                                    document.getElementById("subscription_customer_attributes_organization").value = unit_data[suggestion.value];
                                                    $(this).removeClass("field-error");
                                                },
                                                onHide: function(container) {
                                                    if (search_item != "") {
                                                        document.getElementById("subscription_customer_attributes_address_2").value = search_item.value
                                                        document.getElementById("subscription_customer_attributes_organization").value = unit_data[search_item.value];
                                                        $(this).removeClass("field-error");
                                                    }
                                                },
                                                autoSelectFirst: true,
                                                preserveInput: true,
                                                showNoSuggestionNotice: true,
                                                noSuggestionNotice: '<div class="autocomplete-suggestion">Unit not Found</div>'
                                            })
                                        }
                                    })
                                }
                            }
                        });
                        $('#subscription_customer_attributes_address_2').on('change', function() {
                            if (document.getElementById("subscription_customer_attributes_address_2").value.indexOf("~") != -1) {
                                document.getElementById("subscription_customer_attributes_address_2").value = document.getElementById("subscription_customer_attributes_address_2").value.replace(new RegExp("~", "g"), "")
                            }
                            if (document.getElementById("subscription_customer_attributes_address_2").value in unit_data) {
                                document.getElementById("subscription_customer_attributes_organization").value = unit_data[document.getElementById("subscription_customer_attributes_address_2").value];
                            } else {
                                document.getElementById("subscription_customer_attributes_organization").value = building_data['id'] + " ~ " + building_data['buildingid'] + " ~ " + "ERROR" + " ~ " + building_data['buildingname'] + " ~ " + "ERROR-" + document.getElementById("subscription_customer_attributes_address_2").value;
                            }
                        });
                        $('#subscription_customer_attributes_state').on('change', function() {
                            for (var key in response) {
                                if (address_list.hasOwnProperty(key)) {
                                    document.getElementById(address_list[key]).value = response[key];
                                    document.getElementById(address_list[key]).classList.add('locked-cell');
                                    document.getElementById(address_list[key]).readOnly = true;
                                }
                            }
                            if (response.hasOwnProperty("state")) {
                                state_list = document.getElementById(address_list['state']).options
                                for (var i = 0; i < state_list.length; i++) {
                                    if (state_list[i].value == response['state']) {
                                        state_list[i].setAttribute('checked', 'checked');
                                        document.getElementById(address_list['state']).setAttribute("readonly", true)
                                    }
                                }
                            }
                        })
                        $('#subscription_customer_attributes_state').trigger('change');
                    }
                }
            }
        });
    };
    $('form').on('submit', function(e, options) {
        options = options || {};
        try {
            if (document.getElementById("metafield_13735").value !== "") {
                if (!options.complete) {
                    e.preventDefault();
                    var message_array = ["subscription_customer_attributes_first_name", "subscription_customer_attributes_last_name", "subscription_customer_attributes_address", "subscription_customer_attributes_address_2", "subscription_customer_attributes_state", "subscription_customer_attributes_city", "subscription_customer_attributes_zip", "subscription_customer_attributes_email", "subscription_customer_attributes_phone", "metafield_13735", "metafield_13540"];
                    var output_array = ["First Name", "Last Name", "Service Location", "Unit Number", "State", "City", "Zip", "Email", "Phone #", "Commission Reference", "Hidden Data"];
                    for (i = 0; i < message_array.length; i++) {
                        try {
                            message_string += output_array[i] + ": " + document.getElementById(message_array[i]).value + "<br>";
                        } catch (error) {}
                    };
                    var message_full = {
                        'type': 'html',
                        'email': "accounting@everywherewireless.com",
                        'cc_email': 'gpavlov@everywherewireless.com',
                        'subject': "Automated - New Submission / Possible Commission",
                        'body': message_string
                    }
                    $.ajax({
                        data: JSON.stringify(message_full),
                        dataType: 'json',
                        processData: false,
                        type: 'POST',
                        url: 'https://hooks.zapier.com/hooks/catch/1881271/q72udn/'
                    }).then(function() {
                        $(e.currentTarget).trigger('submit', {
                            'complete': true
                        });
                    });
                } else {}
            }
        } catch (err) {
            $(e.currentTarget).trigger('submit', {
                'complete': !0
            });
        }
    });
};
