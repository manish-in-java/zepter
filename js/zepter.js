/*
 * Generates a specified number of identifiers of a
 * given type.
 */
function generate(button) {
    var id = button.attr("id");
    var count = $("#" + id + "-count").val();
    if(!count || count == "") {
      count = 0;
    }
    var target = $("#" + id + "-values");
    target.val("");

    for(var i = 1; i <= count; ++i) {
      if (id === "ean") {
        target.val(target.val() + getEAN() + "\r\n");
      }
      else if (id === "grid") {
        target.val(target.val() + getGRid() + "\r\n");
      }
      else if (id === "isrc") {
        target.val(target.val() + getISRC() + "\r\n");
      }
      else if (id === "upc") {
        target.val(target.val() + getUPC() + "\r\n");
      }
    }
}

/*
 * Generates an International Article Number (EAN).
 */
function getEAN() {
  var provisional = "89019603" + pad(getRandom(9998) + 1, 4);;

  var sum = (parseInt(provisional.substring(0, 1))
              + parseInt(provisional.substring(2, 3))
              + parseInt(provisional.substring(4, 5))
              + parseInt(provisional.substring(6, 7))
              + parseInt(provisional.substring(8, 9))
              + parseInt(provisional.substring(10, 11)))
              + 3 * (parseInt(provisional.substring(1, 2))
              + parseInt(provisional.substring(3, 4))
              + parseInt(provisional.substring(5, 6))
              + parseInt(provisional.substring(7, 8))
              + parseInt(provisional.substring(9, 10))
              + parseInt(provisional.substring(11, 12)));

  return provisional + ((10 - sum % 10) % 10);
}

/*
 * Generates a Global Release Identifier (GRid).
 */
function getGRid() {
  var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var issuer   = "2425G";
  var scheme   = "A1";
  var values   = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

  var code = "";
  for(var i = 0; i < 10; ++i) {
    code += alphabet.charAt(getRandom(alphabet.length));
  }

  var provisional = scheme + issuer + code;

  var p = 36;
  for (var i = 0; i < 17; ++i) {
    var a = values[alphabet.indexOf(provisional.charAt(i))];
    var s = p % 37 + a;
    var r = s % 36 == 0 ? 36 : s % 36;

    p = r * 2;
  }

  p = p % 37;

  return scheme + "-" + issuer + "-" + code + "-" + alphabet.charAt(37 - p);
}

/*
 * Generates an International Sound Recording Code (ISRC).
 */
function getISRC() {
  return "IN-A19-" + new Date().getFullYear().toString().substring(2) + "-" + pad(getRandom(99998) + 1, 5);
}

/*
 * Generates a random integer between 0 (inclusive) and a
 * specified maximum.
 */
function getRandom(maximum) {
  return Math.floor(Math.random() * maximum);
}

/*
 * Generates a Universal Product Code (UPC).
 */
function getUPC() {
  var provisional = "158296" + pad(getRandom(99998) + 1, 5);;

  var sum = 3 * (parseInt(provisional.substring(0, 1))
              + parseInt(provisional.substring(2, 3))
              + parseInt(provisional.substring(4, 5))
              + parseInt(provisional.substring(6, 7))
              + parseInt(provisional.substring(8, 9))
              + parseInt(provisional.substring(10, 11)))
              + (parseInt(provisional.substring(1, 2))
              + parseInt(provisional.substring(3, 4))
              + parseInt(provisional.substring(5, 6))
              + parseInt(provisional.substring(7, 8))
              + parseInt(provisional.substring(9, 10)));

  return provisional + ((10 - sum % 10) % 10);
}

/*
 * Pads a number with leading zeroes to match its length
 * to a specified value.
 */
function pad(number, places) {
  var s = number.toString();
  while(s.length < places) s = "0" + s;

  return s;
}

$(window).load(function() {
  $(".counter").TouchSpin( { min : 1 });
  $(".generator").each(function() {
      $(this).click(function() {
          generate($(this));
      });
  });
});
